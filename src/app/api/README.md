# API Documentation

This directory contains Next.js API routes that expose Firebase data through server-side endpoints.

## Available Endpoints

### Products API

#### GET /api/products
Get all products with optional filtering and pagination.

**Query Parameters:**
- `category` (string): Filter by category
- `search` (string): Search in product titles
- `limit` (number): Limit number of results (default: 20)

**Example:**
```bash
GET /api/products?category=electronics&limit=10
GET /api/products?search=laptop&limit=5
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "product-id",
      "title": "Product Name",
      "price": "₹999",
      "category": "electronics",
      // ... other product fields
    }
  ],
  "count": 10
}
```

#### GET /api/products/[id]
Get a specific product by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "product-id",
    "title": "Product Name",
    "price": "₹999",
    // ... other product fields
  }
}
```

#### POST /api/products
Create a new product.

**Request Body:**
```json
{
  "title": "Product Name",
  "price": "₹999",
  "category": "electronics",
  "description": "Product description",
  "image": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new-product-id",
    "title": "Product Name",
    // ... other fields
  },
  "message": "Product created successfully"
}
```

#### PUT /api/products/[id]
Update an existing product.

**Request Body:**
```json
{
  "title": "Updated Product Name",
  "price": "₹899"
}
```

#### DELETE /api/products/[id]
Delete a product.

### Widgets API

#### GET /api/widgets
Get all widgets with optional filtering.

**Query Parameters:**
- `type` (string): Filter by widget type
- `limit` (number): Limit number of results (default: 50)

#### GET /api/widgets/[id]
Get a specific widget by ID.

#### POST /api/widgets
Create a new widget.

#### PUT /api/widgets/[id]
Update an existing widget.

#### DELETE /api/widgets/[id]
Delete a widget.

### Analytics API

#### POST /api/analytics
Track analytics events.

**Request Body for Product View:**
```json
{
  "type": "product_view",
  "productId": "product-id",
  "userId": "user-id" // optional
}
```

**Request Body for Widget Interaction:**
```json
{
  "type": "widget_interaction",
  "widgetId": "widget-id",
  "interactionType": "click",
  "userId": "user-id" // optional
}
```

### Health Check

#### GET /api/health
Check API and database health.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "api": "operational",
    "database": "operational"
  }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Human-readable error description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Usage in Components

Use the API client utilities in `src/lib/apiClient.js`:

```javascript
import { productsAPI, analyticsAPI } from '../lib/apiClient';

// Get all products
const response = await productsAPI.getAll();
if (response.success) {
  const products = response.data;
}

// Get product by ID
const product = await productsAPI.getById('product-id');

// Track analytics
await analyticsAPI.trackProductView('product-id');
```

## Security

- All API routes use server-side Firebase configuration
- Environment variables are used for sensitive data
- Input validation is performed on all endpoints
- Error messages are sanitized to prevent information leakage
