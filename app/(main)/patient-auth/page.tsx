import Footer from "@/components/Footer";
import Hospitalsignin from "@/components/Hospitalsignin";
import HospitalSignUp from "@/components/HospitalSignup";
import SignInSignUpTabswitcher from "@/components/SignInSignUpTabSwitcher";

import Tabswitcher from "@/components/Tabswitcher";
import React from "react";
import AuthHeader from "@/components/AuthHeader";
import Signin from "@/components/Signin";
import PatientSignUp from "@/components/Signup";

const PatientAuth = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader name="Patient" />
      <div className="flex-grow flex items-center justify-center w-full relative overflow-hidden py-10 px-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Background design elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-100 dark:bg-purple-900/20 blur-3xl opacity-50"></div>
          <svg
            className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.02]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 0 10 L 40 10 M 10 0 L 10 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-screen-2xl w-full z-10">
          <SignInSignUpTabswitcher
            name="Patient"
            signinTab={<Signin />}
            signUpTab={<PatientSignUp />}
          />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default PatientAuth;
