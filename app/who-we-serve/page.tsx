"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Heart, Home, Shield, Smile, HandHeart } from 'lucide-react';

export default function WhoWeServePage() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Who We Serve</h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Compassionate care for individuals and families across all stages of life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Seniors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Seniors Aging in Place</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We support older adults who want to maintain their independence and live comfortably in their own homes.
                Our services help seniors age with dignity while receiving the assistance they need.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Daily Living Support</h3>
                    <p className="text-gray-600">Assistance with bathing, dressing, grooming, and mobility</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Medication Management</h3>
                    <p className="text-gray-600">Ensuring medications are taken safely and on schedule</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Companionship</h3>
                    <p className="text-gray-600">Meaningful social interaction to combat loneliness</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Safety & Comfort</h3>
                    <p className="text-gray-600">Creating a secure, comfortable home environment</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
                <Home className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Home Safety</h3>
                <p className="text-gray-600 text-sm">Fall prevention and home modifications</p>
              </div>
              <div className="card bg-gradient-to-br from-green-50 to-green-100">
                <Heart className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Health Monitoring</h3>
                <p className="text-gray-600 text-sm">Regular vital signs and wellness checks</p>
              </div>
              <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
                <Smile className="w-10 h-10 text-purple-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Social Activities</h3>
                <p className="text-gray-600 text-sm">Engagement and community participation</p>
              </div>
              <div className="card bg-gradient-to-br from-orange-50 to-orange-100">
                <Shield className="w-10 h-10 text-orange-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Respite Care</h3>
                <p className="text-gray-600 text-sm">Temporary relief for family caregivers</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Individuals with Disabilities */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="space-y-6">
                <div className="card group hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Residential Support</h3>
                      <p className="text-gray-600">Assistance with daily living activities in home settings</p>
                    </div>
                  </div>
                </div>

                <div className="card group hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Community Integration</h3>
                      <p className="text-gray-600">Support for social inclusion and community participation</p>
                    </div>
                  </div>
                </div>

                <div className="card group hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <HandHeart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Life Skills Development</h3>
                      <p className="text-gray-600">Building capabilities for greater independence</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <HandHeart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Individuals with Developmental Disabilities</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We provide comprehensive support services designed to promote independence, inclusion, and quality of life
                for individuals with developmental disabilities.
              </p>
              <div className="bg-secondary-50 border-2 border-secondary-200 rounded-xl p-6">
                <h3 className="font-bold text-secondary-900 mb-3">Our Approach</h3>
                <ul className="space-y-2 text-secondary-800">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-600 mt-1">✓</span>
                    <span>Person-centered planning and support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-600 mt-1">✓</span>
                    <span>Individualized goal setting and achievement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-600 mt-1">✓</span>
                    <span>Family partnership and collaboration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-600 mt-1">✓</span>
                    <span>Community inclusion and advocacy</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Families & Caregivers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Families & Caregivers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Supporting families through every stage of the caregiving journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Respite Care',
                description: 'Temporary relief services so family caregivers can rest and recharge',
                icon: Shield
              },
              {
                title: 'Recovery Support',
                description: 'Post-hospital care and rehabilitation assistance for loved ones',
                icon: Heart
              },
              {
                title: 'Long-Term Assistance',
                description: 'Ongoing support for families managing chronic conditions',
                icon: HandHeart
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Let Us Support You
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Whatever your care needs, we're here to help. Schedule a consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/appointments"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/services"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-200"
              >
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
