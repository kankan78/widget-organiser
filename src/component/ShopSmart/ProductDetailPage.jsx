"use client"

import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../lib/apiClient';
import { defaultProducts } from '../../lib/defaultProducts';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import ProductDetailCard from './ProductDetailCard';
import { fetchProductData } from '../../lib/utils';

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
                const productData = await fetchProductData(defaultProducts);
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
            <AppHeader />

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {product && <ProductDetailCard product={product} />}
            </main>

            <AppFooter />
        </div>
    );
};

export default ProductDetailPage;