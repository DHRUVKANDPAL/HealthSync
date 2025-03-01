"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Bot,
  User,
  Send,
  AlertTriangle,
  Stethoscope,
  Heart,
  Shield,
  Building2,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { curoAIResponse } from "@/lib/gemini";
import DarkModeToggle from "@/components/DarkModeToggle";
import DoctorProfileShimmer from "@/components/DoctorProfileShimmer";
import MessageLoadingShimmer from "./MessageShimmer";

type Message = {
  role: string;
  content: string | any;
};

const shimmerVariants = {
  initial: {
    backgroundPosition: "-468px 0",
  },
  animate: {
    backgroundPosition: "468px 0",
  },
};

const LoadingDots = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 0.1);
    }, 100);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="space-y-4">
      {/* Loading Dots */}
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-2">
        <Clock className="h-4 w-4" />
        <span>Generating response... ({elapsedTime.toFixed(1)}s)</span>
      </div>

      <div className="flex space-x-2 mb-4 items-center ">
        <motion.div
          className="w-2 h-2 bg-violet-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <motion.div
          className="w-2 h-2 bg-violet-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 bg-violet-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>

      {/* Shimmer Lines */}
      {[1, 2].map((_, index) => (
        <motion.div
          key={index}
          className="h-4 w-full rounded"
          style={{
            background:
              "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "936px",
          }}
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.1 * index,
          }}
        />
      ))}
    </div>
  );
};

const ResponseSection = ({
  title,
  icon: Icon,
  children,
  className = "",
  expandable = false,
}: any) => {
  const [isExpanded, setIsExpanded] = useState(!expandable);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 backdrop-blur-sm",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 mb-4",
          expandable && "cursor-pointer"
        )}
        onClick={() => expandable && setIsExpanded(!isExpanded)}
      >
        <div className="p-2 rounded-lg bg-gradient-to-tr from-violet-500 to-fuchsia-500">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex-1">
          {title}
        </h2>
        {expandable &&
          (isExpanded ? (
            <ChevronUp className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          ))}
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Message = ({ message, isLast }: any) => {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-end space-y-2 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500 dark:text-slate-400">You</div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="max-w-[80%] bg-gradient-to-tr from-violet-500 to-fuchsia-500 text-white p-4 rounded-xl shadow-lg">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col space-y-2 mb-8"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          CuroAI Assistant
        </div>
      </div>
      <div className=" bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
        {isLast && !message.content ? (
          <LoadingDots />
        ) : (
          renderBotResponse(message.content)
        )}
      </div>
    </motion.div>
  );
};

const processText = (text: string) => {
  // Updated regex to handle hashtags ending with space
  const regex =
    /(\([^)]+\)|\[[^\]]+\]|{[^}]+}|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|#[^ ]+(?= |$)|"[^"]+"|[^()[\]{}#"*`]+)/g;

  const parts = text.match(regex) || [text];

  return parts.map((part, index) => {
    // Check if the part is a special expression
    if (
      (part.startsWith("(") && part.endsWith(")")) ||
      (part.startsWith("[") && part.endsWith("]")) ||
      (part.startsWith("{") && part.endsWith("}")) ||
      (part.startsWith("**") && part.endsWith("**")) ||
      (part.startsWith("*") && part.endsWith("*")) ||
      (part.startsWith("`") && part.endsWith("`")) ||
      part.startsWith("#") || // Changed this condition for hashtags
      (part.startsWith('"') && part.endsWith('"'))
    ) {
      return (
        <span
          key={index}
          className={cn(
            "font-bold",
            part.startsWith("#") ? "text-gray-800" : "text-gray-700"
          )}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

const renderBotResponse = (content: any) => {
  if (!content || typeof content !== "object") return null;

  return (
    <div className="space-y-6">
      <ResponseSection title="Interpretation" icon={Heart}>
        <p className="text-slate-600 dark:text-slate-300">
          {content.interpretation.summary}
        </p>
      </ResponseSection>

      <ResponseSection title="Home Remedies" icon={Shield}>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          {content.home_remedies.detailed_explanation}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.home_remedies.remedies.map((remedy: any, index: any) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl"
            >
              <h3 className="font-medium text-violet-600 dark:text-violet-400 mb-2">
                {remedy.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {remedy.description}
              </p>
            </motion.div>
          ))}
        </div>
      </ResponseSection>

      <ResponseSection title="Precautions" icon={AlertTriangle}>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          {content.precautions.detailed_explanation}
        </p>
        <ul className="space-y-3">
          {content.precautions.precaution_list.map(
            (precaution: any, index: any) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
              >
                <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                <span>{precaution}</span>
              </motion.li>
            )
          )}
        </ul>
      </ResponseSection>

      <ResponseSection
        title="When to See a Doctor"
        icon={Stethoscope}
        expandable={true}
      >
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          {content.when_to_see_doctor.detailed_explanation}
        </p>
        <div className="space-y-4">
          <h3 className="font-medium text-red-500 dark:text-red-400">
            Red Flags:
          </h3>
          <ul className="space-y-3">
            {content.when_to_see_doctor.red_flags.map(
              (flag: any, index: any) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                >
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>{flag}</span>
                </motion.li>
              )
            )}
          </ul>
        </div>
        <div className="space-y-4 pt-4">
          <h3 className="font-medium text-red-500 dark:text-red-400">
            After How Many Days:
          </h3>
          <ul className="space-y-3">
            {content.when_to_see_doctor.after_how_many_days.map(
              (flag: any, index: any) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                >
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>{processText(flag)}</span>
                </motion.li>
              )
            )}
          </ul>
        </div>
      </ResponseSection>

      <ResponseSection title="Medical Departments" icon={Building2}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.relevant_medical_departments.map((dept: any, index: any) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-tr from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800/50 p-4 rounded-xl shadow-sm"
            >
              <h3 className="font-medium text-violet-600 dark:text-violet-400 mb-2">
                {dept.department}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {dept.description}
              </p>
            </motion.div>
          ))}
        </div>
      </ResponseSection>
    </div>
  );
};

const CuroAI = () => {
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    if (newMessages.length > 15) {
      newMessages.splice(0, 6);
      setMessages(newMessages);
    }

    const botMessageIndex = newMessages.length;
    newMessages.push({ role: "bot", content: "" });
    setMessages([...newMessages]);

    try {
      const response = await curoAIResponse(input);
      newMessages[botMessageIndex].content = response;
      setMessages([...newMessages]);
    } catch (error) {
      console.error("Error generating bot response:", error);
      if (newMessages[botMessageIndex]) {
        newMessages[botMessageIndex].content =
          "Error generating bot response. Please try again.";
      }
      setMessages([...newMessages]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              CuroAI
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-24 px-4 max-w-7xl mx-auto">
        <ScrollArea className="h-full">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <Message
                key={index}
                message={message}
                isLast={index === messages.length - 1}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </main>

      {/* Footer Input */}
      <footer className="fixed bottom-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <form onSubmit={onSubmit} className="flex gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your health concern..."
              className="flex-grow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-tr from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white rounded-xl px-6 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-4 bg-gradient-to-tr from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white p-3 rounded-xl shadow-lg transition-all duration-200"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CuroAI;
