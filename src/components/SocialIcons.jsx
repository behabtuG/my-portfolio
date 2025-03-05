// src/components/SocialIcons.jsx
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

const SocialIcons = () => {
  const socialLinks = {
    github: "https://github.com/behabtuG",
    linkedin: "https://www.linkedin.com/in/behabtu-getnet-a4575692/",
    instagram: "https://www.instagram.com/getch_brothers/",
    youtube: "https://www.youtube.com/@habesha168",
  };

  return (
    <div className="fixed left-4 top-3/4 transform -translate-y-1/2 flex flex-col items-center space-y-4 z-40">
      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <FaGithub size={24} />
      </a>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <FaLinkedin size={24} />
      </a>
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <FaInstagram size={24} />
      </a>
      <a
        href={socialLinks.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <FaYoutube size={24} />
      </a>
    </div>
  );
};

export default SocialIcons;
