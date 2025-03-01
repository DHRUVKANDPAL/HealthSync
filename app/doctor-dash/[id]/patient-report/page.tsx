"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  User,
  Hospital,
  UserRound,
  Calendar,
  PlusCircle,
  PillIcon,
  FileText,
  Stethoscope,
  History,
  Download,
  FileClock,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { date } from "zod";

const initialFormData = {
  patient_data: {
    name: "",
    uhid: "",
    age: "",
    sex: "",
    date: new Date().toLocaleDateString("en-GB").replace(/\//g, "/"),
    chief_complaints: "",
    aggravating_factor: "",
    present_illness: "",
    family_history: "",
    surgical_history: "",
    examination: "",
    clinical_impression: "",
  },
  hospital_data: {
    name: "HealthSync Hospital",
    address: "Ludhiana, Punjab, India",
    phone: "+91-161-XXXXXXX",
    email: "info@healthsync.com",
    website: "www.healthsync.com",
    emergency: "+91-161-XXXXXXX",
    footer: {
      name: "Fortis Hospital",
      address: "Chandigarh Road, Ludhiana",
      email: "contactus.ludhiana@fortishealthcare.com",
      phone: "+91-161-5222333",
    },
  },
  doctor_data: {
    name: "Dr. Anmol Rattan Kath",
    degree:
      "MBBS, MS (Otorhinolaryngology), Fellowship (Head and Neck Surgery)",
    speciality: "Consultant, Head and Neck Surgery",
    mobile: "+91 95015 87435",
    email: "anmol.kath@fortishealthcare.com",
    pmc: "46528",
  },
  advice_data: [{
    name: "Paracetamol",
    dosage: "500mg",
    details: "For pain and fever",
  }],
  previous_reports: [{
    hospital: "Manas Hospital",
    consultation: "Dr. Anmol Rattan Kath",
    date: "2023-08-15",
  }],
};

export default function Page() {
  const { id } = useParams();
  const [formData, setFormData] = useState(initialFormData);
  const [newAdviceData, setNewAdviceData] = useState({
    name: "",
    dosage: "",
    details: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const submitReport = async (reportUrl: string, reportType: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(reportUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to generate report");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${reportType}_${formData.patient_data.name || "patient"}_${new Date().toLocaleDateString()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setSuccessMessage(`${reportType} has been generated successfully!`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addAdvice = () => {
    if (!newAdviceData.name || !newAdviceData.dosage) return;

    setFormData({
      ...formData,
      advice_data: [...formData.advice_data, newAdviceData],
    });

    setNewAdviceData({
      name: "",
      dosage: "",
      details: "",
    });
  };

  const removeAdvice = (index:any) => {
    const updatedAdvice = [...formData.advice_data];
    updatedAdvice.splice(index, 1);
    setFormData({
      ...formData,
      advice_data: updatedAdvice,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200 p-4 md:p-8"
    >
      <div className="container mx-auto max-w-6xl">
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <FileText size={18} />
              {successMessage}
            </span>
          </motion.div>
        )}
        
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-blue-900 dark:to-indigo-950 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <Hospital className="h-8 w-8" />
                <CardTitle className="text-2xl font-bold">Medical Report System</CardTitle>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                {formData.patient_data.uhid && (
                  <Badge variant="outline" className="text-sm bg-white/10 text-white border-none">
                    <UserRound className="mr-1 h-3 w-3" />
                    ID: {formData.patient_data.uhid}
                  </Badge>
                )}
                <Badge variant="outline" className="text-sm bg-white/10 text-white border-none">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formData.patient_data.date}
                </Badge>
              </div>
            </div>
          </CardHeader>

          {/* Patient Summary Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="m-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-500 dark:text-gray-400 text-sm">
                  Patient
                </Label>
                <p className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-500" />
                  {formData.patient_data.name || "Patient Name"} 
                  {formData.patient_data.age && formData.patient_data.sex && (
                    <span>, {formData.patient_data.age} ({formData.patient_data.sex})</span>
                  )}
                </p>
              </div>
              <div>
                <Label className="text-gray-500 dark:text-gray-400 text-sm">
                  Doctor
                </Label>
                <p className="font-semibold flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-blue-500" />
                  {formData.doctor_data.name}
                </p>
              </div>
              <div>
                <Label className="text-gray-500 dark:text-gray-400 text-sm">
                  Hospital
                </Label>
                <p className="font-semibold flex items-center gap-2">
                  <Hospital className="h-4 w-4 text-blue-500" />
                  {formData.hospital_data.name}
                </p>
              </div>
            </div>
          </motion.div>

          <CardContent className="px-6">
            <Tabs defaultValue="patientInfo" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="patientInfo" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Patient Information</span>
                  <span className="sm:hidden">Patient</span>
                </TabsTrigger>
                <TabsTrigger value="medications" className="flex items-center gap-2">
                  <PillIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Medications</span>
                  <span className="sm:hidden">Meds</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">Medical History</span>
                  <span className="sm:hidden">History</span>
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                {/* Patient Information Tab */}
                <TabsContent value="patientInfo">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            Clinical Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="chief_complaints">Chief Complaints</Label>
                            <Input
                              id="chief_complaints"
                              placeholder="e.g., Excessive sneezing x 1 year"
                              value={formData.patient_data.chief_complaints}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  patient_data: {
                                    ...formData.patient_data,
                                    chief_complaints: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="aggravating_factor">Aggravating Factors</Label>
                            <Input
                              id="aggravating_factor"
                              placeholder="e.g., Change in weather"
                              value={formData.patient_data.aggravating_factor}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  patient_data: {
                                    ...formData.patient_data,
                                    aggravating_factor: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="present_illness">Present Illness</Label>
                            <Textarea
                              id="present_illness"
                              placeholder="e.g., No h/o nasal block/bleed"
                              rows={3}
                              value={formData.patient_data.present_illness}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  patient_data: {
                                    ...formData.patient_data,
                                    present_illness: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Stethoscope className="h-5 w-5 text-blue-500" />
                            Medical Findings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="examination">Examination</Label>
                            <Textarea
                              id="examination"
                              placeholder="e.g., Nasal mucosa mild congested, Throat-granular pharyngitis"
                              rows={3}
                              value={formData.patient_data.examination}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  patient_data: {
                                    ...formData.patient_data,
                                    examination: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="clinical_impression">Clinical Impression</Label>
                            <Textarea
                              id="clinical_impression"
                              placeholder="e.g., Allergic rhinitis with granular pharyngitis"
                              rows={3}
                              value={formData.patient_data.clinical_impression}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  patient_data: {
                                    ...formData.patient_data,
                                    clinical_impression: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="patient_name">Patient Name</Label>
                              <Input
                                id="patient_name"
                                placeholder="e.g., Anmol Mishra"
                                value={formData.patient_data.name}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    patient_data: {
                                      ...formData.patient_data,
                                      name: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="patient_id">Patient ID</Label>
                              <Input
                                id="patient_id"
                                placeholder="e.g., 2105561"
                                value={formData.patient_data.uhid}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    patient_data: {
                                      ...formData.patient_data,
                                      uhid: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="age">Age</Label>
                              <Input
                                id="age"
                                placeholder="e.g., 21"
                                value={formData.patient_data.age}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    patient_data: {
                                      ...formData.patient_data,
                                      age: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="sex">Sex</Label>
                              <Input
                                id="sex"
                                placeholder="e.g., Male"
                                value={formData.patient_data.sex}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    patient_data: {
                                      ...formData.patient_data,
                                      sex: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Medications Tab */}
                <TabsContent value="medications">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PillIcon className="h-5 w-5 text-blue-500" />
                          Current Medications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {formData.advice_data.length > 0 ? (
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Medication</TableHead>
                                  <TableHead>Dosage</TableHead>
                                  <TableHead>Instructions</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {formData.advice_data.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary" className="font-semibold">
                                        {item.dosage}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{item.details}</TableCell>
                                    <TableCell>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeAdvice(index)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400 border border-dashed rounded-lg">
                            <PillIcon className="mx-auto h-12 w-12 mb-4 opacity-30" />
                            <p>No medications added</p>
                            <p className="text-sm">Use the form below to add medications</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <PlusCircle className="h-5 w-5 text-green-500" />
                          Add New Medication
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <motion.div 
                          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-2">
                            <Label htmlFor="medication_name">Medication Name</Label>
                            <Input
                              id="medication_name"
                              placeholder="e.g., Fluticasone Nasal Spray"
                              value={newAdviceData.name}
                              onChange={(e) =>
                                setNewAdviceData({
                                  ...newAdviceData,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="dosage">Dosage</Label>
                            <Input
                              id="dosage"
                              placeholder="e.g., 2 sprays BD"
                              value={newAdviceData.dosage}
                              onChange={(e) =>
                                setNewAdviceData({
                                  ...newAdviceData,
                                  dosage: e.target.value,
                                })
                              }
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="instructions">Instructions</Label>
                            <Input
                              id="instructions"
                              placeholder="e.g., Use twice daily, morning and evening"
                              value={newAdviceData.details}
                              onChange={(e) =>
                                setNewAdviceData({
                                  ...newAdviceData,
                                  details: e.target.value,
                                })
                              }
                            />
                          </div>
                        </motion.div>
                        
                        <Button
                          onClick={addAdvice}
                          className="flex items-center gap-2"
                          disabled={!newAdviceData.name || !newAdviceData.dosage}
                        >
                          <PlusCircle className="h-4 w-4" />
                          Add Medication
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <History className="h-5 w-5 text-blue-500" />
                          Medical History
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-2">
                            <Label htmlFor="family_history">Family History</Label>
                            <Input
                              id="family_history"
                              placeholder="e.g., Mother has allergic rhinitis"
                              value={formData.patient_data.family_history}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  patient_data: {
                                    ...formData.patient_data,
                                    family_history: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="surgical_history">Surgical History</Label>
                            <Input
                              id="surgical_history"
                              placeholder="e.g., No previous surgeries"
                              value={formData.patient_data.surgical_history}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  patient_data: {
                                    ...formData.patient_data,
                                    surgical_history: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <div className="space-y-4">
                          <h3 className="text-md font-medium flex items-center gap-2">
                            <FileClock className="h-5 w-5 text-blue-500" />
                            Previous Consultations
                          </h3>
                          
                          {formData.previous_reports.length > 0 ? (
                            <div className="space-y-4">
                              {formData.previous_reports.map((report, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">
                                        {report.date}
                                      </h4>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {report.hospital}
                                      </p>
                                    </div>
                                    {index === 0 && (
                                      <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        Most Recent
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="mt-2 text-sm">{report.consultation}</p>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400 border border-dashed rounded-lg">
                              <FileClock className="mx-auto h-12 w-12 mb-4 opacity-30" />
                              <p>No previous consultations recorded</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 p-6 bg-gray-50 dark:bg-gray-800">
            <Button
              variant="outline"
              onClick={() => {
                submitReport(
                  "https://report-generator-3moj.onrender.com/generate_previous_reports",
                  "Past_Reports"
                );
              }}
              disabled={isLoading}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <FileClock className="h-4 w-4" />
              Generate Past Reports
              {isLoading && <div className="animate-spin ml-2">⏳</div>}
            </Button>
            <Button
              onClick={() => {
                submitReport(
                  "https://report-generator-3moj.onrender.com/generate_main_report",
                  "Current_Report"
                );
              }}
              disabled={isLoading}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Generate Current Report
              {isLoading && <div className="animate-spin ml-2">⏳</div>}
            </Button>
          </CardFooter>
        </Card>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8"
        >
          © 2025 {formData.hospital_data.footer.name} • {formData.hospital_data.footer.address} • {formData.hospital_data.footer.phone}
        </motion.footer>
      </div>
    </motion.div>
  );
}