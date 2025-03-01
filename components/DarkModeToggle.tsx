"use client";
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

type ThemeMode = "light" | "dark" | "system";

const DarkModeToggle: React.FC = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem("themeMode") as ThemeMode | null;

    if (savedTheme) {
      setThemeMode(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to system preference if no saved theme
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setThemeMode("system");
      applyTheme(systemPrefersDark ? "dark" : "light");
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeMode === "system") {
        applyTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode]);

  // Apply theme to document
  const applyTheme = (mode: ThemeMode | "light" | "dark") => {
    const isDark =
      mode === "dark" ||
      (mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Change theme and save to localStorage
  const changeTheme = (newMode: ThemeMode) => {
    setThemeMode(newMode);
    localStorage.setItem("themeMode", newMode);
    applyTheme(newMode);
    setIsOpen(false);
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
        aria-expanded={isOpen}
        aria-label="Theme settings"
      >
        {themeMode === "light" && <FaSun className="w-4 h-4 text-yellow-500" />}
        {themeMode === "dark" && <FaMoon className="w-4 h-4 text-blue-400" />}
        {themeMode === "system" && (
          <FaDesktop className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10 transform origin-top-right transition-transform duration-200 ease-in-out">
          <div className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
            Theme Settings
          </div>

          <button
            onClick={() => changeTheme("light")}
            className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
              themeMode === "light"
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            <FaSun className="w-4 h-4 mr-3 text-yellow-500" />
            Light
            {themeMode === "light" && (
              <span className="ml-auto text-blue-600 dark:text-blue-400">
                ✓
              </span>
            )}
          </button>

          <button
            onClick={() => changeTheme("dark")}
            className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
              themeMode === "dark"
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            <FaMoon className="w-4 h-4 mr-3 text-blue-500" />
            Dark
            {themeMode === "dark" && (
              <span className="ml-auto text-blue-600 dark:text-blue-400">
                ✓
              </span>
            )}
          </button>

          <button
            onClick={() => changeTheme("system")}
            className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
              themeMode === "system"
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            <FaDesktop className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
            System
            {themeMode === "system" && (
              <span className="ml-auto text-blue-600 dark:text-blue-400">
                ✓
              </span>
            )}
          </button>
        </div>
      )}

      {/* Backdrop to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default DarkModeToggle;
