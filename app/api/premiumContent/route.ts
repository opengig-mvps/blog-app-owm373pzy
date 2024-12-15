import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const userId = request.headers.get('user-id');
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid User ID' },
        { status: 400 }
      );
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: parsedUserId,
        isActive: true,
      },
    });

    if (!subscription) {
      return NextResponse.json(
        { success: false, message: 'User is not subscribed to premium content' },
        { status: 403 }
      );
    }

    const premiumContent = await prisma.blogPost.findFirst({
      where: {
        isPremium: true,
      },
      select: {
        id: true,
        title: true,
        content: true,
        isPremium: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!premiumContent) {
      return NextResponse.json(
        { success: false, message: 'No premium content available' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Premium content retrieved successfully',
        data: premiumContent,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error retrieving premium content:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 }
    );
  }
}