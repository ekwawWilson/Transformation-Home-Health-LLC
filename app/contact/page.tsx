"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/validations/schemas';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    setAlert(null);

    try {
      const response = await fetch('/api/contact', {
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
          message: 'Message sent successfully! We will respond to your inquiry within 24 hours.',
        });
        reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setAlert({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.',
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Mail className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We&apos;re here to help. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Phone</div>
                    <div className="space-y-1">
                      <div>
                        <span className="text-sm text-gray-500">Office: </span>
                        <a href="tel:+17206681225" className="text-gray-600 hover:text-primary-600 transition-colors">
                          +1 (720) 668-1225
                        </a>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Mobile: </span>
                        <a href="tel:+12023903257" className="text-gray-600 hover:text-primary-600 transition-colors">
                          +1 (202) 390-3257
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Email</div>
                    <a href="mailto:info@transformationhomehealth.com" className="text-gray-600 hover:text-primary-600 transition-colors break-all">
                      info@transformationhomehealth.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Address</div>
                    <p className="text-gray-600">
                      123 Healthcare Drive<br />
                      Suite 100<br />
                      Your City, ST 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Office Hours</div>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 3:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
              <h3 className="font-bold text-primary-900 mb-2">24/7 Emergency Support</h3>
              <p className="text-primary-800 text-sm mb-3">
                For urgent care needs, our on-call team is available around the clock.
              </p>
              <a
                href="tel:5559876543"
                className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                (555) 987-6543
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            {alert && (
              <div className="mb-6">
                <Alert
                  type={alert.type}
                  message={alert.message}
                  onClose={() => setAlert(null)}
                />
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Your Name"
                    {...register('name')}
                    error={errors.name?.message}
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
                </div>

                <Textarea
                  label="Your Message"
                  {...register('message')}
                  error={errors.message?.message}
                  placeholder="Tell us how we can help you..."
                  rows={8}
                  required
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    We typically respond within 24 hours during business days. For urgent matters, please call us directly.
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full md:w-auto min-w-[200px]"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 card text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Serving Our Community</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Transformation Home Health LLC is proud to serve families throughout the region with compassionate,
            professional home care and community-based support services. We&apos;re committed to improving the quality
            of life for those we serve.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
