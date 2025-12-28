"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentSchema, type AppointmentInput } from '@/lib/validations/schemas';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { Calendar, Clock, Heart } from 'lucide-react';

export default function AppointmentsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
  });

  const serviceTypes = [
    { value: 'Home Care & Personal Assistance', label: 'Home Care & Personal Assistance' },
    { value: 'Skilled Nursing Support', label: 'Skilled Nursing Support' },
    { value: 'Developmental Disability Services', label: 'Developmental Disability Services' },
    { value: 'Community Integration', label: 'Community Integration' },
    { value: 'Respite Care', label: 'Respite Care' },
    { value: 'Post-Hospital Recovery', label: 'Post-Hospital Recovery' },
    { value: 'Live-in Care', label: 'Live-in Care' },
    { value: 'Other', label: 'Other' },
  ];

  const timeSlots = [
    { value: 'Morning (8:00 AM - 12:00 PM)', label: 'Morning (8:00 AM - 12:00 PM)' },
    { value: 'Afternoon (12:00 PM - 4:00 PM)', label: 'Afternoon (12:00 PM - 4:00 PM)' },
    { value: 'Evening (4:00 PM - 8:00 PM)', label: 'Evening (4:00 PM - 8:00 PM)' },
    { value: 'Flexible', label: 'Flexible' },
  ];

  const onSubmit = async (data: AppointmentInput) => {
    setIsSubmitting(true);
    setAlert(null);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setAlert({
          type: 'success',
          message: 'Appointment request submitted successfully! We will contact you within 24-48 hours.',
        });
        reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setAlert({
          type: 'error',
          message: result.error || 'Failed to submit appointment request. Please try again.',
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book an Appointment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take the first step toward compassionate care. Schedule a consultation with our team.
          </p>
        </motion.div>

        {/* Alert */}
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary-600" />
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  {...register('fullName')}
                  error={errors.fullName?.message}
                  placeholder="John Doe"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="john@example.com"
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  {...register('phone')}
                  error={errors.phone?.message}
                  placeholder="(555) 123-4567"
                  required
                />
                <Select
                  label="Service Type"
                  {...register('serviceType')}
                  error={errors.serviceType?.message}
                  options={serviceTypes}
                  required
                />
              </div>
            </div>

            {/* Appointment Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary-600" />
                Appointment Preferences
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Preferred Date"
                  type="date"
                  {...register('preferredDate')}
                  error={errors.preferredDate?.message}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <Select
                  label="Preferred Time"
                  {...register('preferredTime')}
                  error={errors.preferredTime?.message}
                  options={timeSlots}
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <Textarea
                label="Tell us about your care needs"
                {...register('message')}
                error={errors.message?.message}
                placeholder="Please describe your care needs, any specific requirements, or questions you may have..."
                rows={6}
                required
              />
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Privacy Notice:</strong> Your information is confidential and will only be used to process your appointment request. We respect your privacy and comply with all healthcare privacy regulations.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                className="w-full md:w-auto min-w-[300px]"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Appointment Request'}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-primary-600 font-bold text-lg mb-2">Response Time</div>
              <p className="text-gray-600">We'll contact you within 24-48 hours</p>
            </div>
            <div className="card">
              <div className="text-primary-600 font-bold text-lg mb-2">Free Consultation</div>
              <p className="text-gray-600">No obligation, just honest advice</p>
            </div>
            <div className="card">
              <div className="text-primary-600 font-bold text-lg mb-2">Questions?</div>
              <p className="text-gray-600">Call us at (555) 123-4567</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
