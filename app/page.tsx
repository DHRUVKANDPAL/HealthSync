"use client";
import Chartstats from "@/components/Chartstats";
import Faq from "@/components/faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonial from "@/components/Testimonial";
import Safari from "@/components/ui/safari";
import Vision from "@/components/Vision";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { ShineBorder } from "@/components/magicui/shine-border";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import Link from "next/link";
import { Bot } from "lucide-react";

export default function Home() {
  const isMobile = useIsMobile();
  const [isSearching, setIsSearching] = useState(false);

  const MainContent = () => (
    <>
      <div className="relative">
        <div className="relative">
          <Hero></Hero>
        </div>
        <div className="absolute rounded-lg top-[65%] w-full z-10">
          {/* <Vision></Vision> */}
          <HowItWorks></HowItWorks>
        </div>
      </div>
      <div className="h-[1100px] xs:h-[1000px] sm:h-[900px] md:h-[650px]">
        <div className="relative w-full h-full bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
          {/* Background Elements for Seamless Continuation */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Top Blended Gradient to Match Hero's Bottom */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100 to-transparent dark:from-slate-800 dark:to-transparent" />

            {/* Light Mode Background Elements */}
            <div className="absolute top-0 -left-32 w-96 h-96 rounded-full bg-teal-50/60 dark:bg-slate-900/60 blur-3xl" />
            <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-amber-200/30 dark:bg-amber-900/5 blur-3xl" />

            {/* Centered Teal Glow - Light Mode */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] 
                          bg-gradient-to-t from-teal-300/50 to-teal-200/10 
                          blur-3xl rounded-t-full 
                          dark:opacity-0"
            />

            {/* Dark Mode Glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] 
                          bg-gradient-to-t from-teal-800/60 to-teal-700/5
                          blur-3xl rounded-t-full opacity-0 
                          dark:opacity-100"
            />

            {/* Additional Ambient Elements */}
            <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-emerald-200/30 dark:bg-emerald-900/20 blur-3xl" />

            {/* Light Mode Particles */}
            <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />
            <div className="absolute top-2/3 right-1/3 w-3 h-3 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />

            {/* Dark Mode Particles */}
            <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />
            <div className="absolute top-2/3 right-1/3 w-3 h-3 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />
          </div>
        </div>
      </div>
      <Features></Features>
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center py-10 ">
        
        <div className="relative flex items-center justify-end px-2 ">
          <Terminal>
            <TypingAnimation>&gt; HealthSync on the way!</TypingAnimation>

            <AnimatedSpan delay={1500} className="text-green-500">
              <span>✔ Connecting to hospital database.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={2000} className="text-green-500">
              <span>✔ Verifying patient records.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={2500} className="text-green-500">
              <span>✔ Syncing OPD appointments.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={3000} className="text-green-500">
              <span>✔ Updating real-time bed availability.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={3500} className="text-green-500">
              <span>✔ Optimizing pharmacy inventory.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={4000} className="text-green-500">
              <span>✔ Processing doctor prescriptions.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={4500} className="text-green-500">
              <span>✔ Sending automated patient notifications.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={5000} className="text-green-500">
              <span>✔ Ensuring data encryption & security.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={5500} className="text-blue-500">
              <span> AI Diagnostics Module Loaded:</span>
              <span className="pl-2">
                - Predictive health analytics activated.
              </span>
            </AnimatedSpan>

            <TypingAnimation delay={6000} className="text-muted-foreground">
              HealthSync is now live and operational.
            </TypingAnimation>

            <TypingAnimation delay={6500} className="text-muted-foreground">
              Real-time hospital management enabled.
            </TypingAnimation>
          </Terminal>
        </div>
        <div className="relative flex items-center justify-start px-2 ">
          <ShineBorder color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        </div>
      </div> */}
      <PricingSection />
      {/* <Chartstats></Chartstats> */}
      <div className="w-5/6 mx-auto ">
        <Testimonial></Testimonial>
      </div>
      <div className="w-5/6 mx-auto md:w-1/2 py-10">
        <Faq></Faq>
      </div>
      <Footer></Footer>
    </>
  );

  return (
    <main className="select-none ">
      <Header onSearchStateChange={setIsSearching} />
      {!isSearching && <MainContent />}
      <div className="fixed bottom-5 right-5 z-50">
        <Link
          href="/curoAi"
          className="flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:shadow-xl"
        >
          <Bot size={28} color="white" strokeWidth={2} />
        </Link>
      </div>
    </main>
  );
}
