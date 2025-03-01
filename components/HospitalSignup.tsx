"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { hospitalsignup } from "@/app/(main)/hospital-auth/authhos.actions";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle,
  Building,
  Mail,
  Phone,
  Shield,
  Key,
  Globe,
  Calendar,
  MapPin,
  FileText,
  UserCircle,
} from "lucide-react";

export const HospitalSignUpSchema = z
  .object({
    name: z.string().min(2, "Name is required").max(50),
    licence: z.string().min(1, "License number is required"),
    estyear: z.coerce.number().min(1800, "Enter a valid year"),
    website: z.string().min(1, "Website is required"),
    contactNo: z.string().min(10, "This is not a valid contact number"),
    alternateContactNo: z
      .string()
      .min(10, "This is not a valid contact number"),
    email: z.string().email("This is not a valid email"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipcode: z.string().min(5, "Enter a valid zipcode"),
    idToLogin: z.string().min(3, "Login ID is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const HospitalSignUp = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    { title: "Basic Info", description: "Hospital information" },
    { title: "Contact Details", description: "How to reach you" },
    { title: "Location & Security", description: "Address and credentials" },
  ];

  const form = useForm<z.infer<typeof HospitalSignUpSchema>>({
    resolver: zodResolver(HospitalSignUpSchema),
    defaultValues: {},
    mode: "onChange",
  });

  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof HospitalSignUpSchema>) {
    startTransition(async () => {
      console.log(values);
      const res = await hospitalsignup(values);
      if (res.success) {
        toast.success("Hospital registered successfully");
        router.push(`/hospital-dash/${res.id}`);
      } else {
        toast.error(res.error);
      }
    });
  }

  const goToNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.3 } },
  };

  const stepVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
    exit: { x: -30, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <Card className="w-[300px] sm:w-[430px] md:w-[720px] lg:w-[800px] dark:bg-[rgba(31,41,55,0.5)] backdrop-blur-3xl relative overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-teal-600 dark:from-blue-500 dark:to-teal-700"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: (activeStep + 1) / steps.length }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <Building className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-600 dark:from-blue-400 dark:to-teal-500">
            Register Hospital
          </CardTitle>
        </motion.div>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          Complete these steps to register your hospital.
        </CardDescription>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-4"
        >
          <div className="flex justify-between mb-6 relative">
            {/* Progress line */}
            <div className="absolute top-4 left-0 h-1 bg-slate-200 dark:bg-slate-700 w-full -z-10"></div>
            <div
              className="absolute top-4 left-0 h-1 bg-gradient-to-r from-blue-400 to-teal-600 dark:from-blue-500 dark:to-teal-700 -z-10 transition-all duration-300"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10 ${
                    idx <= activeStep
                      ? "bg-gradient-to-r from-blue-500 to-teal-600 dark:from-blue-400 dark:to-teal-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => idx < activeStep && setActiveStep(idx)}
                >
                  {idx < activeStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    idx + 1
                  )}
                </motion.div>
                <span className="text-xs mt-2 text-center font-medium text-slate-700 dark:text-slate-300">
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </CardHeader>

      <CardContent className="pb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <motion.div
              key={`step-${activeStep}`}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-3"
            >
              {/* Step 1: Basic Information */}
              {activeStep === 0 && (
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={itemVariants} className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Building className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      Hospital Information
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Please provide basic hospital details
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Hospital Name
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="Manas Hospital"
                                type="text"
                                className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="licence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            License Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FileText className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="NIN2HFIH"
                                type="text"
                                className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="estyear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Established Year
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="2010"
                                type="number"
                                className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Website
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Globe className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="www.manashospital.com"
                                type="text"
                                className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Contact Details */}
              {activeStep === 1 && (
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={itemVariants} className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Phone className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      Contact Information
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      How patients can contact your hospital
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="contactNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Primary Contact Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="9876543210"
                                type="text"
                                className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="alternateContactNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Alternate Contact Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="9876543211"
                                type="text"
                                className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="info@manashospital.com"
                                type="email"
                                className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <div className="py-4">
                    <motion.div
                      className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">
                        Important Note
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        Please ensure your contact information is accurate as it
                        will be used for verification and patient
                        communications.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Location & Security */}
              {activeStep === 2 && (
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={itemVariants} className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      Location & Security
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Address details and account security
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Address
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="123 Medical Plaza"
                                type="text"
                                className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 dark:text-slate-300">
                              City
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Mumbai"
                                type="text"
                                className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 dark:text-slate-300">
                              State
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Maharashtra"
                                type="text"
                                className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="zipcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 dark:text-slate-300">
                              Zipcode
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="400001"
                                type="text"
                                className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="idToLogin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Unique Login ID
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserCircle className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="manashospital2025"
                                type="text"
                                className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 dark:text-slate-300">
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Key className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <Input
                                  placeholder="******"
                                  type="password"
                                  className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 dark:text-slate-300">
                              Confirm Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Key className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <Input
                                  placeholder="******"
                                  type="password"
                                  className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <div className="flex justify-between mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {activeStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPrevStep}
                    className="bg-white/50 dark:bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Back
                  </Button>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {activeStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={goToNextStep}
                    className="bg-gradient-to-r from-blue-500 to-teal-600 dark:from-blue-600 dark:to-teal-700 hover:from-blue-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-teal-600 dark:from-blue-600 dark:to-teal-700 hover:from-blue-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    {isPending && (
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    )}
                    Complete Registration
                  </Button>
                )}
              </motion.div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HospitalSignUp;
