import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { stripePaymentIntent } from '@/lib/stripe';

type PaymentDetails = {
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
};

type SubscriptionRequestBody = {
  userId: number;
  paymentDetails: PaymentDetails;
};

export async function POST(request: Request) {
  try {
    const body: SubscriptionRequestBody = await request.json();

    const { userId, paymentDetails } = body;

    if (!userId || !paymentDetails) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }

    const { amount, paymentMethod, paymentStatus } = paymentDetails;

    const paymentIntent = await stripePaymentIntent.create({
      amount,
      currency: 'usd',
      paymentMethodTypes: [paymentMethod],
    });

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { success: false, message: 'Payment failed' },
        { status: 400 },
      );
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        isActive: true,
        payments: {
          create: {
            amount,
            paymentStatus,
            paymentDate: new Date().toISOString(),
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Subscription created successfully',
        data: {
          id: subscription.id,
          userId: subscription.userId,
          isActive: subscription.isActive,
          createdAt: subscription.createdAt.toISOString(),
          updatedAt: subscription.updatedAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}