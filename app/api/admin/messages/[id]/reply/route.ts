import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth, createAuditLog } from '@/lib/middleware/auth';
import { replySchema } from '@/lib/validations/schemas';
import { sendAdminReply } from '@/lib/utils/email';
import { ZodError } from 'zod';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAuth(request);
  if (!auth.authenticated) {
    return auth.response!;
  }

  try {
    const { id } = await params;
    const messageId = parseInt(id);
    const body = await request.json();

    const { reply } = replySchema.parse(body);

    const message = await prisma.contactMessage.update({
      where: { id: messageId },
      data: {
        adminReply: reply,
        repliedAt: new Date(),
      },
    });

    // Send email to client (non-blocking)
    sendAdminReply(
      message.email,
      message.name,
      reply,
      'contact'
    ).catch(console.error);

    // Create audit log
    await createAuditLog(
      auth.admin!.id,
      'Replied to contact message',
      'contact_message',
      messageId
    );

    return NextResponse.json({
      success: true,
      message: 'Reply sent successfully',
      contactMessage: message,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error replying to message:', error);
    return NextResponse.json(
      { error: 'Failed to send reply' },
      { status: 500 }
    );
  }
}
