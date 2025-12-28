"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Phone, Mail, Clock, CheckCircle, XCircle, Send } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface Appointment {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: string;
  adminReply: string | null;
  createdAt: string;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [replyText, setReplyText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchAppointments(token);
  }, [router]);

  const fetchAppointments = async (token: string) => {
    try {
      const response = await fetch('/api/admin/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch appointments');

      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchAppointments(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendReply = async (id: number) => {
    const token = localStorage.getItem('adminToken');
    if (!token || !replyText.trim()) return;

    try {
      const response = await fetch(`/api/admin/appointments/${id}/reply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: replyText }),
      });

      if (response.ok) {
        setReplyText('');
        setSelectedAppointment(null);
        fetchAppointments(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAppointments = statusFilter === 'ALL'
    ? appointments
    : appointments.filter(apt => apt.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading appointments...</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
            <p className="text-gray-600">Manage appointment requests and bookings</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex gap-2">
              {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No appointments found</p>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{appointment.fullName}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{appointment.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{appointment.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{new Date(appointment.preferredDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{appointment.preferredTime}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Service Type:</p>
                    <p className="text-gray-600">{appointment.serviceType}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Message:</p>
                    <p className="text-gray-600">{appointment.message}</p>
                  </div>

                  {appointment.adminReply && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Admin Reply:</p>
                      <p className="text-blue-800">{appointment.adminReply}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateStatus(appointment.id, 'CONFIRMED')}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(appointment.id, 'COMPLETED')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Complete
                    </button>
                    <button
                      onClick={() => updateStatus(appointment.id, 'CANCELLED')}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setReplyText(appointment.adminReply || '');
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Reply
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Reply to {selectedAppointment.fullName}
            </h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32"
              placeholder="Type your reply message..."
            />
            <div className="flex gap-2">
              <button
                onClick={() => sendReply(selectedAppointment.id)}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Send Reply
              </button>
              <button
                onClick={() => {
                  setSelectedAppointment(null);
                  setReplyText('');
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
