"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, MessageSquare, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface OverviewStats {
  appointments: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
  };
  careers: {
    total: number;
    pending: number;
    reviewing: number;
    shortlisted: number;
  };
  messages: {
    total: number;
    unread: number;
    replied: number;
  };
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = useCallback(async (token: string) => {
    try {
      const response = await fetch('/api/admin/overview', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }

      const data = await response.json();

      // Transform API response to match our interface
      const transformedStats: OverviewStats = {
        appointments: {
          total: data.stats?.appointments?.total || 0,
          pending: data.stats?.appointments?.pending || 0,
          confirmed: data.stats?.appointments?.confirmed || 0,
          completed: data.stats?.appointments?.completed || 0,
        },
        careers: {
          total: data.stats?.applications?.total || 0,
          pending: data.stats?.applications?.pending || 0,
          reviewing: data.stats?.applications?.reviewing || 0,
          shortlisted: data.stats?.applications?.shortlisted || 0,
        },
        messages: {
          total: data.stats?.messages?.total || 0,
          unread: data.stats?.messages?.unread || 0,
          replied: data.stats?.messages?.replied || 0,
        },
      };

      setStats(transformedStats);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchStats(token);
  }, [router, fetchStats]);

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Appointments Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats?.appointments.total || 0}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Appointments</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending:</span>
                  <span className="font-semibold text-orange-600">{stats?.appointments.pending || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confirmed:</span>
                  <span className="font-semibold text-blue-600">{stats?.appointments.confirmed || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-semibold text-green-600">{stats?.appointments.completed || 0}</span>
                </div>
              </div>
            </motion.div>

            {/* Career Applications Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats?.careers.total || 0}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Applications</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending:</span>
                  <span className="font-semibold text-orange-600">{stats?.careers.pending || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviewing:</span>
                  <span className="font-semibold text-blue-600">{stats?.careers.reviewing || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shortlisted:</span>
                  <span className="font-semibold text-green-600">{stats?.careers.shortlisted || 0}</span>
                </div>
              </div>
            </motion.div>

            {/* Messages Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats?.messages.total || 0}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Messages</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Unread:</span>
                  <span className="font-semibold text-orange-600">{stats?.messages.unread || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Replied:</span>
                  <span className="font-semibold text-green-600">{stats?.messages.replied || 0}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/admin/appointments"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
              >
                <Calendar className="w-6 h-6 text-primary-600" />
                <div>
                  <div className="font-semibold text-gray-900">Manage Appointments</div>
                  <div className="text-sm text-gray-600">View and update appointments</div>
                </div>
              </a>

              <a
                href="/admin/careers"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
              >
                <Briefcase className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-semibold text-gray-900">Review Applications</div>
                  <div className="text-sm text-gray-600">Process job applications</div>
                </div>
              </a>

              <a
                href="/admin/messages"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200"
              >
                <MessageSquare className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold text-gray-900">Reply to Messages</div>
                  <div className="text-sm text-gray-600">Respond to inquiries</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
