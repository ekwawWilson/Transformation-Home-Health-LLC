"use client";

import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import { useState } from 'react';

export default function TopHeader() {
  const [language, setLanguage] = useState('EN');

  const languages = [
    { code: 'EN', label: 'English' },
    { code: 'ES', label: 'Español' },
    { code: 'FR', label: 'Français' },
  ];

  return (
    <div className="bg-primary-700 text-white py-2 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          {/* Emergency Contact */}
          <div className="flex items-center gap-4">
            <a
              href="tel:5559876543"
              className="flex items-center gap-2 hover:text-primary-200 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold">24/7 Emergency: (555) 987-6543</span>
            </a>
            <span className="hidden md:inline text-primary-300">|</span>
            <a
              href="mailto:info@transformationhomehealth.com"
              className="hidden md:flex items-center gap-2 hover:text-primary-200 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>info@transformationhomehealth.com</span>
            </a>
          </div>

          {/* Social Icons and Language */}
          <div className="flex items-center gap-4">
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-200 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-200 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <span className="text-primary-300">|</span>

            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 hover:text-primary-200 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="font-medium">{language}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`block w-full text-left px-4 py-2 hover:bg-primary-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                      language === lang.code ? 'bg-primary-50 text-primary-700 font-semibold' : ''
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
