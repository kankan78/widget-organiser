"use client"

import React, { useState } from 'react';
import { Star, Eye, X } from 'lucide-react';
import ProductSpecs from './ProductSpecs';

export const ProductDetailCard = ({ product, onClose, showModal = false }) => {
  const [showSpecs, setShowSpecs] = useState(false);
  let { similarProducts = "" } = product || {};

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
      {typeof onClose === "function" && showModal && <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Product Details</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>}
      <div className="flex flex-col lg:flex-row overflow-y-auto h-full">
        <div className="relative bg-gray-50 p-4 sm:p-6 lg:w-1/2">
          {typeof product.discount === "string" && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
              {product.discount}
            </div>
          )}
          <div className="h-80 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300 h-full w-full"
            />
          </div>
          <div className="w-full bg-white rounded overflow-hidden">
            {product.iframe && <div className="p-2 bg-gray-50">
              {product.iframe.includes('<iframe') ? <div dangerouslySetInnerHTML={{ __html: product.iframe }} /> : <iframe src={product.iframe} width="100%" height="160" style={{ border: '0', overflow: 'hidden' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>}</div>
            }
            {Array.isArray(similarProducts) &&
              <div>
                Similar Products
                {similarProducts.map((sp, i) => (
                  <iframe key={`sp-${i}`} src={sp} width="100%" height="160" style={{ border: '0', overflow: 'hidden' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                ))}
              </div>
            }
          </div>
        </div>
        <div className="p-4 sm:p-6 lg:w-1/2 lg:border-l lg:border-gray-100">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl lg:text-1xl font-bold text-gray-800 mb-3 leading-tight">
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
            <ProductSpecs
              specsText={product.specifications || product.other_specs}
              title="Product Specifications"
              viewLabel="View Full Specifications"
              hideLabel="Hide Full Specifications"
            />
          </div>
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

export default ProductDetailCard;


