import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractToken } from '@/lib/utils/auth';
import { prisma } from '@/lib/prisma';

export interface AuthenticatedRequest extends NextRequest {
  admin?: {
    id: number;
    email: string;
    role: string;
  };
}

/**
 * Middleware to verify JWT token and attach admin to request
 */
export async function verifyAuth(request: NextRequest): Promise<{
  authenticated: boolean;
  admin?: {
    id: number;
    email: string;
    role: string;
  };
  response?: NextResponse;
}> {
  const authHeader = request.headers.get('Authorization');
  const token = extractToken(authHeader);

  if (!token) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      ),
    };
  }

  const payload = verifyToken(token);

  if (!payload) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      ),
    };
  }

  // Verify admin still exists in database
  const admin = await prisma.admin.findUnique({
    where: { id: payload.adminId },
  });

  if (!admin) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Admin not found' },
        { status: 401 }
      ),
    };
  }

  return {
    authenticated: true,
    admin: {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
  };
}

/**
 * Create audit log entry
 */
export async function createAuditLog(
  adminId: number,
  action: string,
  entityType: string,
  entityId: number
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        adminId,
        action,
        entityType,
        entityId,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}
