"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  ChevronRight,
  Filter,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Import patient data if available, otherwise use sample data
// import { PatientData } from "@/components/SamplePatientData";

// Sample appointment data
const sampleAppointments = [
  {
    id: "apt-001",
    doctorName: "Dr. Emily Chen",
    specialty: "Cardiology",
    date: "March 15, 2025",
    time: "10:30 AM",
    duration: "45 min",
    location: "Memorial Medical Center",
    address: "123 Health Ave, Suite 300",
    type: "In-person",
    status: "Upcoming",
  },
  {
    id: "apt-002",
    doctorName: "Dr. James Wilson",
    specialty: "Dermatology",
    date: "March 8, 2025",
    time: "2:15 PM",
    duration: "30 min",
    location: "Telehealth",
    address: "",
    type: "Virtual",
    status: "Upcoming",
  },
  {
    id: "apt-003",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Primary Care",
    date: "February 20, 2025",
    time: "9:00 AM",
    duration: "60 min",
    location: "City Health Clinic",
    address: "456 Medical Parkway",
    type: "In-person",
    status: "Completed",
  },
  {
    id: "apt-004",
    doctorName: "Dr. David Park",
    specialty: "Neurology",
    date: "January 5, 2025",
    time: "11:45 AM",
    duration: "60 min",
    location: "Neuroscience Center",
    address: "789 Brain Blvd, Floor 5",
    type: "In-person",
    status: "Completed",
  },
  {
    id: "apt-005",
    doctorName: "Dr. Michael Brown",
    specialty: "Orthopedics",
    date: "March 22, 2025",
    time: "3:30 PM",
    duration: "45 min",
    location: "Sports Medicine Clinic",
    address: "321 Joint Street",
    type: "In-person",
    status: "Upcoming",
  },
];

const AppointmentList = () => {
  // Use PatientData if available, otherwise use sample data
  // const appointments = PatientData?.appointments || sampleAppointments;
  const appointments = sampleAppointments;

  const [filter, setFilter] = useState("all"); // all, upcoming, completed

  // Function to filter appointments
  const getFilteredAppointments = () => {
    if (filter === "upcoming") {
      return appointments.filter((app) => app.status === "Upcoming");
    } else if (filter === "completed") {
      return appointments.filter((app) => app.status === "Completed");
    }
    return appointments;
  };

  // Function to get appointment type icon
  const getAppointmentTypeIcon = (type:any) => {
    if (type === "Virtual") {
      return <Video size={18} className="text-indigo-500" />;
    } else {
      return <MapPin size={18} className="text-emerald-500" />;
    }
  };

  // Function to get status badge styles
  const getStatusBadge = (status:any) => {
    if (status === "Upcoming") {
      return (
        <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
          <Calendar className="w-3 h-3 mr-1" />
          Upcoming
        </span>
      );
    } else if (status === "Completed") {
      return (
        <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </span>
      );
    } else {
      return (
        <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300">
          <AlertCircle className="w-3 h-3 mr-1" />
          {status}
        </span>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 min-h-[calc(100vh-200px)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 md:mb-0">
          Appointments
        </h2>

        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              filter === "all"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white dark:bg-slate-700 text-gray-700 dark:text-white border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-t border-b ${
              filter === "upcoming"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white dark:bg-slate-700 text-gray-700 dark:text-white border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600"
            }`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
              filter === "completed"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white dark:bg-slate-700 text-gray-700 dark:text-white border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {getFilteredAppointments().length > 0 ? (
          getFilteredAppointments().map((apt) => (
            <div
              key={apt.id}
              className="flex flex-col md:flex-row md:items-center bg-slate-50 dark:bg-slate-700 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
            >
              <div className="flex-grow mb-4 md:mb-0 md:mr-6">
                <div className="flex items-start md:items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      {apt.doctorName}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {apt.specialty}
                    </p>
                  </div>

                  <div className="hidden md:block">
                    {getStatusBadge(apt.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4 mt-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                    {apt.date}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                    {apt.time} ({apt.duration})
                  </div>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 col-span-1 md:col-span-2">
                    {getAppointmentTypeIcon(apt.type)}
                    <span className="ml-2">
                      {apt.type === "Virtual"
                        ? "Telehealth Appointment"
                        : apt.location +
                          (apt.address ? ` • ${apt.address}` : "")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end md:space-x-3">
                <div className="md:hidden">{getStatusBadge(apt.status)}</div>

                <div className="flex space-x-2">
                  {apt.status === "Upcoming" && (
                    <>
                      <button className="px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
                        Reschedule
                      </button>

                      {apt.type === "Virtual" && (
                        <button className="px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-150">
                          Join
                        </button>
                      )}
                    </>
                  )}

                  <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No {filter !== "all" ? filter : ""} appointments found.
            </p>
          </div>
        )}
      </div>

      {getFilteredAppointments().length > 0 && (
        <div className="mt-6 flex justify-center">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150">
            View All Appointments
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
