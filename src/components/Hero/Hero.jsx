import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Instagram, Youtube, Music2 } from "lucide-react";

// Floating particles component
const FloatingParticles = () => {
  // Reduce particle count for mobile performance
  const particleCount = window.innerWidth < 768 ? 10 : 20;
  const [particles] = useState(() =>
    Array.from({ length: particleCount }, (_, i) => i)
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-2 h-2 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            y: [null, -100, -200],
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// Full Page Modal Component with animation starting from the clicked logo
const LogoModal = ({ isOpen, onClose, logoData, clickedLogoType }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full page modal background that expands from the actual logo position */}
          <motion.div
            initial={{
              clipPath:
                clickedLogoType === "putra"
                  ? "circle(0% at 10% 50%)" // Start from far left logo position (L2 is putra)
                  : "circle(0% at 90% 50%)", // Start from far right logo position (L3 is putri)
            }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{
              clipPath:
                clickedLogoType === "putra"
                  ? "circle(0% at 10% 50%)" // Return to far left logo position (L2 is putra)
                  : "circle(0% at 90% 50%)", // Return to far right logo position (L3 is putri)
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="fixed inset-0 z-[60] bg-white"
          >
            {/* Background image covering the entire modal */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("${
                  logoData?.imageUrl || "/images/landing/background.png"
                }")`,
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Animated Background Layers Component
const AnimatedBackground = ({ backgroundOpacity }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Disable parallax on mobile for better performance
  const isMobile = window.innerWidth < 768;
  const effectiveY = isMobile ? "0%" : y;
  const effectiveOpacity = isMobile ? 1 : opacity;

  return (
    <div className="absolute inset-0">
      {/* Main background with parallax */}
      <motion.div
        style={{ y: effectiveY, opacity: effectiveOpacity }}
        className={`absolute inset-0 transition-opacity duration-2000 ease-in-out`}
        animate={{ opacity: backgroundOpacity / 100 }}
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("/images/landing/background.png")` }}
        />

        {/* Center lights - FIXED POSITIONING: Always centered, behind group */}
        <motion.img
          src="/images/landing/centerlight.png"
          alt="center light"
          className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-40 left-1/2 -translate-x-1/2 z-20 w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] h-auto"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.img
          src="/images/landing/centerlight2.png"
          alt="center light 2"
          className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-40 left-1/2 -translate-x-1/2 z-20 w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] h-auto"
          animate={{
            scale: [1.05, 1, 1.05],
            opacity: [0.9, 0.7, 0.9],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Red background overlay */}
        <motion.div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("/images/landing/redbg.png")` }}
          animate={{ opacity: [0.7, 0.5, 0.7] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Side lights with gentle sway */}
        <motion.img
          src="/images/landing/anotherlight.png"
          alt="left light"
          className="absolute left-0 top-0 h-full"
          animate={{ opacity: [0.7, 0.5, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src="/images/landing/anotherlight2.png"
          alt="right light"
          className="absolute right-0 top-0 h-full"
          animate={{ opacity: [0.7, 0.5, 0.7] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </div>
  );
};

// The main Hero component
const Hero = ({ onModalStateChange }) => {
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [clickedLogoType, setClickedLogoType] = useState(null);
  const containerRef = useRef(null);
  const [screenSize, setScreenSize] = useState('desktop');

  const logoData = {
    putri: {
      title: "Logo Scout Putri",
      description: "Simbolisme dan makna logo Pramuka untuk anggota putri",
      imageUrl: "/images/landing/putri.png",
    },
    putra: {
      title: "Logo Scout Putra",
      description: "Simbolisme dan makna logo Pramuka untuk anggota putra",
      imageUrl: "/images/landing/putra.png",
    },
  };

  const handleLogoClick = (logoType) => {
    if (screenSize === 'mobile') return;

    if (activeModal === logoType) {
      setActiveModal(null);
      setClickedLogoType(null);
    } else {
      setClickedLogoType(logoType);
      setActiveModal(logoType);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setClickedLogoType(null);
  };

  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(activeModal !== null);
    }
  }, [activeModal, onModalStateChange]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      setBackgroundOpacity(100);
    }, 1000);

    const handleScroll = () => {
      if (activeModal) {
        closeModal();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeModal]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 0.5,
      },
    },
  };

  // Responsive logo sizes
  const getLogoSize = () => {
    switch (screenSize) {
      case 'mobile':
        return "w-14 h-14";
      case 'tablet':
        return "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32";
      default:
        return "w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40";
    }
  };

  return (
    <motion.section
      ref={containerRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24"
    >
      <FloatingParticles />
      <AnimatedBackground backgroundOpacity={backgroundOpacity} />

      {/* Bottom paper - positioned above center lights */}
      <motion.img
        src="/images/landing/kertasbawah.png"
        alt="bottom paper"
        className="absolute bottom-0 left-0 w-full z-30 object-cover"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />

      {/* Group of people - highest z-index to be in front of lights */}
      <motion.img
        src="/images/landing/Groupsorang.png"
        alt="group of people"
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full z-40 object-contain ${
          screenSize === 'mobile' 
            ? "max-w-6xl mb-15" 
            : screenSize === 'tablet'
            ? "max-w-5xl sm:max-w-6xl"
            : "max-w-4xl sm:max-w-4xl md:max-w-5xl"
        }`}
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ 
          y: 0, 
          opacity: 1, 
          scale: screenSize === 'mobile' ? 1.6 : screenSize === 'tablet' ? 1.4 : 1.2 
        }}
        transition={{ delay: 1.2, duration: 1.2, type: "spring", damping: 20 }}
        style={{
          filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.3))",
        }}
      />

      {/* Desktop and Tablet Logo positioning */}
      {screenSize !== 'mobile' && (
        <motion.div
          variants={itemVariants}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-[80]"
        >
          <div className={`flex justify-between items-center w-full relative ${
            screenSize === 'tablet' ? 'px-6 sm:px-8' : 'px-4 sm:px-8 lg:px-16'
          }`}>
            <motion.img
              src="/images/logo/L2.png"
              alt="Scout Logo Putra"
              className={`${getLogoSize()} drop-shadow-2xl cursor-pointer relative`}
              variants={logoVariants}
              animate={{
                opacity: activeModal === "putra" ? 1 : activeModal ? 0.3 : 1,
                scale: activeModal === "putra" ? 1.9 : activeModal ? 0.7 : 1,
                y: activeModal === "putra" ? 15 : 0,
                x: activeModal === "putra" ? (screenSize === 'tablet' ? 30 : 50) : 0,
                rotate: 0,
              }}
              whileHover={
                !activeModal
                  ? {
                      scale: screenSize === 'tablet' ? 1.15 : 1.2,
                      rotate: -10,
                      y: -10,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        damping: 10,
                        stiffness: 300,
                      },
                    }
                  : activeModal === "putra"
                  ? {
                      scale: screenSize === 'tablet' ? 1.75 : 1.85,
                      y: -2,
                      rotate: 0,
                      opacity: 1,
                      transition: { duration: 0.2 },
                    }
                  : {
                      opacity: 0.8,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }
              }
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogoClick("putra")}
              transition={{
                opacity: { duration: 0.2, ease: "easeOut" },
                scale: { duration: 0.2, ease: "easeOut" },
                y: { duration: 0.2, ease: "easeOut" },
                rotate: { duration: 0.2, ease: "easeOut" },
              }}
              style={{
                filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4))",
              }}
            />

            <motion.img
              src="/images/logo/L3.png"
              alt="Scout Logo Putri"
              className={`${getLogoSize()} drop-shadow-2xl cursor-pointer relative`}
              variants={logoVariants}
              animate={{
                opacity: activeModal === "putri" ? 1 : activeModal ? 0.3 : 1,
                scale: activeModal === "putri" ? 1.9 : activeModal ? 0.7 : 1,
                y: activeModal === "putri" ? 15 : 0,
                x: activeModal === "putri" ? (screenSize === 'tablet' ? -60 : -80) : 0,
                rotate: 0,
              }}
              whileHover={
                !activeModal
                  ? {
                      scale: screenSize === 'tablet' ? 1.15 : 1.2,
                      rotate: 10,
                      y: -10,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        damping: 10,
                        stiffness: 300,
                      },
                    }
                  : activeModal === "putri"
                  ? {
                      scale: screenSize === 'tablet' ? 1.6 : 1.7,
                      y: -8,
                      rotate: 0,
                      opacity: 1,
                      transition: { duration: 0.2 },
                    }
                  : {
                      opacity: 0.8,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }
              }
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogoClick("putri")}
              transition={{
                opacity: { duration: 0.2, ease: "easeOut" },
                scale: { duration: 0.2, ease: "easeOut" },
                y: { duration: 0.2, ease: "easeOut" },
                rotate: { duration: 0.2, ease: "easeOut" },
              }}
              style={{
                filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4))",
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <AnimatePresence>
        {!activeModal && (
          <motion.div
            key="heroContent"
            className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              variants={itemVariants}
              className={`flex ${
                screenSize === 'mobile' ? "flex-col" : ""
              } items-center justify-center relative ${
                screenSize === 'mobile' 
                  ? "bottom-2" 
                  : screenSize === 'tablet'
                  ? "bottom-8 sm:bottom-12 md:bottom-16"
                  : "bottom-10 sm:bottom-20 md:bottom-32"
              }`}
            >
              <motion.img
                src="/images/landing/ambalantext.png"
                alt="Ambalan Text"
                className={`w-full ${
                  screenSize === 'mobile'
                    ? "max-w-md mb-4"
                    : screenSize === 'tablet'
                    ? "max-w-xl sm:max-w-2xl md:max-w-3xl mb-6 z-50"
                    : "max-w-2xl sm:max-w-1xl md:max-w-2xl lg:max-w-3xl mb-30 z-50"
                }`}
                initial={{ scale: 0.5, opacity: 0, rotateX: 90 }}
                animate={{
                  scale: screenSize === 'mobile' ? 1.0 : screenSize === 'tablet' ? 1.1 : 1.2,
                  opacity: 1,
                  rotateX: 0,
                }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  delay: 0.8,
                }}
                whileHover={{
                  scale: screenSize === 'mobile' ? 1.05 : screenSize === 'tablet' ? 1.15 : 1.25,
                  transition: { duration: 0.3 },
                }}
                style={{
                  filter: "drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4))",
                }}
              />

              {/* Mobile logo layout */}
              {screenSize === 'mobile' && (
                <motion.div
                  className="flex justify-center items-center gap-6 mt-4"
                  variants={itemVariants}
                >
                  <motion.img
                    src="/images/logo/L2.png"
                    alt="Scout Logo Putra"
                    className="w-14 h-14 drop-shadow-lg"
                    variants={logoVariants}
                    whileHover={{ scale: 1.1, y: -5 }}
                    style={{
                      filter: "drop-shadow(0 4px 15px rgba(0, 0, 0, 0.3))",
                    }}
                  />
                  <motion.img
                    src="/images/logo/L3.png"
                    alt="Scout Logo Putri"
                    className="w-14 h-14 drop-shadow-lg"
                    variants={logoVariants}
                    whileHover={{ scale: 1.1, y: -5 }}
                    style={{
                      filter: "drop-shadow(0 4px 15px rgba(0, 0, 0, 0.3))",
                    }}
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Corner lights - only on desktop */}
            {screenSize === 'desktop' && (
              <>
                <motion.img
                  src="/images/landing/Cahaya2.png"
                  alt="Cahaya2 top left light"
                  className="absolute left-0 top-0 w-1/3 md:w-1/4 z-30 pointer-events-none opacity-85 sm:opacity-95"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.7, 0.5, 0.7] }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{
                    delay: 1.5,
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    exit: { duration: 0.3 },
                  }}
                  style={{
                    filter: "drop-shadow(0 0 25px rgba(255, 255, 255, 0.3))",
                  }}
                />
                <motion.img
                  src="/images/landing/Cahaya1.png"
                  alt="Cahaya1 top right light"
                  className="absolute right-0 top-0 w-1/3 md:w-1/4 z-30 pointer-events-none opacity-85 sm:opacity-95"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.7, 0.5, 0.7] }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{
                    delay: 1.7,
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    exit: { duration: 0.3 },
                  }}
                  style={{
                    filter: "drop-shadow(0 0 25px rgba(255, 255, 255, 0.3))",
                  }}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal - only on desktop and tablet */}
      {screenSize !== 'mobile' && (
        <LogoModal
          isOpen={activeModal !== null}
          onClose={closeModal}
          logoData={activeModal ? logoData[activeModal] : null}
          clickedLogoType={clickedLogoType}
        />
      )}
    </motion.section>
  );
};

export default Hero;