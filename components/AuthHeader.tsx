"use client";
import DarkModeToggle from "@/components/DarkModeToggle";
import Logo from "@/components/Logo";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";
import React, { useState } from "react";

const AuthHeader = ({ name }: any) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl z-50 shadow-sm border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Login Dropdown */}
            <div className="hidden md:block">
              <Accordion
                type="single"
                collapsible
                className="w-full border-none"
              >
                <AccordionItem value="login" className="border-none">
                  <AccordionTrigger className="flex items-center px-4 py-2 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors no-underline">
                    <User className="w-4 h-4 mr-2" />
                    <span>Login</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-1">
                    <div className="absolute right-0 w-56 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                      <Link
                        href="/patient-auth"
                        className="block px-6 py-3 text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Patient Login
                      </Link>
                      <Link
                        href="/doctor-auth"
                        className="block px-6 py-3 text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Doctor Login
                      </Link>
                      <Link
                        href="/hospital-auth"
                        className="block px-6 py-3 text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Hospital Login
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Contact
            </Link>

            <div className="pt-4 pb-3 border-t border-slate-200 dark:border-slate-700">
              <div className="px-3 py-2 font-medium text-slate-800 dark:text-slate-100">
                Login Options
              </div>
              <Link
                href="/patient-auth"
                className="block px-3 py-2 rounded-md text-base text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Patient Login
              </Link>
              <Link
                href="/doctor-auth"
                className="block px-3 py-2 rounded-md text-base text-teal-600 dark:text-teal-400 font-medium"
              >
                Doctor Login
              </Link>
              <Link
                href="/hospital-auth"
                className="block px-3 py-2 rounded-md text-base text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Hospital Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthHeader;
