'use client'
import React, { useState } from 'react';
import { Upload, X, ShoppingCart, ExternalLink, Share2 } from 'lucide-react';
import Link from 'next/link';

const ImageDetector = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectedItems, setDetectedItems] = useState([]);
  const [originalImageSize, setOriginalImageSize] = useState({ h: 600, w: 400 });
  const [displayImageSize, setDisplayImageSize] = useState({ h: 600, w: 400 });
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');

  // Mock fetch function - replace with your actual API endpoint
  const fetchItemData = async (imageUrl) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: "Strictly visit the Image URL and analyse the image , and detect all the items, and pass it to the search_items_tool for buying links",
          images: [imageUrl]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const mockResponse = JSON.parse(data.result)
        
      // Simulate API call delay
      // await new Promise(resolve => setTimeout(resolve, 1500));
      
      // // Mock response data
      // const mockResponse = {
      //   "image": {
      //     "url": "https://m.media-amazon.com/images/I/61hz9cK6gnL._SX679_.jpg",
      //     "size": {
      //       "h": "600px",
      //       "w": "400px"
      //     }
      //   },
      //   "detected_items": [
      //     {
      //       "type": "Shirt",
      //       "gender": "Male",
      //       "description": "Gray checked casual button-down shirt with rolled-up sleeves",
      //       "color": "Gray-white",
      //       "coordinate": {
      //         "x": 200,
      //         "y": 150
      //       },
      //       "shopping_links": [
      //         {
      //           "asin": "B09MZRST1Q",
      //           "url": "https://www.amazon.in/dp/B09MZRST1Q?tag=nbt_bestsellers-21&linkCode=osi&th=1&psc=1",
      //           "image": "https://m.media-amazon.com/images/I/21WpLTdlDZL._SL160_.jpg"
      //         }
      //       ]
      //     },
      //     {
      //       "type": "Pants",
      //       "gender": "Male",
      //       "description": "Blue casual jeans",
      //       "color": "Blue",
      //       "coordinate": {
      //         "x": 180,
      //         "y": 350
      //       },
      //       "shopping_links": [
      //         {
      //           "asin": "B0DHY3SKVB",
      //           "url": "https://www.amazon.in/dp/B0DHY3SKVB?tag=nbt_bestsellers-21&linkCode=osi&th=1&psc=1",
      //           "image": "https://m.media-amazon.com/images/I/41VrnKSl98L._SL160_.jpg"
      //         }
      //       ]
      //     },
      //     {
      //       "type": "Shoes",
      //       "gender": "Male",
      //       "description": "White casual sneakers",
      //       "color": "White",
      //       "coordinate": {
      //         "x": 160,
      //         "y": 520
      //       },
      //       "shopping_links": [
      //         {
      //           "asin": "B0FKH8NC8C",
      //           "url": "https://www.amazon.in/dp/B0FKH8NC8C?tag=nbt_bestsellers-21&linkCode=osi&th=1&psc=1",
      //           "image": "https://m.media-amazon.com/images/I/41CdKMgKpVL._SL160_.jpg"
      //         },
      //         {
      //           "asin": "B0F2FTY4HG",
      //           "url": "https://www.amazon.in/dp/B0F2FTY4HG?tag=nbt_bestsellers-21&linkCode=osi&th=1&psc=1",
      //           "image": "https://m.media-amazon.com/images/I/31OKl2TvNKL._SL160_.jpg"
      //         }
      //       ]
      //     }
      //   ]
      // };

      // setOriginalImageSize({ 
      //   h: parseInt(mockResponse.size.h), 
      //   w: parseInt(mockResponse.size.w) 
      // });
      
      // Calculate display size (max width 500px, maintain aspect ratio)
      const maxWidth = 500;
      const originalW = parseInt(mockResponse.size.w);
      const originalH = parseInt(mockResponse.size.h);
      const aspectRatio = originalH / originalW;
      
      const displayW = Math.min(maxWidth, originalW);
      const displayH = displayW * aspectRatio;
      
      setDisplayImageSize({ h: displayH, w: displayW });
      setDetectedItems(mockResponse.detected_items);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      setError('Please enter a valid image URL');
      return;
    }
    
    // Reset previous data
    setDetectedItems([]);
    setSelectedItem(null);
    
    await fetchItemData(imageUrl);
  };

  const handlePointerClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // Generate Telegram share link
  const generateTelegramShareLink = (productLink, itemType, description) => {
    const shareText = `🛍️ Check out this ${itemType}!\n\n${description}\n\n${productLink}`;
    const encodedText = encodeURIComponent(shareText);
    return `https://t.me/share/url?url=${encodeURIComponent(productLink)}&text=${encodedText}`;
  };

  // Calculate scaled coordinates based on display vs original size
  const getScaledCoordinates = (originalCoord) => {
    const scaleX = displayImageSize.w / originalImageSize.w;
    const scaleY = displayImageSize.h / originalImageSize.h;
    
    return {
      x: originalCoord.x * scaleX,
      y: originalCoord.y * scaleY
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h1 className="text-4xl font-bold mb-2"><Link href="/affilliate">ShopSmart</Link></h1>
                  {/* <p className="text-indigo-100 text-lg">Upload an image to discover and shop similar fashion items</p> */}
                </div>
              </div>
            </div>
          </header>

          {/* <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
            <h1 className="text-4xl font-bold mb-2">Smart Fashion Detector</h1>
            <p className="text-indigo-100 text-lg">Upload an image to discover and shop similar fashion items</p>
          </div> */}

          {/* Image Upload Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleImageSubmit(e)}
                  placeholder="https://example.com/your-image.jpg"
                  className="font-semibold text-gray-700 mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <button
                onClick={handleImageSubmit}
                disabled={isLoading}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Analyze Image
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Image Display with Pointers */}
          {imageUrl && (
            <div className="p-4">
              <div className="relative inline-block mx-auto">
                <img
                  src={imageUrl}
                  alt="Analyzed fashion"
                  className="rounded-lg shadow-lg"
                  style={{
                    width: `100%`,
                    height: `${originalImageSize.h}px`,
                    objectFit: 'cover'
                  }}
                  onError={() => setError('Failed to load image. Please check the URL.')}
                />
                
                {/* Item Pointers */}
                {detectedItems.map((item, index) => {
                  const scaledCoords = getScaledCoordinates(item.coordinate);
                  return (
                    <button
                      key={index}
                      onClick={() => handlePointerClick(item)}
                      className="absolute w-6 h-6 bg-black rounded-full border-3 border-white shadow-lg hover:scale-110 transition-transform cursor-pointer z-10 flex items-center justify-center"
                      style={{
                        left: `${scaledCoords.x}px`,
                        top: `${scaledCoords.y}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      title={`${item.type} - Click for details`}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Item Details Sidebar */}
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex">
              {/* Backdrop */}
              <button
                aria-label="Close sidebar"
                onClick={closeModal}
                className="flex-1 bg-black/50"
              />
              {/* Sidebar Panel */}
              <div className="w-1/2 max-w-[720px] h-full bg-white shadow-2xl overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedItem.type}</h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {/* Content */}
                <div className="p-6">
                  {/* Item Details */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {/* <div>
                        <span className="text-sm text-gray-500">Gender:</span>
                        <p className="font-semibold text-gray-700 mt-1">{selectedItem.gender}</p>
                      </div> */}
                      <div>
                        <span className="text-sm text-gray-500">Color:</span>
                        <p className="font-semibold text-gray-700 mt-1">{selectedItem.color}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="font-semibold text-gray-700 mt-1">{selectedItem.description}</p>
                      </div>
                    </div>
                    {/* <div>
                      <span className="text-sm text-gray-500">Description:</span>
                      <p className="font-semibold text-gray-700 mt-1">{selectedItem.description}</p>
                    </div> */}
                  </div>
                  {/* Shopping Links */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Similar Products
                    </h3>
                    <div className="grid gap-4">
                      {selectedItem.shopping_links.map((link, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="p-1 bg-gray-50">
                            <iframe src={`https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=${link.asin}&pagename=articleshow&tag=nbt_abcard3_js-21`} key={`sp-${index}`}  width="100%" height="110" style={{ border: '0', overflow: 'hidden' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                          </div>
                          <div className="flex-1">
                            {/* <p className="text-sm text-gray-600 mb-3">ASIN: {link.asin}</p> */}
                            <div className="flex gap-2 flex-wrap">
                              {/* <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                              >
                                View on Amazon
                                <ExternalLink className="w-4 h-4" />
                              </a> */}
                              <a
                                href={generateTelegramShareLink(link.url, selectedItem.type, selectedItem.description)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                title="Share on Telegram"
                              >
                                <Share2 className="w-4 h-4" />
                                Share on Telegram
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetector;