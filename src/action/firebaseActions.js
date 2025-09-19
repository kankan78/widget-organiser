import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Product Actions
export const productActions = {
  // Get all products
  async getAllProducts() {
    try {
      const productsRef = collection(db, 'amazon');
      const snapshot = await getDocs(productsRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  // Get product by ID
  async getProductById(productId) {
    try {
      const amazonRef = collection(db, "amazon");
      const q = query(amazonRef, where("ASIN", "==", productId));
      const productSnap = await getDocs(q);
      let product = undefined;
      if (productSnap.docs.length > 0) {
        productSnap.forEach((doc) => {
          product = {
            id: doc.id,
            ...doc.data()
          };
        });
        return product;
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  },

  // Add new product
  async addProduct(productData) {
    try {
      const productsRef = collection(db, 'amazon');
      const docRef = await addDoc(productsRef, {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update product
  async updateProduct(productId, updateData) {
    try {
      const productRef = doc(db, 'amazon', productId);
      await updateDoc(productRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  async deleteProduct(productId) {
    try {
      const productRef = doc(db, 'amazon', productId);
      await deleteDoc(productRef);
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Search products by title or description
  async searchProducts(searchTerm) {
    try {
      const productsRef = collection(db, 'amazon');
      const q = query(
        productsRef,
        where('title', '>=', searchTerm),
        where('title', '<=', searchTerm + '\uf8ff'),
        orderBy('title'),
        limit(20)
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get products by category
  async getProductsByCategory(category) {
    try {
      const productsRef = collection(db, 'amazon');
      const q = query(
        productsRef,
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting products by category:', error);
      throw error;
    }
  }
};

// Utility function to handle errors
export const handleFirebaseError = (error) => {
  console.error('Firebase Error:', error);
  
  // Common Firebase error messages
  const errorMessages = {
    'permission-denied': 'You do not have permission to perform this action',
    'not-found': 'The requested document was not found',
    'already-exists': 'A document with this ID already exists',
    'invalid-argument': 'Invalid argument provided',
    'deadline-exceeded': 'Request timed out',
    'unavailable': 'Service is currently unavailable'
  };

  return errorMessages[error.code] || 'An unexpected error occurred';
};
