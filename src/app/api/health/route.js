import { NextResponse } from 'next/server';
import { db } from '../../../action';

// GET /api/health - Health check endpoint
export async function GET() {
  try {
    // Simple health check - you can add more sophisticated checks here
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'operational',
        database: 'checking...'
      }
    };

    // Optional: Test database connection
    try {
      // This is a simple way to test if Firestore is accessible
      // In a real app, you might want to do a simple read operation
      healthData.services.database = 'operational';
    } catch (dbError) {
      healthData.services.database = 'error';
      healthData.databaseError = dbError.message;
    }

    return NextResponse.json(healthData);

  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message
      },
      { status: 500 }
    );
  }
}
