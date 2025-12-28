"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, FileText, ExternalLink, Phone, Mail, HelpCircle } from 'lucide-react';

export default function ResourcesPage() {
  const faqs = [
    {
      question: 'How do I get started with home care services?',
      answer: 'Simply schedule a free consultation where we\'ll discuss your needs, assess your situation, and create a personalized care plan.'
    },
    {
      question: 'Are your caregivers licensed and insured?',
      answer: 'Yes, all our caregivers are thoroughly screened, trained, licensed, and insured. We maintain the highest standards of professionalism.'
    },
    {
      question: 'Can I choose my caregiver?',
      answer: 'Absolutely! We carefully match clients with caregivers based on needs, preferences, and personality compatibility.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'We serve the entire metropolitan area and surrounding communities. Contact us to confirm service availability in your area.'
    },
    {
      question: 'Do you accept insurance or Medicaid?',
      answer: 'We work with various insurance providers and Medicaid programs. Contact our office to discuss your specific coverage.'
    },
    {
      question: 'What if I need to change or cancel services?',
      answer: 'We understand plans change. We offer flexible scheduling and can adjust services as your needs evolve.'
    },
  ];

  const externalResources = [
    {
      title: 'National Institute on Aging',
      description: 'Information on aging, health, and caregiving',
      url: 'https://www.nia.nih.gov'
    },
    {
      title: 'Eldercare Locator',
      description: 'Connect to local services for older adults',
      url: 'https://eldercare.acl.gov'
    },
    {
      title: 'Family Caregiver Alliance',
      description: 'Resources and support for family caregivers',
      url: 'https://www.caregiver.org'
    },
    {
      title: 'AAIDD',
      description: 'American Association on Intellectual and Developmental Disabilities',
      url: 'https://www.aaidd.org'
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Resources</h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Helpful information and resources for families and caregivers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Educational Resources</h2>
            <p className="text-xl text-gray-600">Knowledge to empower better care decisions</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: 'Choosing Home Care',
                description: 'A comprehensive guide to selecting the right home care services',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: FileText,
                title: 'Medication Safety',
                description: 'Tips for managing medications safely at home',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: FileText,
                title: 'Fall Prevention',
                description: 'Creating a safe home environment for seniors',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: FileText,
                title: 'Caregiver Wellness',
                description: 'Self-care strategies for family caregivers',
                color: 'from-orange-500 to-orange-600'
              },
              {
                icon: FileText,
                title: 'Understanding Dementia',
                description: 'Resources for families affected by dementia',
                color: 'from-red-500 to-red-600'
              },
              {
                icon: FileText,
                title: 'Rights & Advocacy',
                description: 'Know your rights and how to advocate effectively',
                color: 'from-pink-500 to-pink-600'
              },
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card group cursor-pointer"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <resource.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <span className="text-primary-600 font-semibold group-hover:underline">
                  Download PDF →
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-full mb-4">
              <HelpCircle className="w-7 h-7 text-primary-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <span className="text-primary-600 flex-shrink-0">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-gray-600 pl-7">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Community Resources</h2>
            <p className="text-xl text-gray-600">Helpful organizations and websites</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {externalResources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="card group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600">{resource.description}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-600 flex-shrink-0 transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl mb-8 text-primary-100">
              Our team is here to help. Reach out anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-primary-200">Call Us</div>
                  <a href="tel:5551234567" className="text-lg font-bold hover:text-primary-100">
                    (555) 123-4567
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-primary-200">Email Us</div>
                  <a href="mailto:info@transformationhomehealth.com" className="text-lg font-bold hover:text-primary-100">
                    info@transformationhomehealth.com
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
