"use client"

import React, { useState, useEffect } from 'react';
import { Star, Eye } from 'lucide-react';
import { productsAPI } from '../lib/apiClient';
import Link from 'next/link';

// Dummy API function
const fetchProductData = async () => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        "ASIN": "B0DRJBQFN6",
        "image": "https://m.media-amazon.com/images/I/71Ee5ERStQL._SL1500_.jpg",
        "price": "₹999.00",
        "originalPrice": "₹1,599.00",
        "discount": "39% OFF",
        "iframe": "<iframe src=\"https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=B0DRJBQFN6&pagename=articleshow&tag=nbt_abcard3_js-21\" width=\"100%\" height=\"160\" style=\"border:0;overflow:hidden\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
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
        "hindiDescription": "GRAPHENE का यह Rotating Musical Drum टॉडलर्स के लिए बढ़िया ऑप्शन है। मल्टीकलर डिज़ाइन, प्लास्टिक मटेरियल और 18×17×17 सेमी के कॉम्पैक्ट साइज में आता है। पैक ऑफ 1 में मिलने वाला यह ड्रम 2×AA बैटरी से चलता है (बैटरी शामिल नहीं)। कई यूज़र्स ने इसे 'value for money' और साउंड क्वालिटी अच्छी बताई है, हालांकि कुछ को प्रोडक्ट पसंद नहीं आया। कुल मिलाकर छोटे बच्चों के लिए लाइट्स और अलग-अलग साउंड्स के साथ एंटरटेनिंग और पॉकेट-फ्रेंडली चॉइस।",
        "similarProducts" : '["https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=B0C8B39M7B&pagename=articleshow&tag=nbt_abcard3_js-21", "https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=B0CFGBT6FN&pagename=articleshow&tag=nbt_abcard3_js-21", "https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=B0C65J64J7&pagename=articleshow&tag=nbt_abcard3_js-21"]'
    };
};

const ProductCard = ({ product }) => {
    const [showSpecs, setShowSpecs] = useState(false);
    let {similarProducts=""} = product || {};

    similarProducts = similarProducts && JSON.parse(similarProducts);

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

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Side by Side Layout */}
            <div className="flex flex-col lg:flex-row">
                {/* Product Image Section */}
                <div className="relative bg-gray-50 p-4 sm:p-6 lg:w-1/2">

                    {typeof product.discount === "string" && (
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

                    <div className="w-full bg-white rounded overflow-hidden">
                        {/* Affiliate Widget */}
                        {product.iframe && <div className="p-2 bg-gray-50">
                            {product.iframe.includes('<iframe') ? <div dangerouslySetInnerHTML={{ __html: product.iframe }}/> : <iframe src={product.iframe} width="100%" height="160" style={{ border: '0', overflow: 'hidden' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>}</div>
                        }
                        
                        {Array.isArray(similarProducts) &&
                            <div>
                                Similar Products
                                {similarProducts.map((sp,i)=>
                                    (<iframe key={`sp-${i}`} src={sp} width="100%" height="160" style={{ border: '0', overflow: 'hidden' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>)
                                )}
                            </div>
                        }
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="p-4 sm:p-6 lg:w-1/2 lg:border-l lg:border-gray-100">
                    <div className="mb-4">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 leading-tight">
                            {product.title}
                        </h2>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1">
                                {renderStars(product.reviews)}
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.reviews} ({product.reviewCount} reviews)
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl sm:text-3xl font-bold text-green-600">{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-base sm:text-lg text-gray-500 line-through">{product.originalPrice}</span>
                            )}
                        </div>
                    </div>

                    {/* Brand Info */}
                    <div className="mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm mb-4">
                            <div>
                                <span className="text-gray-600 block mb-1">Brand:</span>
                                <span className="font-medium text-gray-800 ">{product.brand}</span>
                            </div>
                            <div>
                                <span className="text-gray-600 block mb-1">Color:</span>
                                <span className="font-medium text-gray-800 ">{product.color}</span>
                            </div>
                            <div>
                                <span className="text-gray-600 block mb-1">Material:</span>
                                <span className="font-medium text-gray-800 ">{product.material}</span>
                            </div>
                            <div>
                                <span className="text-gray-600 block mb-1">Size:</span>
                                <span className="font-medium text-gray-800 ">{product.size}</span>
                            </div>
                        </div>

                        {/* <div className="text-sm text-gray-600">Brand:</div>
                        <div className="font-semibold text-blue-700 text-lg">{product.specifications.brand}</div> */}

                        {/* Quick Specs */}
                        {
                            (product.specifications || product.other_specs) && (
                                <div className="mb-8">
                                    <button
                                        onClick={() => setShowSpecs(!showSpecs)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2 transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        {showSpecs ? 'Hide' : 'View'} Full Specifications
                                    </button>
                                </div>
                            )
                        }

                        {/* Full Specifications */}
                        {showSpecs && (product.specifications || product.other_specs) && (
                            <div className="mb-8 p-4 sm:p-5 bg-gray-50 rounded-lg border">
                                <h3 className="font-bold text-gray-800 mb-4 text-base sm:text-lg">Product Specifications</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="text-gray-700 pt-3">
                                        <div className="font-medium mb-2">Additional Details:</div>
                                        <div className="text-xs leading-relaxed text-gray-600">{product.specifications || product.other_specs}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Hindi Description */}
                    <div className="mb-8 p-4 sm:p-6 bg-orange-50 rounded-lg border border-orange-200">
                        <h3 className="font-bold text-gray-800 mb-3 text-base sm:text-lg">विवरण</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {product.hindiDescription}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductDetailPage = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                
                // Try to get product from API first
                if (productId) {
                    try {
                        const response = await productsAPI.getById(productId);
                        if (response.success && response.data) {
                            setProduct(response.data);
                            return;
                        }
                    } catch (apiError) {
                        console.error('API error:', apiError.message);
                    }
                }
                
                // Fallback to default product data
                const productData = await fetchProductData();
                setProduct(productData);
            } catch (err) {
                setError('Failed to load product data');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product...</p>
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
            {/* <link rel="stylesheet" href="https://www.claudeusercontent.com/_next/static/css/4d950d3f0ed6496a.css" ></link> */}
            <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <h1 className="text-4lg sm:text-2xl font-bold text-white"><Link href="/affilliate">ShopSmart</Link></h1>
                            <span className="text-xs sm:text-sm bg-orange-100 text-orange-800 px-2 sm:px-3 py-1 rounded-full">
                                <Link href={"/affilliate/smart-image"}>Shop By Image</Link>
                            </span>
                        </div>
                        {/* <nav className="hidden md:flex space-x-4 lg:space-x-6 text-sm">
                            <a href="#" className="text-gray-600 hover:text-gray-900">इलेक्ट्रॉनिक्स</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">किचन & डाइनिंग</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">टॉप डील्स</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">मोबाइल</a>
                        </nav> */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {product && <ProductCard product={product} />}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 sm:py-8 mt-8 sm:mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-4">
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

export default ProductDetailPage;