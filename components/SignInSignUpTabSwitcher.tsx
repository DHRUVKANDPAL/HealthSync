"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const SignInSignUpTabswitcher = ({
  signinTab,
  signUpTab,
  name,
}: {
  signinTab: any;
  signUpTab: any;
  name?: string;
}) => {
  const [activeTab, setActiveTab] = useState("signin");

  // Animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleTabChange = (value: any) => {
    setActiveTab(value);
  };

  // Clone the signin component and pass the handleTabChange function
  const signinTabWithProps = React.cloneElement(signinTab, {
    onRegisterClick: () => handleTabChange("signup"),
  });

  return (
    <div className="p-4 w-full mx-auto">
      <div className="flex flex-col items-center">
        {/* <div className="w-full max-w-3xl mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">
              {name} Portal
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Sign in to access your dashboard or create a new account to join
              our healthcare network.
            </p>
          </motion.div>
        </div> */}

        <Tabs
          defaultValue="signin"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex justify-center items-center pb-2 mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md bg-slate-100/50 dark:bg-slate-800/50 rounded-full backdrop-blur-lg">
              <TabsTrigger
                value="signin"
                className={`rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === "signin"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className={`rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === "signup"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                Register
              </TabsTrigger>
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <TabsContent value="signin" className="mt-0 flex justify-center">
              <motion.div
                key="signin"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {signinTabWithProps}
              </motion.div>
            </TabsContent>

            <TabsContent value="signup" className="mt-0 flex justify-center">
              <motion.div
                key="signup"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {signUpTab}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="hidden lg:block absolute top-40 left-20 w-16 h-16 rounded-full bg-blue-500/20 dark:bg-blue-400/10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.div
        className="hidden lg:block absolute bottom-20 right-40 w-24 h-24 rounded-full bg-purple-500/20 dark:bg-purple-400/10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.div
        className="hidden lg:block absolute top-1/4 right-20 w-10 h-10 rounded-full bg-green-500/20 dark:bg-green-400/10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
    </div>
  );
};

export default SignInSignUpTabswitcher;
