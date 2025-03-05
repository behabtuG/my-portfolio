import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectCard = ({ title, description, image, link }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      {" "}
      <img src={image} alt={title} className="w-full object-cover" />{" "}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <AnimatePresence>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: isExpanded ? "auto" : 100 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-700">
              {isExpanded ? description : `${description.slice(0, 100)}...`}
            </p>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
        >
          {isExpanded ? "Read Less" : "Read More →"}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
