"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { careerApplicationSchema, type CareerApplicationInput } from '@/lib/validations/schemas';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { Briefcase, Upload, Award, Users } from 'lucide-react';

export default function CareersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CareerApplicationInput>({
    resolver: zodResolver(careerApplicationSchema),
  });

  const positions = [
    { value: 'Certified Nursing Assistant (CNA)', label: 'Certified Nursing Assistant (CNA)' },
    { value: 'Licensed Practical Nurse (LPN)', label: 'Licensed Practical Nurse (LPN)' },
    { value: 'Registered Nurse (RN)', label: 'Registered Nurse (RN)' },
    { value: 'Personal Care Assistant', label: 'Personal Care Assistant' },
    { value: 'Home Health Aide', label: 'Home Health Aide' },
    { value: 'Direct Support Professional', label: 'Direct Support Professional' },
    { value: 'Community Support Specialist', label: 'Community Support Specialist' },
    { value: 'Care Coordinator', label: 'Care Coordinator' },
    { value: 'Administrative Staff', label: 'Administrative Staff' },
    { value: 'Other', label: 'Other' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setAlert({
          type: 'error',
          message: 'Invalid file type. Please upload a PDF or DOC/DOCX file.',
        });
        e.target.value = '';
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setAlert({
          type: 'error',
          message: 'File size exceeds 10MB. Please upload a smaller file.',
        });
        e.target.value = '';
        return;
      }

      setSelectedFile(file);
      setAlert(null);
    }
  };

  const onSubmit = async (data: CareerApplicationInput) => {
    if (!selectedFile) {
      setAlert({
        type: 'error',
        message: 'Please upload your resume.',
      });
      return;
    }

    setIsSubmitting(true);
    setAlert(null);

    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('positionApplied', data.positionApplied);
      formData.append('message', data.message || '');
      formData.append('resume', selectedFile);

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setAlert({
          type: 'success',
          message: 'Application submitted successfully! We will review your application and contact you soon.',
        });
        reset();
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById('resume') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setAlert({
          type: 'error',
          message: result.error || 'Failed to submit application. Please try again.',
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
            <Briefcase className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make a difference in people's lives. Join our compassionate team of healthcare professionals.
          </p>
        </motion.div>

        {/* Why Join Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
              <Award className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Competitive Benefits</h3>
            <p className="text-gray-600">Comprehensive benefits package and competitive pay</p>
          </div>
          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Supportive Team</h3>
            <p className="text-gray-600">Work with dedicated professionals who care</p>
          </div>
          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
              <Briefcase className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Career Growth</h3>
            <p className="text-gray-600">Ongoing training and advancement opportunities</p>
          </div>
        </motion.div>

        {/* Alert */}
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </motion.div>
        )}

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Apply Now</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
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
                label="Position Applied For"
                {...register('positionApplied')}
                error={errors.positionApplied?.message}
                options={positions}
                required
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="label-text">
                Upload Resume
                <span className="text-red-600 ml-1">*</span>
              </label>
              <div className="mt-2">
                <label
                  htmlFor="resume"
                  className="flex items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors duration-200"
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <div className="text-sm text-gray-600">
                      {selectedFile ? (
                        <span className="font-semibold text-primary-600">
                          {selectedFile.name}
                        </span>
                      ) : (
                        <>
                          <span className="font-semibold text-primary-600">Click to upload</span> or drag and drop
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOC, or DOCX (max 10MB)
                    </p>
                  </div>
                  <input
                    id="resume"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <Textarea
                label="Tell us about yourself (Optional)"
                {...register('message')}
                error={errors.message?.message}
                placeholder="Share your experience, qualifications, and why you'd like to join our team..."
                rows={6}
              />
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Equal Opportunity Employer:</strong> We are committed to diversity and do not discriminate on the basis of race, color, religion, gender, sexual orientation, national origin, age, disability, or any other protected characteristic.
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
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-gray-600"
        >
          <p>Questions about the application process?</p>
          <p className="mt-2">
            Email us at <a href="mailto:careers@transformationhomehealth.com" className="text-primary-600 hover:text-primary-700 font-semibold">careers@transformationhomehealth.com</a>
            {' '}or call <a href="tel:5551234567" className="text-primary-600 hover:text-primary-700 font-semibold">(555) 123-4567</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
