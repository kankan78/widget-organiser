"use client"

import React from 'react';
import { X, Copy } from 'lucide-react';
import StoryContent from './StoryContent';

const StorySidebar = ({
  isOpen,
  onClose,
  selectedProducts,
  onCopy,
  heading,
  saleName,
  introParagraph1,
  introParagraph2,
  buyNowLabel,
  buyNowRel,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 text-black">
      <div className="absolute inset-0 bg-black bg-opacity-50" style={{opacity: '0.8'}} onClick={onClose} />
      <div className={`absolute top-0 right-0 h-full w-full lg:w-1/2 xl:w-2/5 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Generated Story</h3>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-auto p-4">
            <div className="border border-gray-200 rounded-md p-3 text-sm">
              <StoryContent
                items={selectedProducts}
                heading={heading}
                saleName={saleName}
                introParagraph1={introParagraph1}
                introParagraph2={introParagraph2}
                buyNowLabel={buyNowLabel}
                buyNowRel={buyNowRel}
              />
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between gap-3">
              <div className="flex -space-x-2">
                {selectedProducts.map((p) => (
                  <img key={`s-${p.ASIN}`} src={p.image} alt={p.title} className="w-10 h-10 rounded object-cover border" />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onCopy} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-2 text-sm">
                  <Copy className="w-4 h-4" /> Copy
                </button>
                <button onClick={onClose} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm">Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySidebar;


