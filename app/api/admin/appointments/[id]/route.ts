import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth, createAuditLog } from '@/lib/middleware/auth';
import { statusUpdateSchema, replySchema } from '@/lib/validations/schemas';
import { sendAdminReply } from '@/lib/utils/email';
import { ZodError } from 'zod';

// Update appointment status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAuth(request);
  if (!auth.authenticated) {
    return auth.response!;
  }

  try {
    const { id } = await params;
    const appointmentId = parseInt(id);
    const body = await request.json();

    const { status } = statusUpdateSchema.parse(body);

    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: status as any },
    });

    // Create audit log
    await createAuditLog(
      auth.admin!.id,
      `Updated appointment status to ${status}`,
      'appointment',
      appointmentId
    );

    return NextResponse.json({
      success: true,
      appointment,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    );
  }
}

// Get single appointment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAuth(request);
  if (!auth.authenticated) {
    return auth.response!;
  }

  try {
    const { id } = await params;
    const appointmentId = parseInt(id);

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointment' },
      { status: 500 }
    );
  }
}
