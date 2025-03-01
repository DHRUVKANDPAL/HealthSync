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
  Clock,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  RefreshCw,
  XCircle,
  Info,
  Database,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { curoAIResponse, curoFlash } from "@/lib/gemini";
import SidebarComponent from "./Sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import MDEditor from "@uiw/react-md-editor";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
      {/* Loading Indicator */}
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-2">
        <Clock className="h-4 w-4 animate-pulse" />
        <span>Generating response... ({elapsedTime.toFixed(1)}s)</span>
      </div>

      <div className="flex space-x-2 mb-4 items-center">
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
      {[1, 2, 3].map((_, index) => (
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
  iconBgClass = "bg-gradient-to-tr from-violet-500 to-fuchsia-500",
}: any) => {
  const [isExpanded, setIsExpanded] = useState(!expandable);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "flex items-center gap-3 mb-4 group",
          expandable && "cursor-pointer"
        )}
        onClick={() => expandable && setIsExpanded(!isExpanded)}
      >
        <motion.div
          className={`p-2 rounded-lg ${iconBgClass}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="h-5 w-5 text-white" />
        </motion.div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {title}
        </h2>
        {expandable && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
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
  const [liked, setLiked] = useState(false);

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-end space-y-2 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500 dark:text-slate-400">You</div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="max-w-[80%] bg-gradient-to-tr from-blue-500 to-indigo-600 text-white p-4 rounded-xl shadow-lg">
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
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-md">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span>CuroAI Assistant</span>
          <Badge
            variant="outline"
            className="bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 border-violet-200 dark:border-violet-800"
          >
            Health Expert
          </Badge>
        </div>
      </div>
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 relative group">
        {isLast && !message.content ? (
          <LoadingDots />
        ) : (
          <>
            {renderBotResponse(message.content)}
            <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                className={cn(
                  "rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700",
                  liked && "text-green-500"
                )}
                onClick={() => setLiked(!liked)}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
            </div>
          </>
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
      <ResponseSection
        title="Interpretation"
        icon={Heart}
        iconBgClass="bg-gradient-to-tr from-pink-500 to-rose-500"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {content.interpretation.summary}
        </p>
      </ResponseSection>

      <ResponseSection
        title="Home Remedies"
        icon={Shield}
        iconBgClass="bg-gradient-to-tr from-green-500 to-emerald-600"
      >
        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          {content.home_remedies.detailed_explanation}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.home_remedies.remedies.map((remedy: any, index: any) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/80 transition-all duration-300"
            >
              <h3 className="font-medium text-violet-600 dark:text-violet-400 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                {remedy.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {remedy.description}
              </p>
            </motion.div>
          ))}
        </div>
      </ResponseSection>

      <ResponseSection
        title="Precautions"
        icon={AlertTriangle}
        iconBgClass="bg-gradient-to-tr from-amber-500 to-yellow-500"
      >
        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
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
                <div className="h-5 w-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                </div>
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
        iconBgClass="bg-gradient-to-tr from-red-500 to-rose-600"
      >
        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          {content.when_to_see_doctor.detailed_explanation}
        </p>
        <div className="space-y-4">
          <h3 className="font-medium text-red-500 dark:text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
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
                  className="flex items-start gap-3 text-slate-600 dark:text-slate-300 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg"
                >
                  <div className="h-5 w-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  </div>
                  <span>{flag}</span>
                </motion.li>
              )
            )}
          </ul>
        </div>
        <div className="space-y-4 pt-4">
          <h3 className="font-medium text-red-500 dark:text-red-400 flex items-center gap-2">
            <Clock className="h-4 w-4" />
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
                  <div className="h-5 w-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  </div>
                  <span>{processText(flag)}</span>
                </motion.li>
              )
            )}
          </ul>
        </div>
      </ResponseSection>

      <ResponseSection
        title="Medical Departments"
        icon={Building2}
        iconBgClass="bg-gradient-to-tr from-blue-500 to-indigo-600"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.relevant_medical_departments.map((dept: any, index: any) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-gradient-to-tr from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800/50 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/80 transition-all duration-300"
            >
              <h3 className="font-medium text-violet-600 dark:text-violet-400 mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
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
const FlashLoadingResponse = ({ thinkingTime }: { thinkingTime: number }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-2">
        <Clock className="h-4 w-4 animate-pulse" />
        <span>Processing your question... ({thinkingTime.toFixed(1)}s)</span>
      </div>

      <div className="flex space-x-2 mb-4 items-center">
        <motion.div
          className="w-2 h-2 bg-blue-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <motion.div
          className="w-2 h-2 bg-blue-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 bg-blue-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>

      {Array.from({ length: 3 }).map((_, index) => (
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

type ModelType = "curo-beat" | "curo-flash";
const CuroAI = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelType>("curo-beat");
  const inputRef = useRef<HTMLInputElement>(null);
  const [thinkingTime, setThinkingTime] = useState(0);
  const [typingAnimation, setTypingAnimation] = useState(false);

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

  const focusInput = () => {
    inputRef.current?.focus();
  };

  let thinkingTimer: NodeJS.Timeout;

  const startThinkingTimer = () => {
    setThinkingTime(0);
    thinkingTimer = setInterval(() => {
      setThinkingTime((prev) => prev + 0.1);
    }, 100);
  };

  const stopThinkingTimer = () => {
    clearInterval(thinkingTimer);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);
    startThinkingTimer();

    if (newMessages.length > 15) {
      newMessages.splice(0, 6);
      setMessages(newMessages);
    }

    const botMessageIndex = newMessages.length;
    newMessages.push({ role: "bot", content: "" });
    setMessages([...newMessages]);

    try {
      const response = await curoAIResponse(input);
      stopThinkingTimer();
      newMessages[botMessageIndex].content = response;
      setMessages([...newMessages]);
    } catch (error) {
      console.error("Error generating bot response:", error);
      stopThinkingTimer();
      if (newMessages[botMessageIndex]) {
        newMessages[botMessageIndex].content =
          "Sorry, I couldn't process your request. Please try again later.";
      }
      setMessages([...newMessages]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const flashSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);
    startThinkingTimer();
    setTypingAnimation(true);

    if (newMessages.length > 15) {
      newMessages.splice(0, 6);
      setMessages(newMessages);
    }

    const botMessageIndex = newMessages.length;
    newMessages.push({ role: "bot", content: "" });
    setMessages([...newMessages]);

    try {
      const response = await curoFlash(input, messages);
      stopThinkingTimer();
      setTypingAnimation(false);
      newMessages[botMessageIndex].content = response;
      setMessages([...newMessages]);
    } catch (error) {
      console.error("Error generating bot response:", error);
      stopThinkingTimer();
      setTypingAnimation(false);
      if (newMessages[botMessageIndex]) {
        newMessages[botMessageIndex].content =
          "Sorry, I couldn't process your request. Please try again later.";
      }
      setMessages([...newMessages]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Sidebar */}
      <SidebarComponent
        setSelectedModel={setSelectedModel}
        selectedModel={selectedModel}
      />

      {/* Main Content - With Left Padding for Sidebar on Desktop */}
      <div className="lg:pl-72 transition-all duration-300">
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 lg:left-72 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl z-40 border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-2 rounded-lg shadow-md"
              >
                <Stethoscope className="h-6 w-6 text-white" />
              </motion.div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent lg:ml-0">
                CuroAI Health Assistant
              </h1>
            </div>

            {/* Controls and Model info */}
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-9 w-9 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                      onClick={clearConversation}
                    >
                      <RefreshCw className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Clear conversation</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30 text-sm font-medium text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/50 shadow-sm flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {selectedModel === "curo-beat" ? "Curo Beat" : "Curo Flash"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Chat Area */}
        {selectedModel === "curo-beat" ? (
          <main className="max-w-5xl mx-auto px-4 md:px-6 pt-24 pb-32">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center mb-8 shadow-lg"
                >
                  <Bot className="h-12 w-12 text-white" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  Welcome to CuroAI Health Assistant
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-xl mb-8 leading-relaxed">
                  Describe your health concerns, symptoms, or questions, and
                  I'll provide personalized guidance, home remedies, and
                  professional advice.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
                  {[
                    "I have a persistent headache for 3 days",
                    "What should I do for a mild fever?",
                    "I'm experiencing lower back pain",
                    "How can I manage seasonal allergies?",
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 py-6 px-4 text-left relative overflow-hidden group"
                      onClick={() => {
                        setInput(suggestion);
                        // Auto submit after a short delay
                        setTimeout(() => {
                          const form = document.getElementById("chat-form");
                          if (form) {
                            form.dispatchEvent(
                              new Event("submit", {
                                cancelable: true,
                                bubbles: true,
                              })
                            );
                          }
                        }, 500);
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5 transition-all duration-300"></div>
                      <div className="truncate">{suggestion}</div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.length > 0 && (
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    message={message}
                    isLast={index === messages.length - 1}
                    loading={loading && index === messages.length - 1}
                    thinkingTime={thinkingTime}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </main>
        ) : (
          // CuroFlash View - Enhanced
          <div className="max-w-5xl mx-auto pt-24 pb-32 px-4 md:px-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center mb-8 shadow-lg"
                >
                  <Database className="h-12 w-12 text-white" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  CuroFlash - Fast Response Mode
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-xl mb-8 leading-relaxed">
                  Get quick answers to your health questions with Curo Flash.
                  This mode provides streamlined responses for fast reference.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
                  {[
                    "What are the symptoms of dehydration?",
                    "How can I tell if I have a cold or flu?",
                    "Quick remedies for heartburn",
                    "Signs of high blood pressure",
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 py-6 px-4 text-left relative overflow-hidden group"
                      onClick={() => {
                        setInput(suggestion);
                        setTimeout(() => {
                          const form = document.getElementById("chat-form");
                          if (form) {
                            form.dispatchEvent(
                              new Event("submit", {
                                cancelable: true,
                                bubbles: true,
                              })
                            );
                          }
                        }, 500);
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300"></div>
                      <div className="truncate">{suggestion}</div>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-slate-200 dark:border-slate-700 shadow-lg">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Flash Mode
                    </Badge>
                    {messages.length > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {messages.length / 2} exchanges
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ScrollArea className="h-[calc(100vh-250px)] pr-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-6 flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {message.role === "bot" && (
                          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 shadow-md">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl p-4 shadow-md ${
                            message.role === "user"
                              ? "bg-gradient-to-tr from-blue-500 to-indigo-600 text-white"
                              : "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-600"
                          }`}
                        >
                          {message.role === "user" ? (
                            <div>{message.content}</div>
                          ) : loading && index === messages.length - 1 ? (
                            <FlashLoadingResponse thinkingTime={thinkingTime} />
                          ) : (
                            <MDEditor.Markdown
                              source={message.content}
                              style={{ background: "transparent" }}
                              className="prose dark:prose-invert max-w-none"
                            />
                          )}
                        </div>
                        {message.role === "user" && (
                          <div className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-md">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-72 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 z-40 shadow-lg">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
            <form
              id="chat-form"
              onSubmit={selectedModel === "curo-beat" ? onSubmit : flashSubmit}
              className="flex items-center gap-2 relative"
            >
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`${
                    selectedModel === "curo-beat"
                      ? "Describe your symptoms or health concerns..."
                      : "Ask a quick health question..."
                  }`}
                  className="flex-1 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-violet-500 pl-4 pr-12 py-6 shadow-sm rounded-xl"
                  disabled={loading}
                />
                {input.trim() !== "" && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-1 h-7 w-7"
                    onClick={() => setInput("")}
                  >
                    <XCircle className="h-4 w-4 text-slate-400" />
                  </Button>
                )}
              </div>
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className={`${
                  selectedModel === "curo-beat"
                    ? "bg-gradient-to-tr from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600"
                    : "bg-gradient-to-tr from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                } rounded-xl py-6 px-6 shadow-md transition-all duration-300`}
              >
                {loading ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </form>
            <div className="text-xs text-center mt-2 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              <Info className="h-3 w-3" />
              CuroAI provides general health information. Always consult a
              healthcare professional for medical advice.
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`fixed bottom-20 right-4 p-3 rounded-full ${
                selectedModel === "curo-beat"
                  ? "bg-violet-500 hover:bg-violet-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white shadow-lg z-50 transition-all duration-300`}
              onClick={scrollToTop}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CuroAI;
