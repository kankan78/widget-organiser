// Export Firebase configuration and services
export { default as app, db, auth, storage } from './firebase';

// Export Firebase actions
import { productActions, handleFirebaseError } from './firebaseActions';

// Re-export individual functions for convenience
export const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory
} = productActions; 

export { productActions, handleFirebaseError };