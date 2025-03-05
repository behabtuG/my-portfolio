"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback } from "react";
import { FaUser, FaEnvelope, FaComment } from "react-icons/fa";

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Memoized reCAPTCHA execution to prevent unnecessary re-renders
  const handleRecaptcha = useCallback(async () => {
    if (!executeRecaptcha) {
      console.error("reCAPTCHA not initialized");
      return null;
    }
    try {
      const token = await executeRecaptcha("contact_form_submit");
      console.log("reCAPTCHA Token Generated:", token);
      return token;
    } catch (error) {
      console.error("reCAPTCHA Execution Failed:", error);
      return null;
    }
  }, [executeRecaptcha]);

  // Enhanced Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, "Name must be 50 characters or less")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .max(100, "Email must be 100 characters or less")
      .required("Email is required"),
    message: Yup.string()
      .max(500, "Message must be 500 characters or less")
      .required("Message is required"),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const token = await handleRecaptcha();
      if (!token) {
        toast.error("reCAPTCHA verification failed. Please try again.");
        return;
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credential: "true",
          },
          body: JSON.stringify({ ...values, captcha: token }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Message sent successfully to Behabtu!");
          resetForm();
        } else {
          toast.error(data.error || "Failed to send message");
          console.error("API Response Error:", data);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
        console.error("Submission Error:", error.message, error.stack);
      }
    },
  });

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-8 px-6 rounded-lg shadow-xl">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto"
      >
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
          Contact Me
        </h3>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                placeholder="Your Name"
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                placeholder="your.email@example.com"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute top-3 left-3">
                <FaComment className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <textarea
                id="message"
                name="message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 resize-y"
                placeholder="Your message to Behabtu..."
                rows="4"
              />
            </div>
            {formik.touched.message && formik.errors.message && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Sending..." : "Send to Behabtu"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
