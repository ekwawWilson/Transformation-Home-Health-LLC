import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { appointmentSchema } from '@/lib/validations/schemas';
import { sendAppointmentConfirmation } from '@/lib/utils/email';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const data = appointmentSchema.parse(body);

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        serviceType: data.serviceType,
        preferredDate: new Date(data.preferredDate),
        preferredTime: data.preferredTime,
        message: data.message,
        status: 'PENDING',
      },
    });

    // Send confirmation email (non-blocking)
    sendAppointmentConfirmation(
      appointment.email,
      appointment.fullName,
      data.preferredDate,
      data.preferredTime
    ).catch(console.error);

    return NextResponse.json({
      success: true,
      message: 'Appointment request submitted successfully',
      appointmentId: appointment.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Appointment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to submit appointment request' },
      { status: 500 }
    );
  }
}
