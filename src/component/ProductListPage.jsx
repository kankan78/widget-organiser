"use client"

import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { productsAPI } from '../lib/apiClient';

// Dummy API function - returns array of products
const fetchProductsData = async () => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return default products for now
  // Firebase integration will be handled in the component
  return defaultProducts;
};

const ProductCard = ({ product, isListView = true }) => {
  // const [isWishlisted, setIsWishlisted] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const numRating = rating && parseFloat(rating.toString().split(' ')[0]);
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-4 h-4 ${i <= numRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  const formatTimeAgo = (timestamp) => {
    console.log(timestamp);
    
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 0) return "in the future"; 
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    const months = Math.floor(days / 30.44); // Average days in a month
    if (months < 12) return `${months}mo${months === 1 ? '' : 's'} ago`;
    const years = Math.floor(days / 365.25); // Average days in a year
    return `${years} y${years === 1 ? '' : 's'} ago`;
  };

  if (!isListView) {
    // Detailed view for single product (original layout)
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Side by Side Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Product Image Section */}
          <div className="relative bg-gray-50 p-6 lg:w-1/2">
            {/* <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} shadow-md hover:scale-110 transition-all duration-200`}
              >
                <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div> */}
            {product.time && 
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {/* Note: formatTimeAgo function needs to be defined in scope */}
                  {formatTimeAgo(product.time)}
                </span>
              </div> 
            }
            
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                {product.discount}
              </div>
            )}
            
            <div className="aspect-square flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.title}
                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-6 lg:w-1/2 lg:border-l lg:border-gray-100">
            {/* Content here would be the same as before */}
          </div>
        </div>
      </div>
    );
  }

  // List view for product grid
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
      {/* Product Image Section */}
      <div className="relative bg-gray-50 p-6">
        {/* <div className="absolute top-2 right-2 z-10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className={`p-2 rounded-full ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} shadow-md hover:scale-110 transition-all duration-200`}
          >
            <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div> */}
        {product.time && 
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {/* Note: formatTimeAgo function needs to be defined in scope */}
              {formatTimeAgo(product.time)}
            </span>
          </div> 
        }
        
        {typeof product.discount === "string" && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
            {product.discount}
          </div>
        )}
        
        <div className="aspect-square flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4">
        {/* Category Badge */}
        {/* <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div> */}

        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {renderStars(product.reviews)}
          </div>
          {/* <span className="text-xs text-gray-600">
            {product.reviews} ({product.reviewCount})
          </span> */}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
          )}
        </div>

        {/* Brand Info */}
        {/* <div className="mb-3 p-2 bg-blue-50 rounded text-center">
          <div className="text-xs text-gray-600">Brand:</div>
          <div className="font-semibold text-blue-700 text-sm">{product?.brand || product.other_specs?.brand}</div>
        </div> */}

        {/* Quick Description */}
        {/* <p className="text-xs text-gray-600 mb-4 line-clamp-2">
          {product.hindiDescription}
        </p> */}

        {/* Action Button */}
        {/* <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm group-hover:bg-orange-600"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </button> */}
      </div>
    </div>
  );
};

const FilterBar = ({ categories, selectedCategory, onCategoryChange, sortBy, onSortChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-blue-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="discount">Best Discount</option>
          <option value="time">Time</option>
        </select>
      </div>
    </div>
  );
};

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

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
        const productsData = await fetchProductsData();
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
  }, [products, selectedCategory, sortBy]);

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
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-4xl font-bold text-white">ShopSmart</h1>
              <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                <Link href={"/affilliate/smart-image"}>Shop By Image</Link>
              </span>
            </div>
            {/* <nav className="hidden md:flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">इलेक्ट्रॉनिक्स</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">किचन & डाइनिंग</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">टॉप डील्स</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">मोबाइल</a>
            </nav> */}
            {/* Page Header */}
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-white-900 mb-2">Best Deal Products</h2>
              {/* <div className="text-white-600">Discover amazing deals on top-quality products</div> */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Filter Bar */}
        <FilterBar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link href={`/affilliate/${product.ASIN}`} key={product.ASIN}>
              <ProductCard key={product.ASIN} product={product} isListView={true} />
            </Link>
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">ShopSmart</h3>
              <p className="text-gray-300 text-sm">
                Your trusted Amazon affiliate partner for the best deals and products.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-300 hover:text-white block">About Us</a>
                <a href="#" className="text-gray-300 hover:text-white block">Contact</a>
                <a href="#" className="text-gray-300 hover:text-white block">Privacy Policy</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-300 hover:text-white block">Electronics</a>
                <a href="#" className="text-gray-300 hover:text-white block">Home & Kitchen</a>
                <a href="#" className="text-gray-300 hover:text-white block">Fashion</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
            <p>© 2024 ShopSmart. All rights reserved. Amazon affiliate partner.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const defaultProducts = [
  {
    "ASIN": "B0DRJBQFN6",
    "image": "https://m.media-amazon.com/images/I/71Ee5ERStQL._SL1500_.jpg",
    "price": "₹999.00",
    "originalPrice": "₹1,599.00",
    "discount": "39% OFF",
    "iframe": "<iframe src=\"https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=B0DRJBQFN6&pagename=articleshow&tag=nbt_abcard3_js-21\" width=\"100%\" height=\"320\" style=\"border:0;overflow:hidden\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    "specifications": {
      "brand": "GRAPHENE",
      "color": "Multicolor",
      "size": "Pack of 1 (Style: Rotating Drum)",
      "material": "Plastic",
      "other_specs": "Dimensions: 18 x 17 x 17 cm; Weight: 580 g; Power Source: 2xAA Battery (Not Included); Manufacturer: Vihaan Enterprises; Country of Origin: India"
    },
    "reviews": "3.6 out of 5",
    "reviewCount": "1,248",
    "title": "GRAPHENE Rotating Musical Drum for Toddlers",
    "category": "Toys & Games",
    "hindiDescription": "GRAPHENE का यह Rotating Musical Drum टॉडलर्स के लिए बढ़िया ऑप्शन है। मल्टीकलर डिज़ाइन, प्लास्टिक मटेरियल और 18×17×17 सेमी के कॉम्पैक्ट साइज में आता है।"
  },
  {
    "ASIN": "B08N5WRWNW",
    "image": "https://m.media-amazon.com/images/I/51FNnHjzhQL._AC_UY436_FMwebp_QL65_.jpg",
    "price": "₹2,499.00",
    "originalPrice": "₹3,999.00",
    "discount": "37% OFF",
    "iframe": "<iframe src=\"https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=B08N5WRWNW&pagename=articleshow&tag=nbt_abcard3_js-21\" width=\"100%\" height=\"320\" style=\"border:0;overflow:hidden\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    "specifications": {
      "brand": "boAt",
      "color": "Black",
      "size": "On-Ear",
      "material": "Plastic",
      "other_specs": "Wireless Bluetooth Headphones with 40mm drivers; Playback time: 8 Hours; Charging time: 2.5 Hours; Bluetooth version: 5.0"
    },
    "reviews": "4.2 out of 5",
    "reviewCount": "15,234",
    "title": "boAt Rockerz 450 Bluetooth On Ear Headphones",
    "category": "Electronics",
    "hindiDescription": "boAt Rockerz 450 एक बेहतरीन वायरलेस हेडफोन है जो 8 घंटे तक की प्लेबैक टाइम देता है। 40mm ड्राइवर के साथ क्रिस्टल क्लियर साउंड क्वालिटी मिलती है।"
  },
  {
    "ASIN": "B0C1H2XQZP",
    "image": "https://m.media-amazon.com/images/I/71Swqqe7XaL._SL1500_.jpg",
    "price": "₹1,299.00",
    "originalPrice": "₹1,999.00",
    "discount": "35% OFF",
    "iframe": "<iframe src=\"https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=B0C1H2XQZP&pagename=articleshow&tag=nbt_abcard3_js-21\" width=\"100%\" height=\"320\" style=\"border:0;overflow:hidden\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    "specifications": {
      "brand": "Milton",
      "color": "Blue",
      "size": "1000ml",
      "material": "Stainless Steel",
      "other_specs": "Vacuum Insulated Water Bottle; Keeps hot for 24 hours, cold for 24 hours; BPA Free; Leak proof design"
    },
    "reviews": "4.3 out of 5",
    "reviewCount": "8,567",
    "title": "Milton Thermosteel Flip Lid Flask, 1000 ml",
    "category": "Home & Kitchen",
    "hindiDescription": "Milton का यह थर्मोस्टील फ्लास्क 24 घंटे तक गर्म और ठंडा दोनों रखता है। 1000ml कैपेसिटी और लीक प्रूफ डिज़ाइन के साथ यह बेहद उपयोगी है।"
  },
  {
    "ASIN": "B0BDK7QNZS",
    "image": "https://m.media-amazon.com/images/I/61zAjw4bqPL._SL1080_.jpg",
    "price": "₹3,499.00",
    "originalPrice": "₹5,999.00",
    "discount": "42% OFF",
    "iframe": "<iframe src=\"https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=B0BDK7QNZS&pagename=articleshow&tag=nbt_abcard3_js-21\" width=\"100%\" height=\"320\" style=\"border:0;overflow:hidden\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    "specifications": {
      "brand": "Fossil",
      "color": "Brown",
      "size": "42mm",
      "material": "Leather",
      "other_specs": "Analog Watch; Water resistant up to 50 meters; Japanese Quartz Movement; 2 Year Warranty"
    },
    "reviews": "4.1 out of 5",
    "reviewCount": "3,456",
    "title": "Fossil Grant Chronograph Brown Leather Watch",
    "category": "Fashion",
    "hindiDescription": "Fossil की यह ब्राउन लेदर वॉच एक क्लासिक क्रोनोग्राफ डिज़ाइन के साथ आती है। 50 मीटर तक वाटर रेसिस्टेंट और 2 साल की वारंटी के साथ।"
  },
  {
    "ASIN": "B09JQBH8KL",
    "image": "https://m.media-amazon.com/images/I/71fxvQqcTzL._SL1500_.jpg",
    "price": "₹899.00",
    "originalPrice": "₹1,499.00",
    "discount": "40% OFF",
    "iframe": "<iframe src=\"https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=B09JQBH8KL&pagename=articleshow&tag=nbt_abcard3_js-21\" width=\"100%\" height=\"320\" style=\"border:0;overflow:hidden\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    "specifications": {
      "brand": "Mamaearth",
      "color": "Natural",
      "size": "200ml",
      "material": "Natural Ingredients",
      "other_specs": "Vitamin C Face Wash; Suitable for all skin types; Paraben & SLS Free; Dermatologically Tested"
    },
    "reviews": "4.0 out of 5",
    "reviewCount": "12,890",
    "title": "Mamaearth Vitamin C Face Wash with Vitamin C & Turmeric",
    "category": "Beauty & Personal Care",
    "hindiDescription": "Mamaearth का यह विटामिन C फेस वॉश हल्दी के साथ आता है। सभी स्किन टाइप के लिए उपयुक्त और पैराबेन & SLS फ्री फॉर्मूला।"
  },
  {
    "ASIN": "B0C7GTHRMQ",
    "image": "https://m.media-amazon.com/images/I/61DUktu-AFL._SL1080_.jpg",
    "price": "₹599.00",
    "originalPrice": "₹999.00",
    "discount": "40% OFF",
    "iframe": "<iframe src=\"https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=B0C7GTHRMQ&pagename=articleshow&tag=nbt_abcard3_js-21\" width=\"100%\" height=\"320\" style=\"border:0;overflow:hidden\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    "specifications": {
      "brand": "Generic",
      "color": "Multi",
      "size": "Universal",
      "material": "Silicone & Plastic",
      "other_specs": "Mobile Stand for Desk; 360 Degree Rotation; Foldable Design; Compatible with all smartphones"
    },
    "reviews": "3.8 out of 5",
    "reviewCount": "2,145",
    "title": "Adjustable Mobile Phone Stand for Desk",
    "category": "Mobile Accessories",
    "hindiDescription": "यह एडजस्टेबल मोबाइल स्टैंड डेस्क के लिए बेहतरीन है। 360 डिग्री रोटेशन और फोल्डेबल डिज़ाइन के साथ सभी स्मार्टफोन के लिए उपयुक्त।"
  }
];

export default ProductListPage;