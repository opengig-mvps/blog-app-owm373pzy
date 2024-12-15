import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type SubscriptionRequestBody = {
  isActive: boolean;
};

export async function POST(
  request: Request,
  { params }: { params: { subscriptionId: string } },
) {
  try {
    const subscriptionId = parseInt(params.subscriptionId, 10);
    if (isNaN(subscriptionId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid subscription ID' },
        { status: 400 },
      );
    }

    const body: SubscriptionRequestBody = await request.json();
    const { isActive } = body;

    const updatedSubscription = await prisma.subscription.updateMany({
      where: { id: subscriptionId },
      data: {
        isActive,
        updatedAt: new Date(),
      },
    });

    if (updatedSubscription.count === 0) {
      return NextResponse.json(
        { success: false, message: 'Subscription not found' },
        { status: 404 },
      );
    }

    const subscription = await prisma.subscription.findFirst({
      where: { id: subscriptionId },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Subscription updated successfully',
        data: subscription,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error updating subscription:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}