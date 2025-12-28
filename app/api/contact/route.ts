import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations/schemas';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const data = contactSchema.parse(body);

    // Create contact message
    const message = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      messageId: message.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact message creation error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
