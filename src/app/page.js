"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaLaptopCode,
  FaJava,
  FaAndroid,
  FaGithub,
  FaDocker,
} from "react-icons/fa";
import BlogCard from "@/components/BlogCard";
import SocialIcons from "@/components/SocialIcons";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      title: "Personal Blogs",
      description:
        "A blog platform hosted on Vercel, built with React.js and Express.js , sharing insights on software development, ERP systems, and real-time data solutions.",
      image: "/images/my-blog.png",
      link: "https://behabtu-blogs.vercel.app/",
    },
    {
      title: "Personal Portfolio",
      description:
        "My professional portfolio showcasing my projects and skills, developed with Next.js and deployed on Vercel and you can contact me on it.",
      image: "/images/my-portfolio.png",
      link: "https://github.com/behabtuG/my-portfolio",
    },
    {
      title: "Internet Banking System",
      description:
        "A secure and scalable internet banking platform developed with Next.js and Express.js, integrating modern banking features such as real-time transaction processing, user authentication, and API-driven financial services.",
      image: "/images/internetBanking.png",
      link: "#",
    },
    {
      title: "Amhara Bank Project Management System",
      description:
        "A full-stack MERN application to manage projects, built with React, Node.js, Express.js, and MongoDB for Amhara Bank’s Project Management Office, featuring task tracking, team collaboration, and reporting dashboards.",
      image: "/images/pms.png",
      link: "#",
    },
    {
      title: "Ethiopian Ministry of Revenue E-Invoice System",
      description:
        "An electronic invoicing system built with Spring Boot, React.js, Kafka, and MongoDB to streamline revenue processes, enabling real-time data processing and integration with national tax systems.",
      image: "/images/E-invoice.jpeg",
      link: "#",
    },
    {
      title: "Ministry of Foreign Affairs HRM System",
      description:
        "A human resource management system built with Java EE and Oracle Database, supervised and led by me, featuring employee records, leave management, and payroll integration.",
      image: "/images/leave-request.png",
      link: "#",
    },
    {
      title: "Ethiopian Electric Power ERP System",
      description:
        "An enterprise resource planning system developed with Java EE and Oracle Database for efficient power management, including modules for asset management, billing, and workforce scheduling.",
      image: "/images/eep-erp.png",
      link: "#",
    },
  ];

  const blogs = [
    {
      title: "Scaling ERP Systems with Java EE",
      description:
        "Insights from building the Ethiopian Electric Power ERP system using Java EE and Oracle Database, focusing on scalability, modular design, and performance optimization.",
      image: "/images/Scalability.jpg",
      link: "https://behabtu-blogs.vercel.app/",
      date: "March 04, 2025",
    },
    {
      title: "Real-Time Data with Kafka in E-Invoicing",
      description:
        "How Kafka enhances performance in the Ethiopian Ministry of Revenue’s Electronic Invoice system, with examples of event-driven architecture and data streaming.",
      image: "/images/kafka-use-case.png",
      link: "https://behabtu-blogs.vercel.app/",
      date: "January 15, 2025",
    },
    {
      title: "Next.js for Internet Banking",
      description:
        "Building a robust internet banking platform with Next.js and Express.js at Amhara Bank, leveraging server-side rendering and API routes for security and speed.",
      image: "/images/next-js-scheme.png",
      link: "https://behabtu-blogs.vercel.app/",
      date: "December 20, 2024",
    },
  ];

  const testimonials = [
    {
      text: "Behabtu’s expertise in MERN stack and project management transformed our PMO system at Amhara Bank!",
      name: "Abebe Alemu, PMO Lead at Amhara Bank",
    },
    {
      text: "His leadership in the HRM system at the Ministry of Foreign Affairs was outstanding.",
      name: "Mulugeta Tesfaye, Project Supervisor",
    },
    {
      text: "The e-invoicing system he built for the Ministry of Revenue has significantly improved efficiency.",
      name: "Selamawit Abebe, Ministry of Revenue",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      {isLoading && <Loading />}
      <Navbar />
      <main className="pt-20">
        <SocialIcons />
        <section
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-24 text-center"
          id="hero"
        >
          <div className="container mx-auto px-6">
            <motion.h1
              className="text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hi, I'm{" "}
              <span className="text-yellow-300">Behabtu Getnet Walle</span>
            </motion.h1>
            <motion.p
              className="text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Software Engineer at Amhara Bank | Full-Stack Developer | ERP &
              Banking Systems Expert
            </motion.p>
            <a href="#contact">
              <motion.button
                className="mt-6 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
                whileHover={{ scale: 1.1 }}
              >
                Get in Touch
              </motion.button>
            </a>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16" id="about">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            🚀 About Me
          </h2>
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              I&apos;m{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Behabtu Getnet Walle
              </span>
              , a <span className="font-bold">Software Engineer</span> at Amhara
              Bank
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              With <span className="font-semibold">8 years of experience</span>{" "}
              in full-stack development, I specialize in{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                MERN stack, Next.js, Java EE, Spring Boot,
              </span>{" "}
              and DevOps tools like{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Docker and Kafka
              </span>
              . I hold a Bachelor&apos;s in{" "}
              <span className="font-semibold">
                Electrical and Computer Engineering
              </span>{" "}
              from Hawassa University and have contributed to impactful projects
              like{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                ERP systems for Ethiopian Electric Power, HRM systems for the
                Ministry of Foreign Affairs, and e-invoicing for the Ethiopian
                Ministry of Revenue
              </span>
              .
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[minmax(400px,_auto)] mt-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex"
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </section>
        <section className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            📚 Latest Blog Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <BlogCard {...blog} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="https://behabtu-blogs.vercel.app/"
              className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              View All Posts
            </a>
          </div>
        </section>
        <section className="bg-gray-200 dark:bg-gray-800 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
              💡 My Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <motion.div
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FaReact size={40} className="text-blue-500 mx-auto" />
                <h3 className="font-semibold text-lg mt-3 dark:text-gray-200">
                  React.js
                </h3>
              </motion.div>
              <motion.div
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FaNodeJs size={40} className="text-green-500 mx-auto" />
                <h3 className="font-semibold text-lg mt-3 dark:text-gray-200">
                  Node.js
                </h3>
              </motion.div>
              <motion.div
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FaDatabase
                  size={40}
                  className="text-gray-700 dark:text-gray-300 mx-auto"
                />
                <h3 className="font-semibold text-lg mt-3 dark:text-gray-200">
                  MongoDB
                </h3>
              </motion.div>
              <motion.div
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FaJava size={40} className="text-orange-500 mx-auto" />
                <h3 className="font-semibold text-lg mt-3 dark:text-gray-200">
                  Java
                </h3>
              </motion.div>
              <motion.div
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FaLaptopCode size={40} className="text-purple-500 mx-auto" />
                <h3 className="font-semibold text-lg mt-3 dark:text-gray-200">
                  Spring Boot
                </h3>
              </motion.div>
              <motion.div
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FaAndroid size={40} className="text-green-600 mx-auto" />
                <h3 className="font-semibold text-lg mt-3 dark:text-gray-200">
                  Flutter
                </h3>
              </motion.div>
              <motion.div
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FaDocker size={40} className="text-blue-600 mx-auto" />
                <h3 className="font-semibold text-lg mt-3 dark:text-gray-200">
                  DevOps
                </h3>
              </motion.div>
              <motion.div
                className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FaGithub
                  size={40}
                  className="text-black dark:text-white mx-auto"
                />
                <h3 className="font-semibold text-lg mt-3 dark:text-gray-200">
                  Next.js
                </h3>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            🌟 Testimonials
          </h2>
          <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 italic">
              &quot;{testimonials[currentTestimonial].text}&quot;
            </p>
            <p className="mt-4 font-semibold text-gray-800 dark:text-gray-200">
              – {testimonials[currentTestimonial].name}
            </p>
          </div>
        </section>
        <section className="bg-indigo-600 text-white py-10" id="contact">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              📬 Let's Connect
            </h2>
            <p className="text-lg text-center max-w-xl mx-auto mb-6">
              Interested in collaborating on innovative projects? Reach out via
              the form or email!
            </p>
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
            <div className="text-center mt-4">
              <a
                href="mailto:behabtu.getnet@gmail.com"
                className="text-yellow-300 hover:underline"
              >
                behabtu.getnet@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
