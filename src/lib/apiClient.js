// API client utilities for making requests to our Next.js API routes

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// Products API
export const productsAPI = {
  // Get all products
  async getAll(params = {}) {
    const searchParams = new URLSearchParams();
    
    if (params.category) searchParams.set('category', params.category);
    if (params.search) searchParams.set('search', params.search);
    if (params.limit) searchParams.set('limit', params.limit);

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    
    return apiRequest(endpoint);
  },

  // Get product by ID
  async getById(productId) {
    return apiRequest(`/products/${productId}`);
  },

  // Create product
  async create(productData) {
    return apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Update product
  async update(productId, updateData) {
    return apiRequest(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  // Delete product
  async delete(productId) {
    return apiRequest(`/products/${productId}`, {
      method: 'DELETE',
    });
  },

  // Search products
  async search(searchTerm, limit = 20) {
    return apiRequest(`/products?search=${encodeURIComponent(searchTerm)}&limit=${limit}`);
  },

  // Get products by category
  async getByCategory(category, limit = 20) {
    return apiRequest(`/products?category=${encodeURIComponent(category)}&limit=${limit}`);
  }
};

// Health check
export const healthAPI = {
  async check() {
    return apiRequest('/health');
  }
};

// Export all APIs
export default {
  products: productsAPI,
  health: healthAPI
};
