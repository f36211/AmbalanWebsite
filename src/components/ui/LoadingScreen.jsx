import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const funMessages = [
  "Memasang tenda... ⛺",
  "Mencari kayu bakar... 🔥",
  "Menyalakan api unggun... 🔥",
  "Menjelajah hutan... 🌳",
  "Mengamati bintang... ✨",
];

const LoadingScreen = ({ isLoading, isInitialLoad = false }) => {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(isLoading);
  const [videoError, setVideoError] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(funMessages[0]);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoSource, setVideoSource] = useState("webm"); // 'webm', 'mp4', or 'fallback'
  const loadStartTime = useRef(null);
  const hideTimeoutRef = useRef(null);
  const hasStartedExit = useRef(false);

  const handleVideoError = () => {
    console.error(`Loading screen video failed to load (${videoSource})`);

    // Try MP4 if WebM failed
    if (videoSource === "webm") {
      console.log("Trying MP4 format...");
      setVideoSource("mp4");
      setVideoLoaded(false);
    }
    // Use fallback animation if MP4 also failed
    else if (videoSource === "mp4") {
      console.log("Using fallback animation...");
      setVideoSource("fallback");
      setVideoError(true);
    }
  };

  const handleVideoLoaded = () => {
    console.log(`Video loaded successfully (${videoSource})`);
    setVideoLoaded(true);
    setVideoError(false);
  };

  // Effect for cycling fun messages
  useEffect(() => {
    if (!visible) return;

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        const currentIndex = funMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % funMessages.length;
        return funMessages[nextIndex];
      });
    }, 2000);

    return () => clearInterval(messageInterval);
  }, [visible]);

  // Main loading logic
  useEffect(() => {
    const video = videoRef.current;

    // Clear any existing hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // Helper: Safely set playback rate with browser limits
    const safeSetPlaybackRate = (rate) => {
      if (!video) return;
      try {
        // Clamp to browser limits (Chrome max is 16x)
        const SAFE_MAX = 16;
        const clampedRate = Math.min(rate, SAFE_MAX);
        video.playbackRate = clampedRate;
        return clampedRate;
      } catch (e) {
        console.warn("Failed to set playback rate:", e);
        // Fallback to safe 1x if specific rate fails
        try {
          video.playbackRate = 1;
        } catch (e) {}
        return 1;
      }
    };

    if (isLoading) {
      // Show loading screen
      setVisible(true);
      hasStartedExit.current = false;
      loadStartTime.current = Date.now();

      if (video && videoSource !== "fallback") {
        safeSetPlaybackRate(1.5); // Using helper
        video.loop = true;

        // Play with robust error handling
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.error("Video play failed:", err);
            handleVideoError();
          });
        }
      }
    } else {
      // Prevent multiple exit sequences
      if (hasStartedExit.current) return;
      hasStartedExit.current = true;

      // Loading complete - start exit sequence
      const loadDuration = loadStartTime.current
        ? Date.now() - loadStartTime.current
        : 0;

      // Very short minimum display time for faster perceived load
      const minDisplayTime = 300; // Just 300ms minimum
      const remainingTime = Math.max(0, minDisplayTime - loadDuration);

      if (video && videoSource !== "fallback" && videoLoaded) {
        // STOP LOOPING immediately
        video.loop = false;

        // Calculate playback rate for RAPID exit
        const videoDuration = video.duration || 2;
        const currentTime = video.currentTime || 0;
        const timeLeft = Math.max(0, videoDuration - currentTime); // Ensure positive

        // Aggressive speedup - aim to finish in 200-400ms max
        const targetExitTime = Math.min(
          0.4,
          Math.max(0.2, remainingTime / 1000),
        );

        // Avoid division by zero
        const calculatedRate =
          targetExitTime > 0 ? timeLeft / targetExitTime : 16;

        // Speed up video dramatically (4x to 16x max for Chrome safety)
        const intendedRate = Math.max(4, calculatedRate);
        const actualRate = safeSetPlaybackRate(intendedRate);

        console.log(
          `Exit speed: ${actualRate.toFixed(1)}x, will finish in ~${((timeLeft / actualRate) * 1000).toFixed(0)}ms`,
        );

        // Hide when video ends
        const handleEnded = () => {
          // Check if component is still mounted/relevant before update
          if (hasStartedExit.current) {
            setVisible(false);
          }
        };

        // Use 'once' listener to cleanup automatically
        video.addEventListener("ended", handleEnded, { once: true });

        // Check if video already ended (edge case)
        if (video.ended) {
          handleEnded();
        }

        // Very short fallback timeout - force hide if video doesn't end quickly
        // Increased slightly to account for slower playback fallback
        const maxWaitTime = Math.max(remainingTime, 600);
        hideTimeoutRef.current = setTimeout(() => {
          console.log("Force hiding loading screen (timeout)");
          setVisible(false);
          // Explicitly remove listener to be safe
          video.removeEventListener("ended", handleEnded);
        }, maxWaitTime);

        return () => {
          video.removeEventListener("ended", handleEnded);
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
          }
        };
      } else {
        // No video or using fallback - hide almost immediately
        const fallbackDelay = Math.max(remainingTime, 200); // Min 200ms
        hideTimeoutRef.current = setTimeout(() => {
          setVisible(false);
        }, fallbackDelay);

        return () => {
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
          }
        };
      }
    }
  }, [isLoading, videoSource, videoLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed flex flex-col items-center justify-center bg-white ${
            isInitialLoad
              ? "inset-0 z-[10000]"
              : "left-0 right-0 bottom-0 top-[80px] z-[9998]"
          }`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {videoSource === "fallback" ? (
            // Fallback animation when both video formats fail
            <div className="w-[300px] max-w-[80%] h-[300px] mb-4 flex items-center justify-center">
              <motion.div
                className="text-6xl"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ⛺
              </motion.div>
            </div>
          ) : (
            // Video element - will try webm first, then mp4
            <video
              ref={videoRef}
              autoPlay
              loop={isLoading} // Only loop while loading
              muted
              playsInline
              className="w-[300px] max-w-[80%] h-auto mb-4"
              onError={handleVideoError}
              onLoadedData={handleVideoLoaded}
              onCanPlay={handleVideoLoaded}
              key={videoSource} // Force re-render when source changes
            >
              {videoSource === "webm" ? (
                <source src="/walking.webm" type="video/webm" />
              ) : (
                <source src="/walking.mp4" type="video/mp4" />
              )}
            </video>
          )}

          <motion.p
            className="text-[#555] font-sans text-lg font-bold tracking-wider"
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentMessage}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
