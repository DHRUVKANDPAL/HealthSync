"use client";
import React, { useEffect, useState } from "react";
import ProfilePage from "@/components/Profile"; // Adjust the import path as needed
import { PatientData } from "@/components/SamplePatientData"; // Adjust the import path as needed
import BeatLoader from "@/components/BeatLoader";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
interface PatientData {
  id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  aadharno: string;
  address: string;
  alternatecontactno: string;
  bloodgroup: string;
  contactno: string;
  emergencycontact: string;
  prevHis: string;
  createdAt: string;
  updatedAt: string;
  medHis: any[];
  imageUrl?: string;
}
const PatientProfilePage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<PatientData | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`/api/patient/${id}`);
        const data = await res.json();
        if (!data.success) {
          router.push("/patient-auth");
        } else {
          setUserExists(true);
          setUserData(data.user);
        }
      } catch (error) {
        toast.error("Error checking user.");
        router.push("/patient-auth");
      }
    };

    checkUser();
  }, [id, router]);
  if (!userExists) return <BeatLoader />;
  return (
    <div className="">
      <ProfilePage patient={userData} />
    </div>
  );
};

export default PatientProfilePage;
