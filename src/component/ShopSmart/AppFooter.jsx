"use client"

import React from 'react';
import { siteConfig } from '../../lib/siteConfig';

const AppFooter = ({ brand, year = new Date().getFullYear() }) => {
  const resolvedBrand = brand ?? siteConfig.footer.brand;
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">{resolvedBrand}</h3>
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
          <p>© {year} {resolvedBrand}. All rights reserved. Amazon affiliate partner.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;


