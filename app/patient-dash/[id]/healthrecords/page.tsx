"use client";

import React, { useState } from "react";
import {
  FileText,
  Calendar,
  User,
  Pill,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
  Clock,
} from "lucide-react";

// Sample timeline data structure
const sampleTimelineData = [
  {
    id: "visit-001",
    date: "February 15, 2025",
    type: "Visit",
    doctor: "Dr. Sarah Johnson",
    specialty: "Primary Care",
    location: "Community Health Center",
    diagnosis: "Annual Physical Examination",
    notes:
      "Patient in good health. Blood pressure slightly elevated at 130/85. Recommended dietary changes and follow-up in 3 months.",
    prescriptions: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        instructions: "Once daily",
        duration: "3 months",
      },
    ],
    attachments: [
      {
        id: "att-001",
        name: "Blood Test Results",
        type: "PDF",
        size: "1.2 MB",
      },
    ],
  },
  {
    id: "visit-002",
    date: "January 5, 2025",
    type: "Specialist",
    doctor: "Dr. Michael Chen",
    specialty: "Cardiology",
    location: "Heart Institute",
    diagnosis: "Mild Hypertension",
    notes:
      "EKG shows normal sinus rhythm. Echo reveals mild left ventricular hypertrophy. Recommended continued medication and lifestyle modifications.",
    prescriptions: [],
    attachments: [
      { id: "att-002", name: "EKG Report", type: "PDF", size: "0.8 MB" },
      { id: "att-003", name: "Echocardiogram", type: "DICOM", size: "15.5 MB" },
    ],
  },
  {
    id: "visit-003",
    date: "December 10, 2024",
    type: "Vaccine",
    doctor: "Nurse Practitioner Wilson",
    specialty: "Immunization",
    location: "Community Health Center",
    diagnosis: "Routine Vaccination",
    notes:
      "Administered COVID-19 annual booster. Patient tolerated well with no immediate adverse effects.",
    prescriptions: [],
    attachments: [
      {
        id: "att-004",
        name: "Immunization Record",
        type: "PDF",
        size: "0.5 MB",
      },
    ],
  },
  {
    id: "visit-004",
    date: "November 20, 2024",
    type: "Visit",
    doctor: "Dr. Sarah Johnson",
    specialty: "Primary Care",
    location: "Community Health Center",
    diagnosis: "Upper Respiratory Infection",
    notes:
      "Patient presented with cough, congestion, and low-grade fever for 3 days. Physical exam shows clear lungs, mild pharyngeal erythema. Symptomatic treatment recommended.",
    prescriptions: [
      {
        name: "Acetaminophen",
        dosage: "500mg",
        instructions: "Every 6 hours as needed for fever",
        duration: "5 days",
      },
      {
        name: "Dextromethorphan",
        dosage: "30mg",
        instructions: "Every 6-8 hours as needed for cough",
        duration: "5 days",
      },
    ],
    attachments: [],
  },
  {
    id: "visit-005",
    date: "October 5, 2024",
    type: "Lab",
    doctor: "Dr. Emily Roberts",
    specialty: "Laboratory Medicine",
    location: "Citywide Labs",
    diagnosis: "Routine Bloodwork",
    notes:
      "Complete blood count, comprehensive metabolic panel, and lipid profile. All results within normal limits except slightly elevated LDL at 115 mg/dL.",
    prescriptions: [],
    attachments: [
      { id: "att-005", name: "Lab Results", type: "PDF", size: "2.3 MB" },
    ],
  },
];

const HealthRecordsTimeline = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Extract unique record types
  const recordTypes = [
    "All",
    ...Array.from(new Set(sampleTimelineData.map((record) => record.type))),
  ];

  // Filter records based on search and type
  const filteredRecords = sampleTimelineData.filter((record) => {
    const matchesSearch =
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "All" || record.type === selectedType;

    return matchesSearch && matchesType;
  });

  // Toggle expanded state for a timeline item
  const toggleExpand = (id: string) => {
    setExpandedItems((prevState) =>
      prevState.includes(id)
        ? prevState.filter((item) => item !== id)
        : [...prevState, id]
    );
  };

  // Get appropriate icon for record type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Visit":
        return <Stethoscope size={18} className="text-blue-500" />;
      case "Specialist":
        return <User size={18} className="text-purple-500" />;
      case "Vaccine":
        return <FileText size={18} className="text-green-500" />;
      case "Lab":
        return <FileText size={18} className="text-amber-500" />;
      default:
        return <FileText size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 min-h-[calc(100vh-200px)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 md:mb-0">
          Health Records Timeline
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search records..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
              size={18}
            />
          </div>

          <select
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {recordTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredRecords.length > 0 ? (
        <div className="relative">
          {/* Timeline axis */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900"></div>

          {/* Timeline items */}
          <div className="space-y-6 pl-16 relative">
            {filteredRecords.map((record) => {
              const isExpanded = expandedItems.includes(record.id);

              return (
                <div
                  key={record.id}
                  className="relative bg-slate-50 dark:bg-slate-700 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[-32px] top-6 w-6 h-6 rounded-full bg-blue-500 border-4 border-white dark:border-slate-800 flex items-center justify-center">
                    {getTypeIcon(record.type)}
                  </div>

                  {/* Timeline connector line */}
                  <div className="absolute left-[-29px] top-12 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900"></div>

                  {/* Header section */}
                  <div
                    className="flex justify-between items-start mb-2"
                    onClick={() => toggleExpand(record.id)}
                  >
                    <div>
                      <div className="flex items-center">
                        <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 mr-2">
                          {record.type}
                        </span>
                        <h3 className="font-semibold text-slate-800 dark:text-white">
                          {record.diagnosis}
                        </h3>
                      </div>

                      <div className="flex items-center mt-1">
                        <Calendar className="mr-1 w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mr-3">
                          {record.date}
                        </p>
                        <User className="mr-1 w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {record.doctor}
                        </p>
                      </div>
                    </div>

                    <button
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => toggleExpand(record.id)}
                    >
                      {isExpanded ? (
                        <ChevronUp
                          size={20}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      ) : (
                        <ChevronDown
                          size={20}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      )}
                    </button>
                  </div>

                  {/* Collapsed summary */}
                  {!isExpanded && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Stethoscope className="mr-1 w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <p>
                        {record.specialty} at {record.location}
                      </p>
                    </div>
                  )}

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Provider Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Doctor:</span>{" "}
                            {record.doctor}
                          </div>
                          <div>
                            <span className="font-medium">Specialty:</span>{" "}
                            {record.specialty}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span>{" "}
                            {record.location}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Clinical Notes
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-slate-800 p-3 rounded border border-gray-200 dark:border-slate-600">
                          {record.notes}
                        </p>
                      </div>

                      {record.prescriptions.length > 0 && (
                        <div>
                          <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Prescriptions
                          </h4>
                          <div className="space-y-2">
                            {record.prescriptions.map((prescription, idx) => (
                              <div
                                key={idx}
                                className="flex items-start bg-white dark:bg-slate-800 p-3 rounded border border-gray-200 dark:border-slate-600"
                              >
                                <Pill className="mr-2 mt-0.5 w-4 h-4 text-blue-500" />
                                <div>
                                  <p className="font-medium text-sm text-slate-700 dark:text-slate-300">
                                    {prescription.name} {prescription.dosage}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {prescription.instructions} • Duration:{" "}
                                    {prescription.duration}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {record.attachments.length > 0 && (
                        <div>
                          <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Attachments
                          </h4>
                          <div className="space-y-2">
                            {record.attachments.map((attachment) => (
                              <div
                                key={attachment.id}
                                className="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded border border-gray-200 dark:border-slate-600"
                              >
                                <div className="flex items-center">
                                  <FileText className="mr-2 w-4 h-4 text-blue-500" />
                                  <div>
                                    <p className="text-sm text-slate-700 dark:text-slate-300">
                                      {attachment.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {attachment.type} • {attachment.size}
                                    </p>
                                  </div>
                                </div>
                                <button className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition">
                                  <Download size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">
            No health records found matching your criteria.
          </p>
        </div>
      )}

      {filteredRecords.length > 5 && (
        <div className="mt-6 flex justify-center">
          <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-150">
            Load More Records
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthRecordsTimeline;
