import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type BlogPostRequestBody = {
  title: string;
  content: string;
  isPremium: boolean;
};

export async function POST(
  request: Request,
  { params }: { params: { blogPostId: string } },
) {
  try {
    const blogPostId = parseInt(params.blogPostId, 10);
    if (isNaN(blogPostId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid blog post ID' },
        { status: 400 },
      );
    }

    const body: BlogPostRequestBody = await request.json();
    const { title, content, isPremium } = body;

    if (!title || !content || typeof isPremium !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'Missing required fields or incorrect format' },
        { status: 400 },
      );
    }

    const updatedBlogPost = await prisma.blogPost.update({
      where: { id: blogPostId },
      data: {
        title,
        content,
        isPremium,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post updated successfully',
        data: updatedBlogPost,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}