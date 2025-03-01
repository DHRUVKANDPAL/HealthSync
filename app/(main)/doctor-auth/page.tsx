import DarkModeToggle from "@/components/DarkModeToggle";
import Doctorsignin from "@/components/Doctorsignin";
import DoctorSignUp from "@/components/Doctorsignup";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import SignInSignUpTabswitcher from "@/components/SignInSignUpTabSwitcher";
import React from "react";
import AuthHeader from "@/components/AuthHeader";

const DoctorAuth = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader name="Doctor" />
      <div className="flex-grow flex items-center justify-center w-full relative overflow-hidden py-10 px-4 bg-transparent">
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
        <div className="relative max-w-screen-2xl w-full z-10 pt-10">
          <SignInSignUpTabswitcher
            name="Doctor"
            signinTab={<Doctorsignin />}
            signUpTab={<DoctorSignUp />}
          />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DoctorAuth;
