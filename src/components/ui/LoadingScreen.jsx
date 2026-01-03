import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';


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
  const [currentMessage, setCurrentMessage] = useState(funMessages[0]);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoSource, setVideoSource] = useState('webm'); // 'webm', 'mp4', or 'fallback'
  const loadStartTime = useRef(null);
  const hideTimeoutRef = useRef(null);
  const hasStartedExit = useRef(false);

  const handleVideoError = useCallback(() => {
    // Lower-volume log: video may legitimately fail to load in some environments
    console.warn(`Loading screen video failed to load (${videoSource})`);

    // Try MP4 if WebM failed
    if (videoSource === 'webm') {
      setVideoSource('mp4');
      setVideoLoaded(false);
      return;
    }

    // Use fallback animation if MP4 also failed
    if (videoSource === 'mp4') {
      setVideoSource('fallback');
      setVideoLoaded(false);
    }
  }, [videoSource]);

  const handleVideoLoaded = useCallback(() => {
    // onLoaded/onCanPlay sometimes both fire; ensure single state update
    setVideoLoaded(true);
  }, []);

  // Effect for cycling fun messages
  useEffect(() => {
    if (!visible) return;
    
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
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

      if (isLoading) {
      // Show loading screen
      setVisible(true);
      hasStartedExit.current = false;
        // reset message cycle for each new loading session
        setCurrentMessage(funMessages[0]);
      loadStartTime.current = Date.now();
      
      if (video && videoSource !== 'fallback') {
        video.playbackRate = 1.5; // Play slightly faster for snappier feel
        video.loop = true;
        video.play().catch(err => {
          // Autoplay might be blocked in some browsers — log as debug and fallback
          console.debug("Video play failed (autoplay blocked or other):", err);
          handleVideoError();
        });
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

      if (video && videoSource !== 'fallback' && videoLoaded) {
        // STOP LOOPING immediately
        video.loop = false;
        
        // Calculate playback rate for RAPID exit
        const videoDuration = video.duration || 2;
        const currentTime = video.currentTime || 0;
        const timeLeft = videoDuration - currentTime;
        
        // Aggressive speedup - aim to finish in 200-400ms max
        const targetExitTime = Math.min(0.4, Math.max(0.2, remainingTime / 1000));
        const calculatedRate = timeLeft / targetExitTime;
        
        // Speed up video dramatically (4x to 20x)
        video.playbackRate = Math.min(20, Math.max(4, calculatedRate));

        console.log(`Exit speed: ${video.playbackRate.toFixed(1)}x, will finish in ~${(timeLeft / video.playbackRate * 1000).toFixed(0)}ms`);

        // Hide when video ends
        const handleEnded = () => setVisible(false);

        video.addEventListener('ended', handleEnded, { once: true });
        
        // Very short fallback timeout - force hide if video doesn't end quickly
        const maxWaitTime = Math.max(remainingTime, 400); // Max 400ms wait
        hideTimeoutRef.current = setTimeout(() => {
          console.log("Force hiding loading screen (timeout)");
          setVisible(false);
        }, maxWaitTime);

        return () => {
          try {
            video.removeEventListener('ended', handleEnded);
          } catch (e) {
            // ignore removal errors
          }
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
          }
        };
      } else {
        // No video or using fallback - hide almost immediately
        const fallbackDelay = Math.max(remainingTime, 200); // Min 200ms
        hideTimeoutRef.current = setTimeout(() => setVisible(false), fallbackDelay);
        return () => {
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
          }
        };
      }
    }
  }, [isLoading, videoSource, videoLoaded, handleVideoError]);

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
              ? 'inset-0 z-[10000]' 
              : 'left-0 right-0 bottom-0 top-[80px] z-[9998]'
          }`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {videoSource === 'fallback' ? (
            // Fallback animation when both video formats fail
            <div className="w-[300px] max-w-[80%] h-[300px] mb-4 flex items-center justify-center">
              <motion.div 
                className="text-6xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
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
              aria-hidden="true"
            >
              {videoSource === 'webm' ? (
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
            role="status"
            aria-live="polite"
          >
            {currentMessage}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

LoadingScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isInitialLoad: PropTypes.bool,
};

LoadingScreen.defaultProps = {
  isInitialLoad: false,
};

export default LoadingScreen;