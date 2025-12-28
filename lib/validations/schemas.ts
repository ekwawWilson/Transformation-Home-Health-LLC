import { z } from 'zod';

// Admin Login Schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Appointment Schema
export const appointmentSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  serviceType: z.string().min(1, 'Please select a service type'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

// Career Application Schema
export const careerApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  positionApplied: z.string().min(1, 'Please select a position'),
  message: z.string().optional(),
});

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;

// Contact Message Schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Admin Reply Schema
export const replySchema = z.object({
  reply: z.string().min(10, 'Reply must be at least 10 characters'),
});

export type ReplyInput = z.infer<typeof replySchema>;

// Update Status Schema
export const statusUpdateSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'DECLINED', 'NEW', 'REVIEWED', 'SHORTLISTED', 'REJECTED']),
});

export type StatusUpdateInput = z.infer<typeof statusUpdateSchema>;
