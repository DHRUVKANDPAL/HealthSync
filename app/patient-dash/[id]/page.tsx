import React from "react";
import ProfilePage from "@/components/Profile"; // Adjust the import path as needed
import { PatientData } from "@/components/SamplePatientData"; // Adjust the import path as needed

const PatientProfilePage: React.FC = () => {
  return (
    <div className="h-full">
      <ProfilePage patient={PatientData} />
    </div>
  );
};

export default PatientProfilePage;
