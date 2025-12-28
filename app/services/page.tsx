"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Heart, Stethoscope, Users, Calendar, Lightbulb, Shield, HandHeart } from 'lucide-react';

export default function ServicesPage() {
  const homeServices = [
    { icon: Heart, title: 'Personal Care', description: 'Bathing, grooming, dressing assistance' },
    { icon: Stethoscope, title: 'Medication Reminders', description: 'Ensuring medications are taken properly' },
    { icon: Home, title: 'Meal Preparation', description: 'Nutritious meals tailored to dietary needs' },
    { icon: HandHeart, title: 'Light Housekeeping', description: 'Maintaining a clean, safe environment' },
    { icon: Users, title: 'Companionship', description: 'Meaningful social interaction and support' },
    { icon: Shield, title: 'Respite Care', description: 'Temporary relief for family caregivers' },
  ];

  const skilledServices = [
    { title: 'Post-Hospital Recovery', description: 'Transitional care after hospital discharge' },
    { title: 'Fall Prevention', description: 'Assessment and safety modifications' },
    { title: 'Chronic Condition Support', description: 'Managing ongoing health conditions' },
    { title: 'Vital Signs Monitoring', description: 'Regular health status checks' },
  ];

  const developmentalServices = [
    { icon: Home, title: 'Residential Support', description: 'In-home assistance for daily living' },
    { icon: Users, title: 'Community Integration', description: 'Social inclusion and participation' },
    { icon: Lightbulb, title: 'Life Skills Coaching', description: 'Building independence and capabilities' },
    { icon: HandHeart, title: 'Mentorship Programs', description: 'Guidance and personal development' },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Comprehensive care solutions designed around your unique needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Home Care Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Home Care Services</h2>
            <p className="text-xl text-gray-600">Supporting independence and comfort at home</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 card bg-primary-50 border-2 border-primary-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">Live-In Care Available</h3>
                <p className="text-primary-800">
                  For those who need continuous support, we offer 24/7 live-in care services with trained professionals.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skilled & Wellness */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skilled & Wellness Support</h2>
            <p className="text-xl text-gray-600">Professional healthcare services for optimal wellbeing</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {skilledServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developmental Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Developmental & Community Support</h2>
            <p className="text-xl text-gray-600">Empowering independence and community inclusion</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Care Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Care Works</h2>
            <p className="text-xl text-gray-600">Our simple, personalized process</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Consultation', description: 'We discuss your needs and preferences' },
              { step: '2', title: 'Care Plan', description: 'A customized plan is created for you' },
              { step: '3', title: 'Matching', description: 'We pair you with the perfect caregiver' },
              { step: '4', title: 'Ongoing Support', description: 'Regular check-ins and adjustments' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-primary-100">
              Schedule a free consultation to discuss your care needs
            </p>
            <Link
              href="/appointments"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
