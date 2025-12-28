import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth.authenticated) {
    return auth.response!;
  }

  try {
    // Get counts
    const [
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      totalAppointments,
      pendingApplications,
      reviewingApplications,
      shortlistedApplications,
      totalApplications,
      unreadMessages,
      repliedMessages,
      totalMessages,
      recentActivity,
    ] = await Promise.all([
      prisma.appointment.count({ where: { status: 'PENDING' } }),
      prisma.appointment.count({ where: { status: 'CONFIRMED' } }),
      prisma.appointment.count({ where: { status: 'COMPLETED' } }),
      prisma.appointment.count(),
      prisma.careerApplication.count({ where: { status: 'PENDING' } }),
      prisma.careerApplication.count({ where: { status: 'REVIEWING' } }),
      prisma.careerApplication.count({ where: { status: 'SHORTLISTED' } }),
      prisma.careerApplication.count(),
      prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
      prisma.contactMessage.count({ where: { status: 'REPLIED' } }),
      prisma.contactMessage.count(),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          admin: {
            select: {
              fullName: true,
              email: true,
            },
          },
        },
      }),
    ]);

    // Get recent appointments
    const recentAppointments = await prisma.appointment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      where: { status: 'PENDING' },
    });

    // Get recent applications
    const recentCareerApplications = await prisma.careerApplication.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      where: { status: 'PENDING' },
    });

    return NextResponse.json({
      success: true,
      stats: {
        appointments: {
          total: totalAppointments,
          pending: pendingAppointments,
          confirmed: confirmedAppointments,
          completed: completedAppointments,
        },
        applications: {
          total: totalApplications,
          pending: pendingApplications,
          reviewing: reviewingApplications,
          shortlisted: shortlistedApplications,
        },
        messages: {
          total: totalMessages,
          unread: unreadMessages,
          replied: repliedMessages,
        },
      },
      recentAppointments,
      recentCareerApplications,
      recentActivity,
    });
  } catch (error) {
    console.error('Error fetching overview:', error);
    return NextResponse.json(
      { error: 'Failed to fetch overview data' },
      { status: 500 }
    );
  }
}
