import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    loading && (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
        <PulseLoader color="#4f46e5" size={15} />
      </div>
    )
  );
};

export default Loading;
