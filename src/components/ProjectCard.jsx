"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ProjectCard = ({ title, description, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full mx-2 md:mx-0">
      <Image
        src={image}
        alt={title}
        width={400}
        height={192} // Matches h-48 (48 * 4px = 192px)
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <AnimatePresence>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: isExpanded ? "auto" : 100 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-700 dark:text-gray-300">
              {isExpanded ? description : `${description.slice(0, 100)}...`}
            </p>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-600 focus:outline-none self-start"
        >
          {isExpanded ? "Read Less" : "Read More →"}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
