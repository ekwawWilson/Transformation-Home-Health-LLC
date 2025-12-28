"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Users, Home, Shield, Clock, Award } from "lucide-react";
import HeroSlider from "@/components/ui/HeroSlider";
import PictureGallery from "@/components/ui/PictureGallery";

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Slider slides data
  const sliderSlides = [
    {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1920&h=1080&fit=crop",
      title: "Compassionate Senior Care",
      description:
        "Helping seniors live independently in the comfort of their own homes with dignity and respect.",
    },
    {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1920&h=1080&fit=crop",
      title: "Professional Caregivers",
      description:
        "Our trained and licensed professionals provide personalized care tailored to your needs.",
    },
    {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1920&h=1080&fit=crop",
      title: "Community Support Services",
      description:
        "Promoting inclusion and independence through community-based support programs.",
    },
    {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1920&h=1080&fit=crop",
      title: "Family-Centered Care",
      description:
        "We partner with families to deliver comprehensive, coordinated care that improves quality of life.",
    },
  ];

  // Gallery images data
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&h=800&fit=crop",
      alt: "Caregiver helping senior with daily activities",
      title: "Daily Living Support",
    },
    {
      src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=800&fit=crop",
      alt: "Home health nurse checking vitals",
      title: "Professional Health Monitoring",
    },
    {
      src: "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=800&h=800&fit=crop",
      alt: "Senior enjoying outdoor activities with caregiver",
      title: "Outdoor Activities & Companionship",
    },
    {
      src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=800&fit=crop",
      alt: "Caregiver and senior cooking together",
      title: "Meal Preparation & Nutrition",
    },
    {
      src: "https://images.unsplash.com/photo-1581579191396-7b1e49deb129?w=800&h=800&fit=crop",
      alt: "Physical therapy session at home",
      title: "Rehabilitation Services",
    },
    {
      src: "https://images.unsplash.com/photo-1522037576655-7a93ce0f4d10?w=800&h=800&fit=crop",
      alt: "Family meeting with care coordinator",
      title: "Family Consultation",
    },
    {
      src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=800&fit=crop",
      alt: "Senior participating in group activities",
      title: "Community Engagement",
    },
    {
      src: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=800&h=800&fit=crop",
      alt: "Caregiver reading with senior",
      title: "Cognitive Stimulation",
    },
    {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop",
      alt: "Home safety assessment",
      title: "Home Safety & Modifications",
    },
    {
      src: "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=800&h=800&fit=crop",
      alt: "Senior enjoying garden time",
      title: "Outdoor Therapy",
    },
    {
      src: "https://images.unsplash.com/photo-1581579186896-ab46a0bf1ff8?w=800&h=800&fit=crop",
      alt: "Medication management support",
      title: "Medication Management",
    },
    {
      src: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=800&h=800&fit=crop",
      alt: "Respite care for family caregivers",
      title: "Respite Care Services",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              A House of Care
              <br />
              <span className="text-secondary-300">
                A Home of Transformation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto"
            >
              Providing compassionate home care and services that promote
              dignity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-2 justify-center mb-8 relative z-10"
            >
              <Link
                href="/appointments"
                className="inline-block bg-white text-primary-600 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-50 transform hover:scale-105 transition-all duration-200 shadow-xl cursor-pointer"
              >
                Book an Appointment
              </Link>
              <Link
                href="/services"
                className="inline-block bg-transparent border-2 border-white text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                Explore Our Services
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 -mb-1">
          <svg viewBox="0 0 1440 120" className="w-full h-auto block">
            <path
              fill="#ffffff"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Image/Video Slider */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See Our Care in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we support individuals and families in living their
              best lives
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <HeroSlider slides={sliderSlides} autoPlayInterval={6000} />
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, text: "Licensed & Trained Professionals" },
              { icon: Heart, text: "Personalized Care Plans" },
              { icon: Home, text: "Home & Community Support" },
              { icon: Users, text: "Family-Centered Approach" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <item.icon className="w-8 h-8 text-primary-600" />
                </div>
                <p className="text-gray-700 font-semibold">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* What We Do */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Care designed around individual needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Home Care & Daily Living Support",
                description:
                  "Assistance with personal care, meal preparation, medication reminders, and daily activities to help you maintain independence at home.",
                icon: Home,
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Developmental & Community Services",
                description:
                  "Residential support, community integration, and life skills coaching for individuals with developmental disabilities.",
                icon: Users,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "Companionship & Life Skills",
                description:
                  "Meaningful social interaction, mentorship, and support for building independence and community connections.",
                icon: Heart,
                gradient: "from-orange-500 to-red-500",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="card group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Who We Serve */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600">
              Dedicated support for diverse needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Seniors Aging in Place",
                description:
                  "Supporting older adults to live independently and comfortably in their own homes with dignity and respect.",
                image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=500&fit=crop",
              },
              {
                title: "Individuals with Developmental Disabilities",
                description:
                  "Comprehensive support services designed to promote independence, inclusion, and quality of life.",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop",
              },
              {
                title: "Families Seeking Support",
                description:
                  "Respite care, long-term assistance, and recovery support for families navigating caregiving challenges.",
                image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=500&fit=crop",
              },
            ].map((audience, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Image Section */}
                <div className="h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${audience.image})` }}
                  />
                </div>
                {/* Card Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary-600 mb-4">
                    {audience.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {audience.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl mb-8 text-primary-100"
          >
            Let us help you or your loved ones receive the compassionate care
            they deserve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/appointments"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-200"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Picture Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Care in Pictures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the difference compassionate, professional care makes in the
              lives of those we serve
            </p>
          </motion.div>

          <PictureGallery images={galleryImages} />
        </div>
      </section>
    </div>
  );
}
