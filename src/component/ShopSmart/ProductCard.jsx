"use client"

import React from 'react';
import { Star, ArrowRight, CheckSquare, Square } from 'lucide-react';

const ProductCard = ({ product, isListView = true, onProductClick, isSelected = false, onToggleSelect }) => {
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
    const months = Math.floor(days / 30.44);
    if (months < 12) return `${months}mo${months === 1 ? '' : 's'} ago`;
    const years = Math.floor(days / 365.25);
    return `${years} y${years === 1 ? '' : 's'} ago`;
  };

  if (!isListView) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col lg:flex-row">
          <div className="relative bg-gray-50 p-6 lg:w-1/2">
            {product.time && 
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
          <div className="p-6 lg:w-1/2 lg:border-l lg:border-gray-100"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
    >
      <div className="relative bg-gray-50 p-6">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect && onToggleSelect(product);
          }}
          className="absolute top-2 left-2 z-10 bg-white/90 rounded-md p-1 shadow hover:bg-white"
          aria-label={isSelected ? 'Deselect product' : 'Select product'}
          title={isSelected ? 'Deselect' : 'Select'}
          style={{marginTop: '15%'}}
        >
          {isSelected ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-gray-500" />}
        </button>
        {product.time && 
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {renderStars(product.reviews)}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
          )}
        </div>
        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm group-hover:bg-orange-600"
          onClick={() => onProductClick && onProductClick(product)}
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


