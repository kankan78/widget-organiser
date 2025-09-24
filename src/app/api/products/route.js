import { NextResponse } from 'next/server';
import { productActions, handleFirebaseError } from '../../../action';

// GET /api/products - Get all products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 50;

    let products;

    if (search) {
      products = await productActions.searchProducts(search);
    } else if (category && category !== 'all') {
      products = await productActions.getProductsByCategory(category);
    } else {
      products = await productActions.getAllProducts();
    }

    // Apply limit
    if (limit > 0) {
      products = products.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: handleFirebaseError(error),
        message: 'Failed to fetch products'
      },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product
export async function POST(request) {
  try {
    const productData = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'price'];
    const missingFields = requiredFields.filter(field => !productData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
          message: 'Validation failed'
        },
        { status: 400 }
      );
    }

    const productId = await productActions.addProduct(productData);

    return NextResponse.json(
      {
        success: true,
        data: { id: productId, ...productData },
        message: 'Product created successfully'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: handleFirebaseError(error),
        message: 'Failed to create product'
      },
      { status: 500 }
    );
  }
}
