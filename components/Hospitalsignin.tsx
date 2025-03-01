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
import { toast } from "sonner";
import { Loader2, Building2, Key, LogIn, PlusCircle } from "lucide-react";
import { hospitalSignIn } from "@/app/(main)/hospital-auth/authhos.actions";
import { motion } from "framer-motion";

export const HospitalSigninSchema = z.object({
  uniqueIdToLogin: z.string(),
  password: z.string().min(6),
});

const Hospitalsignin = ({ onRegisterClick }: any) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof HospitalSigninSchema>>({
    resolver: zodResolver(HospitalSigninSchema),
    defaultValues: {
      uniqueIdToLogin: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof HospitalSigninSchema>) {
    startTransition(async () => {
      console.log(values);
      const res = await hospitalSignIn(values);
      if (res.success) {
        toast.success("Logged in successfully");
        router.push(`/hospital-dash/${res.id}`);
      } else {
        toast.error(res.error);
      }
    });
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-[300px] sm:w-[430px] md:w-[540px] dark:bg-[rgba(31,41,55,0.5)] backdrop-blur-3xl border border-slate-200 dark:border-slate-700 shadow-lg relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-blue-600 dark:from-sky-500 dark:to-blue-700"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        />

        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-6 w-6 text-sky-500 dark:text-sky-400" />
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500">
              Hospital Login
            </CardTitle>
          </motion.div>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Welcome back! Please sign in to continue.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={itemVariants}>
                <motion.div
                  className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-r from-sky-400/10 to-blue-500/10 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Building2 className="h-10 w-10 text-sky-500 dark:text-sky-400" />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="uniqueIdToLogin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300">
                        Unique ID
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                          <Input
                            placeholder="Enter your ID"
                            type="text"
                            className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-sky-500"
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
                            className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-sky-500"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-600 dark:to-blue-700 hover:from-sky-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 h-11"
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    ) : (
                      <LogIn className="mr-2 h-5 w-5" />
                    )}
                    {isPending ? "Signing in..." : "Sign In"}
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400"
              >
                <p>
                  Don't have an account?{" "}
                  <span
                    className="text-sky-500 dark:text-sky-400 cursor-pointer hover:underline"
                    onClick={onRegisterClick}
                  >
                    Register here
                  </span>
                </p>
              </motion.div>
            </motion.form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Hospitalsignin;
