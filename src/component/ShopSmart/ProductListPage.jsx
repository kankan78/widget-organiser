"use client"

import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { productsAPI } from '../../lib/apiClient';
import ProductCard from './ProductCard';
import ProductDetailCard from './ProductDetailCard';
import FilterBar from './FilterBar';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { defaultProducts } from '../../lib/defaultProducts';
import { fetchProductsData, generateStoryFromProducts } from '../../lib/utils';
import StorySidebar from './StorySidebar';
import { siteConfig } from '../../lib/siteConfig';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [storySideBarOpen, setStorySideBarOpen] = useState(false);
  const [generatedStory, setGeneratedStory] = useState('');

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedProduct(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleSelectProduct = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.ASIN === product.ASIN);
      if (exists) {
        return prev.filter((p) => p.ASIN !== product.ASIN);
      }
      // if (prev.length > 2) {
      //   // Prevent more than 3
      //   if (typeof window !== 'undefined') {
      //     window?.alert?.('You can select up to 3 products only.');
      //   }
      //   return prev;
      // }
      return [...prev, product];
    });
  };

  const openStoryModal = () => {
    if (selectedProducts.length < 3) return;
    const story = generateStoryFromProducts(selectedProducts);
    setGeneratedStory(story);
    setStorySideBarOpen(true);
  };

  const closeStoryModal = () => {
    setStorySideBarOpen(false);
  };

  const copyStoryToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedStory);
    } catch (e) {}
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Try to get products from API first
        try {
          const response = await productsAPI.getAll();
          if (response.success && response.data && response.data.length > 0) {
            const sortedProductsByTime = response.data.sort((a, b) => {
              // Convert time strings to Date objects or timestamps for reliable comparison.
              // If 'time' is not present, treat it as a very old date (timestamp 0)
              // to ensure products without a time are placed at the end in a descending sort.
              const timeA = a.time ? new Date(a.time).getTime() : 0;
              const timeB = b.time ? new Date(b.time).getTime() : 0;
              
              // Sort in descending order (newest first)
              return timeB - timeA;
            });
            setProducts(sortedProductsByTime);
            setFilteredProducts(sortedProductsByTime);
            return;
          }
        } catch (apiError) {
          console.error('API error:', apiError.message);
        }
        
        // Fallback to default products
        const productsData = await fetchProductsData(defaultProducts);
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        setError('Failed to load products data');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Get unique categories
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  const categories = Object.keys(categoryCounts).filter(category => categoryCounts[category] > 1);

  // Filter and Sort Products
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => {
        // Search in title
        const titleMatch = product.title?.toLowerCase().includes(query);
        
        // Search in price (remove currency symbols and compare)
        const priceStr = product.price?.toString().replace(/[₹,]/g, '') || '';
        const priceMatch = priceStr.includes(query);
        
        // Search in discount
        const discountStr = product.discount?.toString().toLowerCase() || '';
        const discountMatch = discountStr.includes(query);
        
        return titleMatch || priceMatch || discountMatch;
      });
    }

    try {
      // Sort products
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => parseFloat(a.price?.toString().replace(/[₹,]/g, '')) - parseFloat(b.price?.toString().replace(/[₹,]/g, '')));
          break;
        case 'price-high':
          filtered.sort((a, b) => parseFloat(b.price?.toString().replace(/[₹,]/g, '')) - parseFloat(a.price?.toString().replace(/[₹,]/g, '')));
          break;
        case 'rating':
          filtered.sort((a, b) => parseFloat(b.reviews?.toString().split(' ')[0]) - parseFloat(a.reviews?.toString().split(' ')[0]));
          break;
        case 'discount':
          filtered.sort((a, b) => {

            const discountA = parseFloat(a.discount?.toString().replace(/[%OFF ]/g, '') || '0');
            const discountB = parseFloat(b.discount?.toString().replace(/[%OFF ]/g, '') || '0');
            return discountB - discountA;
          });
          break;
        case 'time':
          filtered.sort((a, b) => {
            // Convert time strings to Date objects or timestamps for reliable comparison.
            // If 'time' is not present, treat it as a very old date (timestamp 0)
            // to ensure products without a time are placed at the end in a descending sort.
            const timeA = a.time ? new Date(a.time).getTime() : 0;
            const timeB = b.time ? new Date(b.time).getTime() : 0;
            
            // Sort in descending order (newest first)
            return timeB - timeA;
          });
          break;
        default:
          break;
      }
    } catch(e){}

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {isSidebarOpen && <div className="fixed inset-0 z-50 text-black">
        <div className="absolute inset-0 bg-black bg-opacity-50" style={{opacity: '0.8'}} onClick={handleCloseSidebar} />

        {/* Sidebar */}
        <div className={`absolute top-0 right-0 h-full w-full lg:w-1/2 xl:w-2/5 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0 overflow-y-auto`}>
          {selectedProduct && (
            <ProductDetailCard 
              product={selectedProduct} 
              onClose={handleCloseSidebar}
              showModal={isSidebarOpen}
            />
          )}
        </div>
      </div >}

      <AppHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Filter Bar */}
        <FilterBar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClearSearch={clearSearch}
        />

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.ASIN} 
              product={product} 
              isListView={true} 
              onProductClick={handleProductClick}
              isSelected={!!selectedProducts.find((p) => p.ASIN === product.ASIN)}
              onToggleSelect={toggleSelectProduct}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ShoppingCart className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </main>

      {/* Floating Create Story Button */}
      {selectedProducts.length >= 3 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={openStoryModal}
            className="px-5 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg"
          >
            Create Story ({selectedProducts.length})
          </button>
        </div>
      )}

      <StorySidebar
        isOpen={storySideBarOpen}
        onClose={closeStoryModal}
        selectedProducts={selectedProducts}
        onCopy={copyStoryToClipboard}
        heading={siteConfig.story.heading}
        saleName={siteConfig.story.saleName}
        introParagraph1={siteConfig.story.introParagraph1}
        introParagraph2={siteConfig.story.introParagraph2}
        buyNowLabel={siteConfig.story.buyNowLabel}
        buyNowRel={siteConfig.story.buyNowRel}
      />

      <AppFooter />
    </div>
  );
};


export default ProductListPage;