"use client";
import { Inter } from "next/font/google";
import { toast, Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { logout } from "@/app/(main)/patient-auth/auth.actions";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import BeatLoader from "@/components/BeatLoader";
import DarkModeToggle from "@/components/DarkModeToggle";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { DoctorSidebar } from "@/components/DoctorSidebar";
import { doctorLogout } from "@/app/(main)/doctor-auth/authdoc.action";
import type { Doctor } from "@/types/doctor";
import SymptomSearchBar from "@/components/SymptomsSearchBar";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [activeSection, setActiveSection] = useState("profile");
  const router = useRouter();
  const doctorData1: Doctor = {
    id: "1",
    userId: "doc123",
    name: "Mashoor Gulati",
    imageUrl: "/doctor-image.jpg",
    dob: "1980-05-15",
    aadharNo: "1234-5678-9101",
    licenceNo: "LIC12345",
    contactno: "9876543210",
    email: "mashooor@gulati.com",
    createdAt: "2022-01-01",
    departments: [
      { deptId: "1", dept: { name: "Cardiology" } },
      { deptId: "2", dept: { name: "Neurology" } },
    ],
  };

  const { id } = useParams();
  const [doctorData, setDoctorData] = useState<Doctor>();
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`/api/doctor/${id}`);
        const data = await response.json();
        console.log(data.user);
        setDoctorData(data.user);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    fetchDoctorData();
  }, []);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const res = await fetch(`/api/patient/${id}`);
  //       const data = await res.json();
  //       if (!data.success) {
  //         router.push("/patient-auth");
  //       } else {
  //         setUserExists(true);
  //         setUserData(data.user);
  //       }
  //     } catch (error) {
  //       toast.error("Error checking user.");
  //       router.push("/patient-auth");
  //     }
  //   };

  //   checkUser();
  // }, [id, router]);

  const handleLogout = async () => {
    try {
      await doctorLogout();
      toast.success("Logged out successfully");
      router.push("/doctor-auth");
    } catch (error) {
      toast.error("Error logging out. Try again!");
    }
  };

  // const handleSectionChange = (section: string) => {
  //   setActiveSection(section);
  //   if (section === "profile") router.push(`/patient-dash/${id}`);
  //   else router.push(`/patient-dash/${id}/${section}`);
  // };

  // if (userExists === null) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
  //       <BeatLoader></BeatLoader>
  //     </div>
  //   );
  // }

  return (
    <>
      <SidebarProvider className="dark:bg-slate-950 h-screen p-0">
        <DoctorSidebar
          id={id}
          handleLogout={handleLogout}
          userData={doctorData}
        />
        <SidebarInset className="dark:bg-slate-950 relative overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 pb-2">
            <div className="flex items-center justify-between w-full gap-2 px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
              <div className="flex items-center w-full">
                <SymptomSearchBar inputClassName="h-12" searchButtonClassName="h-12"></SymptomSearchBar>
              </div>

              <DarkModeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-x-auto bg-gray-50 dark:bg-gray-900 ">
            <div className="lg:p-8 p-4">
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
