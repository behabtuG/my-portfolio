"use client";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
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
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        >
          {children}
          <ThemeToggle />
          <ToastContainer />
        </GoogleReCaptchaProvider>
      </body>
    </html>
  );
}
