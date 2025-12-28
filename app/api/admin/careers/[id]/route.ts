import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth, createAuditLog } from '@/lib/middleware/auth';
import { statusUpdateSchema } from '@/lib/validations/schemas';
import { ZodError } from 'zod';

// Update application status
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
    const applicationId = parseInt(id);
    const body = await request.json();

    const { status } = statusUpdateSchema.parse(body);

    const application = await prisma.careerApplication.update({
      where: { id: applicationId },
      data: { status: status as any },
    });

    // Create audit log
    await createAuditLog(
      auth.admin!.id,
      `Updated application status to ${status}`,
      'career_application',
      applicationId
    );

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// Get single application
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
    const applicationId = parseInt(id);

    const application = await prisma.careerApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}
