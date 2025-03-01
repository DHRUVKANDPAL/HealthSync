import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building2,
  Clock,
  CreditCard,
  Edit,
  Settings,
  CalendarDays,
  Users,
  FileText,
  BellRing,
  Shield,
  ClipboardList,
  Calendar as CalendarIcon,
  MapPin,
  Star,
  MessageCircle,
  Heart,
  Stethoscope,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import DoctorImageEdit from "./DoctorImageEdit";

interface Department {
  deptId: string;
  dept: {
    name: string;
  };
}

interface Doctor {
  id: string;
  userId: string;
  name: string;
  imageUrl?: string;
  dob?: string;
  aadharNo?: string;
  licenceNo: string;
  contactno?: string;
  email?: string;
  createdAt?: string;
  departments: Department[];
}

export default function DoctorProfilePage({
  doctor,
  id,
}: {
  doctor: Doctor;
  id: string | string[];
}) {
  // Ensure we have data even if doctor fields are undefined
  const safeDoctor = {
    ...doctor,
    name: doctor?.name || "John Doe",
    licenceNo: doctor?.licenceNo || "MD-12345",
    email: doctor?.email || "doctor@medical.com",
    contactno: doctor?.contactno || "+1 (555) 123-4567",
    dob: doctor?.dob || "1980-01-01",
    departments: doctor?.departments || [
      { deptId: "1", dept: { name: "General Medicine" } },
      { deptId: "2", dept: { name: "Family Practice" } },
    ],
  };

  // Upcoming appointments data (dummy)
  const upcomingAppointments = [
    { id: 1, patient: "Sarah Johnson", time: "09:00 AM", type: "Follow-up" },
    { id: 2, patient: "Michael Chen", time: "10:30 AM", type: "Consultation" },
    { id: 3, patient: "Emily Williams", time: "01:15 PM", type: "New Patient" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800/90">
      {/* Header Section */}
      <div className="relative rounded-xl bg-gradient-to-r from-cyan-600/90 to-teal-500/90 p-6 overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10 opacity-10"></div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          <div className="flex flex-col items-center">
            <Avatar className="w-32 h-32 rounded-full ring-4 ring-white dark:ring-slate-700 shadow-md">
              <AvatarImage
                src={safeDoctor.imageUrl || "/placeholder-avatar.png"}
                alt={safeDoctor.name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-teal-500 to-blue-500 text-white">
                {safeDoctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <DoctorImageEdit id={id} />
          </div>

          <div className="flex-1 text-center md:text-left text-white">
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  Dr. {safeDoctor.name}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2 mb-3">
                  {safeDoctor.departments.map((dept) => (
                    <Badge
                      key={dept.deptId}
                      className="bg-white/20 hover:bg-white/30 text-white border-0"
                    >
                      {dept.dept.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start text-white/80 mb-1">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">
                    License: {safeDoctor.licenceNo}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start text-white/80">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm">4.9 (120 reviews)</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 justify-center md:justify-start">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button className="gap-2 bg-white text-cyan-700 hover:bg-white/90">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1 dark:bg-slate-800/80 shadow-sm border-0 dark:border-slate-700/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium dark:text-slate-200">
                Available Now
              </span>
            </div>
            <Switch />
          </CardContent>
        </Card>

        <Card className="md:col-span-3 dark:bg-slate-800/80 shadow-sm border-0 dark:border-slate-700/50">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  icon: CalendarDays,
                  label: "Schedule",
                  color: "text-teal-600 dark:text-teal-400",
                  count: "8",
                },
                {
                  icon: Users,
                  label: "Patients",
                  color: "text-blue-600 dark:text-blue-400",
                  count: "253",
                },
                {
                  icon: MessageCircle,
                  label: "Messages",
                  color: "text-indigo-600 dark:text-indigo-400",
                  count: "12",
                },
                {
                  icon: BellRing,
                  label: "Alerts",
                  color: "text-amber-600 dark:text-amber-400",
                  count: "3",
                },
              ].map((action, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="h-full flex flex-col items-center justify-center gap-1 hover:bg-gray-100 dark:hover:bg-slate-700/50"
                >
                  <div className="relative">
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                    <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
                      {action.count}
                    </span>
                  </div>
                  <span className="text-xs font-medium dark:text-slate-300">
                    {action.label}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-0 shadow-sm dark:bg-slate-800/80 dark:border-slate-700/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 p-4 pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-4 mt-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: safeDoctor.email,
                    color: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    icon: Phone,
                    label: "Contact",
                    value: safeDoctor.contactno,
                    color: "text-green-600 dark:text-green-400",
                  },
                  {
                    icon: Calendar,
                    label: "Date of Birth",
                    value: safeDoctor.dob
                      ? new Date(safeDoctor.dob).toLocaleDateString()
                      : "N/A",
                    color: "text-amber-600 dark:text-amber-400",
                  },
                  {
                    icon: Stethoscope,
                    label: "Specialization",
                    value: safeDoctor.departments
                      .map((d) => d.dept.name)
                      .join(", "),
                    color: "text-purple-600 dark:text-purple-400",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-slate-700/40 dark:hover:bg-slate-700/60 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-600 flex items-center justify-center ${item.color}`}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        {item.label}
                      </p>
                      <p className="font-medium text-sm dark:text-slate-200">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm dark:bg-slate-800/80 dark:border-slate-700/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 p-4 pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                Working Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {[
                  { day: "Monday", hours: "9:00 AM - 5:00 PM" },
                  { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
                  { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
                  { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
                  { day: "Friday", hours: "9:00 AM - 3:00 PM" },
                  { day: "Saturday", hours: "10:00 AM - 1:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((schedule, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="font-medium dark:text-slate-300">
                      {schedule.day}
                    </span>
                    <span
                      className={`${
                        schedule.hours === "Closed"
                          ? "text-red-500"
                          : "dark:text-slate-400"
                      }`}
                    >
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: CalendarDays,
                label: "Appointments",
                color: "from-teal-400 to-teal-500",
                textColor: "text-teal-800",
              },
              {
                icon: Heart,
                label: "Patient Care",
                color: "from-red-400 to-red-500",
                textColor: "text-red-800",
              },
              {
                icon: FileText,
                label: "Records",
                color: "from-blue-400 to-blue-500",
                textColor: "text-blue-800",
              },
              {
                icon: MapPin,
                label: "Locations",
                color: "from-purple-400 to-purple-500",
                textColor: "text-purple-800",
              },
            ].map((action, i) => (
              <Button
                key={i}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 border-0 bg-white hover:bg-gray-50 shadow-sm dark:bg-slate-800/80 dark:hover:bg-slate-700/80"
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center text-white`}
                >
                  <action.icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-sm font-medium ${action.textColor} dark:text-slate-200`}
                >
                  {action.label}
                </span>
              </Button>
            ))}
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="w-full bg-white dark:bg-slate-800/80 p-1 border border-gray-100 dark:border-slate-700/50 rounded-lg">
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:bg-cyan-50 data-[state=active]:text-cyan-700 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-100 rounded-md"
              >
                Today's Schedule
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-cyan-50 data-[state=active]:text-cyan-700 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-100 rounded-md"
              >
                Personal Details
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:bg-cyan-50 data-[state=active]:text-cyan-700 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-100 rounded-md"
              >
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schedule">
              <Card className="mt-4 border-0 shadow-sm dark:bg-slate-800/80 dark:border-slate-700/50">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    Today's Appointments
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-cyan-50 border-cyan-100 text-cyan-700 hover:bg-cyan-100 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-600"
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    View Calendar
                  </Button>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-4 bg-cyan-50 border-cyan-200 dark:bg-slate-700/40 dark:border-slate-600">
                    <ClipboardList className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <AlertTitle className="text-cyan-700 dark:text-cyan-400">
                      Daily Summary
                    </AlertTitle>
                    <AlertDescription className="text-cyan-700 dark:text-slate-300">
                      You have 8 appointments scheduled for today
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-3 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 dark:bg-slate-700/30 dark:border-slate-700 dark:hover:bg-slate-700/50 flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-slate-600 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium dark:text-slate-200">
                              {appointment.patient}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-slate-400">
                              {appointment.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-slate-700 dark:text-cyan-400 dark:border-slate-600"
                          >
                            {appointment.time}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card className="mt-4 border-0 shadow-sm dark:bg-slate-800/80 dark:border-slate-700/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    Extended Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: User,
                        label: "Full Name",
                        value: `Dr. ${safeDoctor.name}`,
                        color:
                          "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
                      },
                      {
                        icon: Calendar,
                        label: "Date of Birth",
                        value: safeDoctor.dob
                          ? new Date(safeDoctor.dob).toLocaleDateString()
                          : "N/A",
                        color:
                          "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                      },
                      {
                        icon: Phone,
                        label: "Contact",
                        value: safeDoctor.contactno,
                        color:
                          "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                      },
                      {
                        icon: Building2,
                        label: "Departments",
                        value: safeDoctor.departments
                          .map((d) => d.dept.name)
                          .join(", "),
                        color:
                          "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                      },
                      {
                        icon: Shield,
                        label: "License Number",
                        value: safeDoctor.licenceNo,
                        color:
                          "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                      },
                      {
                        icon: CreditCard,
                        label: "ID",
                        value:
                          safeDoctor.userId ||
                          "USR-" +
                            Math.random()
                              .toString(36)
                              .substring(2, 10)
                              .toUpperCase(),
                        color:
                          "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-slate-700/30 border border-gray-100 dark:border-slate-700 shadow-sm"
                      >
                        <div
                          className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}
                        >
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-slate-400">
                            {item.label}
                          </p>
                          <p className="font-medium dark:text-slate-200">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="mt-4 border-0 shadow-sm dark:bg-slate-800/80 dark:border-slate-700/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    Documents & Credentials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-4 bg-blue-50 border-blue-200 dark:bg-slate-700/40 dark:border-slate-600">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <AlertTitle className="text-blue-700 dark:text-blue-400">
                      Document Management
                    </AlertTitle>
                    <AlertDescription className="text-blue-700 dark:text-slate-300">
                      Keep your documents up to date for compliance
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        name: "Medical License",
                        status: "Verified",
                        date: "Valid until Dec 2025",
                      },
                      {
                        name: "Identity Proof",
                        status: "Verified",
                        date: "Uploaded on Jan 15, 2023",
                      },
                      {
                        name: "Degree Certificate",
                        status: "Verified",
                        date: "Uploaded on Mar 3, 2023",
                      },
                      {
                        name: "Specialization Certificate",
                        status: "Pending Review",
                        date: "Uploaded on Feb 10, 2024",
                      },
                    ].map((doc, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 dark:bg-slate-700/30 dark:border-slate-700 dark:hover:bg-slate-700/50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <span className="font-medium dark:text-slate-200">
                              {doc.name}
                            </span>
                          </div>
                          <Badge
                            className={
                              doc.status === "Verified"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            }
                          >
                            {doc.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-slate-400 ml-6">
                          {doc.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
