"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
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
import { toast } from "sonner";
import {
  CalendarIcon,
  Loader2,
  CheckCircle,
  UserCircle,
  Mail,
  Phone,
  Shield,
  Key,
  Calendar,
  LucideSmilePlus,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { doctorsignup } from "@/app/(main)/doctor-auth/authdoc.action";
import { motion } from "framer-motion";

export const DoctorSignUpSchema = z
  .object({
    userId: z.string().min(2, "User ID is required").max(50),
    name: z.string().min(2, "Name is required").max(50),
    licenceNo: z.string().min(1, "License number is required"),
    dob: z.date({ required_error: "Date of birth is required" }),
    aadharNo: z.string().length(12, "This is not a valid Aadhar no"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    contactno: z.string().length(10, "This is not a valid Contact no"),
    email: z.string().email("This is not a valid email"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const DoctorSignUp = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    { title: "Personal Details", description: "Your basic information" },
    { title: "Professional Details", description: "Your credentials" },
    { title: "Contact & Security", description: "How to reach you" },
  ];

  const form = useForm<z.infer<typeof DoctorSignUpSchema>>({
    resolver: zodResolver(DoctorSignUpSchema),
    defaultValues: {},
    mode: "onChange",
  });

  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof DoctorSignUpSchema>) {
    startTransition(async () => {
      console.log(values);
      const res = await doctorsignup(values);
      if (res.success) {
        toast.success("Doctor registered successfully");
        router.push(`/doctor-dash/${res.id}`);
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

  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Animation variants - toned down
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
          <LucideSmilePlus className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-600 dark:from-blue-400 dark:to-teal-500">
            Register Doctor
          </CardTitle>
        </motion.div>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          Complete these steps to create your account.
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
              {/* Step 1: Personal Details */}
              {activeStep === 0 && (
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={itemVariants} className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <UserCircle className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      Personal Information
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Please provide your basic details
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserCircle className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="Dr. Jane Smith"
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
                      name="userId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Unique ID
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserCircle className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="janesmith2025"
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
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Date of Birth
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  type="button" // Important: prevent form submission on calendar click
                                  className={cn(
                                    "w-full pl-3 text-left font-normal py-2 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <Calendar className="mr-2 h-4 w-4 inline-block" />
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50 inline-block" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <div className="flex items-center justify-between p-2 border-b">
                                <Select
                                  onValueChange={(value) => {
                                    const year = parseInt(value);
                                    setSelectedYear(year);
                                    const currentDate =
                                      field.value || new Date();
                                    field.onChange(
                                      new Date(
                                        year,
                                        currentDate?.getMonth() || 0,
                                        currentDate?.getDate() || 1
                                      )
                                    );
                                  }}
                                >
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Select Year" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {years.map((year) => (
                                      <SelectItem
                                        key={year}
                                        value={year.toString()}
                                      >
                                        {year}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(date);
                                    setSelectedYear(date.getFullYear());
                                  }
                                }}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                                month={
                                  selectedYear
                                    ? new Date(selectedYear, 0)
                                    : undefined
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="aadharNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Aadhar Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Shield className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                placeholder="123456789012"
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

              {/* Step 2: Professional Details */}
              {activeStep === 1 && (
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={itemVariants} className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      Professional Credentials
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Please provide your professional details
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="licenceNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Medical License Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Shield className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
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
                        Your medical license will be verified before your
                        account is activated. Please ensure the information
                        provided is accurate.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact & Security */}
              {activeStep === 2 && (
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={itemVariants} className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Key className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      Contact & Security
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Set up your contact details and secure your account
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="contactno"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Contact Number
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
                                placeholder="doctor@example.com"
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

export default DoctorSignUp;
