"use client";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useThemeStore from "@/store/themeStore";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export default function RootLayout({ children }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <html lang="en">
      <body>
        {children}
        <ThemeToggle />
        <ToastContainer />
      </body>
    </html>
  );
}
