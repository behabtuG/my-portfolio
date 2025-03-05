import { FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const BlogCard = ({ title, description, image, link, date }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }} // Added whileHover
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
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
        <div className="mt-4 flex items-center text-gray-500 dark:text-gray-400">
          <FaCalendarAlt className="mr-2" />
          <span>{date}</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-600"
        >
          {isExpanded ? "Read Less" : "Read More →"}
        </button>
      </div>
    </motion.div>
  );
};

export default BlogCard;
