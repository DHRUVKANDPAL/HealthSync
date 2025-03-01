"use client";

import React, { useState } from "react";
import {
  FileText,
  FileArchive,
  Search,
  Filter,
  Download,
  ExternalLink,
  Eye,
} from "lucide-react";

// Import patient data if available, otherwise use sample data
// import { PatientData } from "@/components/SamplePatientData";

// Sample document data
const sampleDocuments = [
  {
    id: "doc-001",
    name: "Medical History Summary",
    date: "February 20, 2025",
    type: "PDF",
    size: "2.4 MB",
    category: "Summary",
    uploadedBy: "Dr. Smith",
  },
  {
    id: "doc-002",
    name: "Insurance Coverage Details",
    date: "January 15, 2025",
    type: "PDF",
    size: "1.1 MB",
    category: "Insurance",
    uploadedBy: "Admin",
  },
  {
    id: "doc-003",
    name: "MRI Scan Results",
    date: "December 12, 2024",
    type: "DICOM",
    size: "15.8 MB",
    category: "Imaging",
    uploadedBy: "Radiology Dept.",
  },
  {
    id: "doc-004",
    name: "Consent Form - Surgery",
    date: "November 30, 2024",
    type: "PDF",
    size: "0.8 MB",
    category: "Legal",
    uploadedBy: "Patient Portal",
  },
  {
    id: "doc-005",
    name: "Allergy Test Results",
    date: "October 25, 2024",
    type: "PDF",
    size: "3.2 MB",
    category: "Laboratory",
    uploadedBy: "Dr. Johnson",
  },
];

const Documents = () => {
  // Use PatientData if available, otherwise use sample data
  // const documents = PatientData?.documents || sampleDocuments;
  const documents = sampleDocuments;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Extract unique categories
  const categories = [
    "All",
    ...Array.from(new Set(documents.map((doc) => doc.category))),
  ];

  // Filter documents based on search and category
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Function to get icon based on file type
  const getFileIcon = (type:any) => {
    if (type === "PDF") {
      return <FileText size={20} className="text-red-500" />;
    } else if (type === "DICOM") {
      return <FileArchive size={20} className="text-purple-500" />;
    } else {
      return <FileText size={20} className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 min-h-[calc(100vh-200px)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 md:mb-0">
          Documents
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documents..."
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-slate-600">
            <button
              className={`px-3 py-2 ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              className={`px-3 py-2 ${
                viewMode === "list"
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setViewMode("list")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {filteredDocuments.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition duration-150 border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
              >
                <div className="flex items-center mb-3">
                  <div className="p-3 mr-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex-1 truncate">
                    <p className="font-semibold text-slate-800 dark:text-white truncate">
                      {doc.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.date}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {doc.size} • {doc.type}
                  </span>

                  <div className="flex space-x-2">
                    <button className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition duration-150 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900">
                      <Eye size={16} />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition duration-150 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition duration-150"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    {getFileIcon(doc.type)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {doc.name}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{doc.date}</span>
                      <span className="mx-2">•</span>
                      <span>{doc.size}</span>
                      <span className="mx-2">•</span>
                      <span>Uploaded by: {doc.uploadedBy}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                    {doc.category}
                  </span>

                  <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition duration-150 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900">
                    <Eye size={18} />
                  </button>

                  <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition duration-150 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">
            No documents found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Documents;
