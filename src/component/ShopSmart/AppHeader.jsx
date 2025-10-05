"use client"

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '../../lib/siteConfig';

const AppHeader = ({ title, subtitle, ctaLabel, ctaHref }) => {
  const { header } = siteConfig;
  const resolvedTitle = title ?? header.title;
  const resolvedSubtitle = subtitle ?? header.subtitle;
  const resolvedCtaLabel = ctaLabel ?? header.ctaLabel;
  const resolvedCtaHref = ctaHref ?? header.ctaHref;
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-bold text-white">{resolvedTitle}</h1>
            {resolvedCtaLabel && (
              <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                <Link href={resolvedCtaHref}>{resolvedCtaLabel}</Link>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-white-900 mb-2">{resolvedSubtitle}</h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;


