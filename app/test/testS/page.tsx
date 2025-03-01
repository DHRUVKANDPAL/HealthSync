"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  RefreshCw,
  Filter,
  Clock,
  Calendar,
  User,
  Hospital,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

// Define the Queue item type based on your schema
interface QueueItem {
  queueId: string;
  departmentId: string;
  doctorId: string;
  patientId: string;
  from: string; // time
  to: string; // time
  createdAt: string;
  updatedAt: string;
}

// Interface for department and doctor data
interface Department {
  id: string;
  name: string;
}

interface Doctor {
  id: string;
  name: string;
  departmentId: string;
  specialty: string;
}

// Generate time slots from 8 AM to 8 PM
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 8; i < 20; i++) {
    const hour = i > 12 ? i - 12 : i;
    const ampm = i >= 12 ? "PM" : "AM";
    slots.push(`${hour}:00 ${ampm}`);
    slots.push(`${hour}:30 ${ampm}`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Mock data for demonstration
const mockDepartments: Department[] = [
  { id: "dept1", name: "General Medicine" },
  { id: "dept2", name: "Pediatrics" },
  { id: "dept3", name: "Orthopedics" },
];

const mockDoctors: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. Smith",
    departmentId: "dept1",
    specialty: "General Physician",
  },
  {
    id: "doc2",
    name: "Dr. Johnson",
    departmentId: "dept1",
    specialty: "Internal Medicine",
  },
  {
    id: "doc3",
    name: "Dr. Williams",
    departmentId: "dept2",
    specialty: "Pediatrician",
  },
  {
    id: "doc4",
    name: "Dr. Brown",
    departmentId: "dept3",
    specialty: "Orthopedic Surgeon",
  },
];

// Generate mock queue data
const generateMockQueueData = (): QueueItem[] => {
  const queueItems: QueueItem[] = [];

  // Generate random queue items
  for (let i = 0; i < 50; i++) {
    const doctorId =
      mockDoctors[Math.floor(Math.random() * mockDoctors.length)].id;
    const departmentId =
      mockDoctors.find((d) => d.id === doctorId)?.departmentId || "dept1";

    // Random time slot
    const slotIndex = Math.floor(Math.random() * timeSlots.length);
    const fromTime = timeSlots[slotIndex];
    const toTime =
      slotIndex < timeSlots.length - 1
        ? timeSlots[slotIndex + 1]
        : timeSlots[slotIndex];

    queueItems.push({
      queueId: `queue${i}`,
      departmentId,
      doctorId,
      patientId: `patient${Math.floor(Math.random() * 1000)}`,
      from: fromTime,
      to: toTime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return queueItems;
};

const OPDQueuePage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [queueData, setQueueData] = useState<QueueItem[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch queue data (mock implementation)
  useEffect(() => {
    setIsLoading(true);
    // Simulate API fetch delay
    setTimeout(() => {
      setQueueData(generateMockQueueData());
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter doctors based on selected department
  const filteredDoctors =
    selectedDepartment === "all"
      ? mockDoctors
      : mockDoctors.filter((doc) => doc.departmentId === selectedDepartment);

  // Filter queue data based on selections
  const filteredQueueData = queueData.filter((item) => {
    const departmentMatch =
      selectedDepartment === "all" || item.departmentId === selectedDepartment;
    const doctorMatch =
      selectedDoctor === "all" || item.doctorId === selectedDoctor;
    return departmentMatch && doctorMatch;
  });

  // Group queue items by time slot and doctor
  const queueByTimeSlot = timeSlots.map((slot) => {
    const doctors =
      selectedDoctor === "all"
        ? filteredDoctors
        : filteredDoctors.filter((d) => d.id === selectedDoctor);

    return {
      timeSlot: slot,
      doctorQueues: doctors.map((doctor) => {
        const patientsInSlot = filteredQueueData.filter(
          (item) => item.doctorId === doctor.id && item.from === slot
        );
        return {
          doctor,
          patientCount: patientsInSlot.length,
          patients: patientsInSlot,
        };
      }),
    };
  });

  // Calculate the maximum patient count to normalize color intensity
  const maxPatientCount = Math.max(
    ...queueByTimeSlot.flatMap((slot) =>
      slot.doctorQueues.map((dq) => dq.patientCount)
    ),
    1 // Prevent division by zero
  );

  // Get color intensity based on patient count
  const getColorIntensity = (count: number) => {
    const normalizedCount = count / maxPatientCount;
    return `rgba(59, 130, 246, ${0.1 + normalizedCount * 0.9})`;
  };

  // Get dark mode color intensity
  const getDarkColorIntensity = (count: number) => {
    const normalizedCount = count / maxPatientCount;
    return `rgba(96, 165, 250, ${0.1 + normalizedCount * 0.9})`;
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setQueueData(generateMockQueueData());
      setIsLoading(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-6xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Hospital className="mr-2" /> OPD Queue Management
        </h1>
        <Button
          variant="outline"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Queue Filters</CardTitle>
          <CardDescription>
            Filter the queue by department and doctor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select
                value={selectedDepartment}
                onValueChange={(value) => {
                  setSelectedDepartment(value);
                  setSelectedDoctor("all");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {mockDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Doctor</label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  {filteredDoctors.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end space-x-2">
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="flex items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>

              <Tabs
                defaultValue="grid"
                className="w-40"
                onValueChange={(value) => setView(value as "grid" | "list")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center h-64"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <RefreshCw className="w-8 h-8 text-blue-500" />
          </motion.div>
          <p className="ml-2">Loading queue data...</p>
        </motion.div>
      ) : view === "grid" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" /> Time Slot Queue
            </CardTitle>
            <CardDescription>
              Darker blue indicates more patients in the queue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {queueByTimeSlot.map(
                (slot) =>
                  slot.doctorQueues.some((dq) => dq.patientCount > 0) && (
                    <motion.div
                      key={slot.timeSlot}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {slot.timeSlot}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid gap-2">
                            {slot.doctorQueues
                              .filter((dq) => dq.patientCount > 0)
                              .map((doctorQueue) => (
                                <motion.div
                                  key={doctorQueue.doctor.id}
                                  whileHover={{ scale: 1.02 }}
                                  style={{
                                    backgroundColor: getColorIntensity(
                                      doctorQueue.patientCount
                                    ),
                                  }}
                                  className="p-2 rounded-md dark:bg-opacity-90 transition-all"
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div
                                    className="flex justify-between items-center"
                                    style={{
                                      color:
                                        doctorQueue.patientCount >
                                        maxPatientCount * 0.7
                                          ? "white"
                                          : "inherit",
                                    }}
                                  >
                                    <div className="font-medium">
                                      {doctorQueue.doctor.name}
                                    </div>
                                    <Badge
                                      variant={
                                        doctorQueue.patientCount > 5
                                          ? "destructive"
                                          : doctorQueue.patientCount > 2
                                          ? "secondary"
                                          : "outline"
                                      }
                                    >
                                      <Users className="h-3 w-3 mr-1" />
                                      {doctorQueue.patientCount}
                                    </Badge>
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {doctorQueue.doctor.specialty}
                                  </div>
                                </motion.div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2" /> Patient Queue List
            </CardTitle>
            <CardDescription>
              Detailed view of all patients in queue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeSlots.map((slot) => {
                const patientsInSlot = filteredQueueData.filter(
                  (item) => item.from === slot
                );
                if (patientsInSlot.length === 0) return null;

                return (
                  <motion.div
                    key={slot}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Clock className="mr-2 h-4 w-4" /> {slot} (
                      {patientsInSlot.length} patients)
                    </h3>
                    <div className="grid gap-2">
                      {patientsInSlot.map((item) => {
                        const doctor = mockDoctors.find(
                          (d) => d.id === item.doctorId
                        );
                        const department = mockDepartments.find(
                          (d) => d.id === item.departmentId
                        );

                        return (
                          <motion.div
                            key={item.queueId}
                            whileHover={{ scale: 1.01 }}
                            className="border rounded-md p-3 bg-white dark:bg-gray-800"
                          >
                            <div className="flex flex-col md:flex-row md:justify-between">
                              <div>
                                <div className="font-medium">
                                  Patient ID: {item.patientId}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {doctor?.name} • {department?.name}
                                </div>
                              </div>
                              <div className="flex items-center mt-2 md:mt-0">
                                <Badge variant="outline" className="mr-2">
                                  {item.from} - {item.to}
                                </Badge>
                                <Badge variant="secondary">
                                  Queue #{item.queueId.replace("queue", "")}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Total patients in queue: {filteredQueueData.length}
            </div>
            <div className="flex space-x-2">
              <Badge variant="outline" className="flex items-center">
                <Filter className="h-3 w-3 mr-1" />
                Department:{" "}
                {selectedDepartment === "all"
                  ? "All"
                  : mockDepartments.find((d) => d.id === selectedDepartment)
                      ?.name}
              </Badge>
              <Badge variant="outline" className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                Doctor:{" "}
                {selectedDoctor === "all"
                  ? "All"
                  : mockDoctors.find((d) => d.id === selectedDoctor)?.name}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OPDQueuePage;
