import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type BlogPostRequestBody = {
  title: string;
  content: string;
  isPremium: boolean;
  authorId: number;
};

export async function POST(request: Request) {
  try {
    const body: BlogPostRequestBody = await request.json();

    const { title, content, isPremium, authorId } = body;

    if (!title || !content || typeof isPremium !== 'boolean' || isNaN(authorId)) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields or incorrect format' },
        { status: 400 },
      );
    }

    const author = await prisma.user.findFirst({
      where: { id: authorId },
    });

    if (!author) {
      return NextResponse.json(
        { success: false, message: 'Author not found' },
        { status: 404 },
      );
    }

    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        isPremium,
        authorId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post created successfully',
        data: {
          id: blogPost.id,
          title: blogPost.title,
          content: blogPost.content,
          isPremium: blogPost.isPremium,
          authorId: blogPost.authorId,
          createdAt: blogPost.createdAt.toISOString(),
          updatedAt: blogPost.updatedAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}