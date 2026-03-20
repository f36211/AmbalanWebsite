import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const funMessages = [
  "Memasang tenda... ⛺",
  "Mencari kayu bakar... 🔥",
  "Menyalakan api unggun... 🔥",
  "Menjelajah hutan... 🌳",
  "Mengamati bintang... ✨",
];

const LoadingScreen = ({ isLoading, isInitialLoad = false }) => {
  const [currentMessage, setCurrentMessage] = useState(funMessages[0]);

  // Effect for cycling fun messages
  useEffect(() => {
    if (!isLoading) return;

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        const currentIndex = funMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % funMessages.length;
        return funMessages[nextIndex];
      });
    }, 2000);

    return () => clearInterval(messageInterval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={`fixed flex flex-col items-center justify-center bg-white ${
            isInitialLoad
              ? "inset-0 z-[10000]"
              : "left-0 right-0 bottom-0 top-[80px] z-[9998]"
          }`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Restored Native HTML5 Video Loader */}
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-[300px] max-w-[80%] h-auto mb-4 pointer-events-none"
          >
            <source src="/walking.webm" type="video/webm" />
            <source src="/walking.mp4" type="video/mp4" />
          </video>

          <motion.p
            className="text-[#555] font-sans text-lg font-bold tracking-wider"
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentMessage}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
