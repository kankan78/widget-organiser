# Firebase Actions

This folder contains Firebase integration files for the widget organizer project.

## Files

- `firebase.js` - Firebase configuration and initialization
- `firebaseActions.js` - Database operations and business logic
- `index.js` - Main export file for easy imports

## Setup

1. Install Firebase dependencies:
```bash
npm install firebase
```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase project credentials from Firebase Console > Project Settings > General > Your apps
   - The `.env.local` file is already in `.gitignore` to keep your credentials secure

3. Firebase configuration is loaded from environment variables for security.

## Usage

### Basic Import
```javascript
import { db, auth, storage } from '@/action';
```

### Using Product Actions
```javascript
import { productActions } from '@/action';

// Get all products
const products = await productActions.getAllProducts();

// Get product by ID
const product = await productActions.getProductById('product-id');

// Add new product
const productId = await productActions.addProduct({
  title: 'Product Name',
  price: '₹999',
  description: 'Product description'
});

// Update product
await productActions.updateProduct('product-id', {
  price: '₹899'
});

// Search products
const searchResults = await productActions.searchProducts('search term');

// Get products by category
const categoryProducts = await productActions.getProductsByCategory('electronics');
```

### Using Widget Actions
```javascript
import { widgetActions } from '@/action';

// Get all widgets
const widgets = await widgetActions.getAllWidgets();

// Add new widget
const widgetId = await widgetActions.addWidget({
  label: 'widget-name',
  type: 'list',
  config: { /* widget configuration */ }
});
```

### Using Analytics Actions
```javascript
import { analyticsActions } from '@/action';

// Track product view
await analyticsActions.trackProductView('product-id', 'user-id');

// Track widget interaction
await analyticsActions.trackWidgetInteraction('widget-id', 'click', 'user-id');
```

### Error Handling
```javascript
import { handleFirebaseError } from '@/action';

try {
  const products = await productActions.getAllProducts();
} catch (error) {
  const errorMessage = handleFirebaseError(error);
  console.error(errorMessage);
}
```

## Database Structure

### Products Collection
```javascript
{
  id: "auto-generated-id",
  title: "Product Name",
  price: "₹999",
  originalPrice: "₹1299",
  discount: "23% OFF",
  image: "https://...",
  description: "Product description",
  specifications: {
    brand: "Brand Name",
    color: "Color",
    material: "Material",
    size: "Size"
  },
  category: "electronics",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### Widgets Collection
```javascript
{
  id: "auto-generated-id",
  label: "widget-name",
  type: "list|iframe|ad|photo|weather|servicedrawer|banner",
  config: {
    // Widget-specific configuration
  },
  position: {
    row: 1,
    col: 2
  },
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### Analytics Collection
```javascript
{
  id: "auto-generated-id",
  type: "product_view|widget_interaction",
  productId: "product-id", // for product views
  widgetId: "widget-id", // for widget interactions
  interactionType: "click|view|hover", // for widget interactions
  userId: "user-id", // optional
  timestamp: "timestamp"
}
```

## Security Rules

Make sure to set up proper Firestore security rules in your Firebase console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to products
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow read access to widgets
    match /widgets/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Analytics - write only
    match /analytics/{document} {
      allow write: if true;
      allow read: if request.auth != null;
    }
  }
}
```
