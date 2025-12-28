import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { careerApplicationSchema } from '@/lib/validations/schemas';
import { validateFile, saveFile } from '@/lib/utils/fileUpload';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      positionApplied: formData.get('positionApplied') as string,
      message: formData.get('message') as string || '',
    };

    // Validate form data
    careerApplicationSchema.parse(data);

    // Get and validate file
    const file = formData.get('resume') as File;
    if (!file) {
      return NextResponse.json(
        { error: 'Resume file is required' },
        { status: 400 }
      );
    }

    const fileValidation = validateFile(file);
    if (!fileValidation.valid) {
      return NextResponse.json(
        { error: fileValidation.error },
        { status: 400 }
      );
    }

    // Save file
    const resumePath = await saveFile(file);

    // Create application
    const application = await prisma.careerApplication.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        positionApplied: data.positionApplied,
        message: data.message,
        resumePath,
        status: 'NEW',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Career application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
