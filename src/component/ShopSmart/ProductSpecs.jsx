"use client"

import React, { useState } from 'react';
import { Eye } from 'lucide-react';

const ProductSpecs = ({
  specsText,
  title = 'Product Specifications',
  viewLabel = 'View Full Specifications',
  hideLabel = 'Hide Full Specifications',
}) => {
  if (!specsText) return null;
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Eye className="w-4 h-4" />
          {expanded ? hideLabel : viewLabel}
        </button>
      </div>
      {expanded && (
        <div className="mb-8 p-4 sm:p-5 bg-gray-50 rounded-lg border">
          <h3 className="font-bold text-gray-800 mb-4 text-base sm:text-lg">{title}</h3>
          <div className="space-y-3 text-sm">
            <div className="text-gray-700 pt-3">
              <div className="text-xs leading-relaxed text-gray-600">{specsText}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSpecs;


