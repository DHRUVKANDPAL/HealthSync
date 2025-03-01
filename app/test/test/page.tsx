"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Clock, Users, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QueueItem {
  id: string;
  deptId: string;
  doctorId: string;
  patientId: string;
  to: Date;
  from: Date;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface PerHourQueue {
  [timeSlot: string]: QueueItem[];
}

export default function DoctorQueuePage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [perHourQueue, setPerHourQueue] = useState<PerHourQueue>({});
  const [doctorName, setDoctorName] = useState("Dr. Smith"); // Placeholder, replace with actual doctor data fetch
  const [currentDate] = useState(new Date());

  useEffect(() => {
    fetchQueueData();
  }, [id]);

  const fetchQueueData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/queueOfHospital/cm6mi9rjv0001147lhoxf7scx/cm6w1z82z001pvo7ijxowb0ag`
      );
      const data = await response.json();

      if (data.status === 200) {
        setQueue(data.queue);
        setPerHourQueue(data.perHourQueue);
      }
    } catch (error) {
      console.error("Error fetching queue data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get maximum patient count for color scaling
  const getMaxPatientCount = () => {
    const counts = Object.values(perHourQueue).map(
      (patients) => patients.length
    );
    return Math.max(...counts, 1); // Ensure we don't divide by zero
  };

  // Calculate color intensity based on patient count
  const getColorIntensity = (patientCount: number, maxCount: number) => {
    const intensity = Math.max(0.2, patientCount / maxCount); // Minimum intensity of 0.2
    return intensity;
  };

  // Format time for display
  const formatTime = (date: Date | null) => {
    if (!date) return "--:--";
    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            OPD Queue
          </h1>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(currentDate)}</span>
          </div>
        </motion.div>
        <div className="flex items-center space-x-4">
          <Button
            size="sm"
            variant="outline"
            onClick={fetchQueueData}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <DarkModeToggle />
        </div>
      </div>

      <Card className="border border-gray-200 dark:border-gray-800">
        <CardHeader className="bg-gray-50 dark:bg-gray-900">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span>{doctorName}'s Patient Queue</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <Skeleton key={index} className="h-32 rounded-md" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {Object.keys(perHourQueue).length === 0 ? (
                <div className="col-span-full text-center p-8 text-gray-500 dark:text-gray-400">
                  No patients in queue for today.
                </div>
              ) : (
                Object.entries(perHourQueue).map(
                  ([timeSlot, patients], index) => {
                    const maxCount = getMaxPatientCount();
                    const intensity = getColorIntensity(
                      patients.length,
                      maxCount
                    );
                    const bgColorLight = `rgba(59, 130, 246, ${
                      intensity * 0.3
                    })`;
                    const bgColorDark = `rgba(96, 165, 250, ${
                      intensity * 0.3
                    })`;

                    return (
                      <motion.div
                        key={timeSlot}
                        variants={itemVariants}
                        className="relative overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg"
                        // style={{
                        //   backgroundColor: bgColorLight,
                        // }}
                        // className="relative overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg bg-blue-50 dark:bg-blue-900/30"
                        style={{
                          background: `linear-gradient(rgba(219, 234, 254, ${intensity}), rgba(191, 219, 254, ${
                            intensity * 0.7
                          }))`,
                          backgroundImage: `linear-gradient(rgba(219, 234, 254, ${intensity}), rgba(191, 219, 254, ${
                            intensity * 0.7
                          }))`,
                        }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          transition: { duration: 0.2 },
                        }}
                      >
                        <div className="dark:bg-blue-900/50 dark:text-blue-100 p-4 h-full">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center text-gray-900 dark:text-gray-100">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="font-medium">{timeSlot}</span>
                            </div>
                            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-100 font-semibold text-sm">
                              {patients.length}
                            </div>
                          </div>

                          <div className="space-y-1">
                            {patients
                              .slice(0, 3)
                              .map((patient, patientIndex) => (
                                <div
                                  key={patient.id}
                                  className="text-xs text-gray-700 dark:text-gray-300 truncate"
                                >
                                  • Patient #{patient.patientId.substring(0, 6)}
                                  ... {formatTime(patient.createdAt)}
                                </div>
                              ))}
                            {patients.length > 3 && (
                              <div className="text-xs text-gray-600 dark:text-gray-400 italic">
                                + {patients.length - 3} more patients
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  }
                )
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Card className="border border-gray-200 dark:border-gray-800">
        <CardHeader className="bg-gray-50 dark:bg-gray-900">
          <CardTitle className="text-gray-900 dark:text-gray-100">
            Patient Queue Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                  <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Patient ID
                  </th>
                  <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Arrival Time
                  </th>
                  <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    From
                  </th>
                  <th className="p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    To
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  [...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td className="p-3">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-16" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-16" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-16" />
                      </td>
                    </tr>
                  ))
                ) : queue.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      No patients in queue
                    </td>
                  </tr>
                ) : (
                  queue.map((patient, index) => (
                    <motion.tr
                      key={patient.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td className="p-3 text-sm text-gray-900 dark:text-gray-300">
                        {patient.patientId}
                      </td>
                      <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                        {patient.createdAt
                          ? new Date(patient.createdAt).toLocaleTimeString()
                          : "--:--"}
                      </td>
                      <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                        {patient.from
                          ? new Date(patient.from).toLocaleTimeString()
                          : "--:--"}
                      </td>
                      <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                        {patient.to
                          ? new Date(patient.to).toLocaleTimeString()
                          : "--:--"}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
