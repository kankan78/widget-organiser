import { NextResponse } from 'next/server';
import { productActions, handleFirebaseError } from '../../../../action';

// GET /api/products/[id] - Get product by ID
export async function GET(request, { params }) {
  try {
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product ID is required',
          message: 'Invalid request'
        },
        { status: 400 }
      );
    }

    const product = await productActions.getProductById(productId);

    return NextResponse.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    
    if (error.message === 'Product not found') {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
          message: 'The requested product does not exist'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: handleFirebaseError(error),
        message: 'Failed to fetch product'
      },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(request, { params }) {
  try {
    const { productId } = params;
    const updateData = await request.json();

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product ID is required',
          message: 'Invalid request'
        },
        { status: 400 }
      );
    }

    // Remove id from updateData if present (shouldn't be updated)
    delete updateData.id;

    await productActions.updateProduct(productId, updateData);

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error.message === 'Product not found') {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
          message: 'The requested product does not exist'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: handleFirebaseError(error),
        message: 'Failed to update product'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(request, { params }) {
  try {
    const { productId } = params;

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product ID is required',
          message: 'Invalid request'
        },
        { status: 400 }
      );  
    }

    await productActions.deleteProduct(productId);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    
    if (error.message === 'Product not found') {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
          message: 'The requested product does not exist'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: handleFirebaseError(error),
        message: 'Failed to delete product'
      },
      { status: 500 }
    );
  }
}
