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
  // Responsive particle count based on screen size and performance
  const [particleCount, setParticleCount] = useState(20);
  
  useEffect(() => {
    const updateParticleCount = () => {
      const width = window.innerWidth;
      if (width < 480) setParticleCount(8);
      else if (width < 768) setParticleCount(12);
      else if (width < 1024) setParticleCount(16);
      else setParticleCount(20);
    };

    updateParticleCount();
    window.addEventListener('resize', updateParticleCount);
    return () => window.removeEventListener('resize', updateParticleCount);
  }, []);

  const [particles] = useState(() =>
    Array.from({ length: particleCount }, (_, i) => i)
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-amber-200/40 to-orange-200/40 rounded-full"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            y: [null, -100, -200],
            scale: [0, Math.random() * 0.8 + 0.5, 0],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 4,
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
                  logoData?.imageUrl || "/images/landing/background.webp"
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

  // Disable parallax on mobile for better performance
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("/images/landing/background.webp")` }}
        />

        {/* Center lights - RESPONSIVE POSITIONING: Always centered, behind group */}
        <motion.img
          src="/images/landing/centerlight.webp"
          alt="center light"
          className="absolute bottom-8 xs:bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 xl:bottom-32 2xl:bottom-40 left-1/2 -translate-x-1/2 z-20 w-48 xs:w-56 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] 2xl:w-[32rem] h-auto"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.6, 0.9, 0.6],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.img
          src="/images/landing/centerlight2.webp"
          alt="center light 2"
          className="absolute bottom-8 xs:bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 xl:bottom-32 2xl:bottom-40 left-1/2 -translate-x-1/2 z-20 w-48 xs:w-56 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] 2xl:w-[32rem] h-auto"
          animate={{
            scale: [1.08, 1, 1.08],
            opacity: [0.9, 0.6, 0.9],
            rotate: [0, -3, 3, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Red background overlay with improved animation */}
        <motion.div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("/images/landing/redbg.webp")` }}
          animate={{ 
            opacity: [0.6, 0.4, 0.8, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Side lights with gentle sway and improved responsiveness */}
        <motion.img
          src="/images/landing/anotherlight.webp"
          alt="left light"
          className="absolute left-0 top-0 h-full w-auto object-cover"
          animate={{ 
            opacity: [0.6, 0.4, 0.7],
            x: [0, -5, 5, 0],
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        <motion.img
          src="/images/landing/anotherlight2.webp"
          alt="right light"
          className="absolute right-0 top-0 h-full w-auto object-cover"
          animate={{ 
            opacity: [0.6, 0.4, 0.7],
            x: [0, 5, -5, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
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
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState('lg');

  // Track screen size for responsive adjustments
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('xs');
      else if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else if (width < 1280) setScreenSize('xl');
      else setScreenSize('2xl');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  useEffect(() => {
    const images = [
      "/images/landing/background.webp",
      "/images/landing/centerlight.webp",
      "/images/landing/centerlight2.webp",
      "/images/landing/redbg.webp",
      "/images/landing/anotherlight.webp",
      "/images/landing/anotherlight2.webp",
      "/images/landing/kertasbawah.webp",
      "/images/landing/Groupsorang.webp",
      "/images/logo/L2.png",
      "/images/logo/L3.png",
      "/images/landing/ambalantext.png",
      "/images/landing/Cahaya2.png",
      "/images/landing/Cahaya1.png",
      "/images/landing/putri.webp",
      "/images/landing/putra.webp",
    ];

    const promises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(promises)
      .then(() => {
        setLoading(false);
        setBackgroundOpacity(100);
      })
      .catch((err) => {
        console.error("Failed to load images", err);
        setLoading(false);
        setBackgroundOpacity(100);
      });
  }, []);

  const logoData = {
    putri: {
      title: "Logo Scout Putri",
      description: "Simbolisme dan makna logo Pramuka untuk anggota putri",
      imageUrl: "/images/landing/putri.webp",
    },
    putra: {
      title: "Logo Scout Putra",
      description: "Simbolisme dan makna logo Pramuka untuk anggota putra",
      imageUrl: "/images/landing/putra.webp",
    },
  };

  const handleLogoClick = (logoType) => {
    if (window.innerWidth < 1024) return;

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

  // Ensure modal state changes are properly communicated
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
      }
    };

    if (activeModal) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [activeModal]);

  useEffect(() => {
    const handleScroll = () => {
      if (activeModal) {
        closeModal();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeModal]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
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
        damping: 20,
        stiffness: 300,
        delay: 0.6,
      },
    },
  };

  const textVariants = {
    hidden: { scale: 0.3, opacity: 0, rotateX: 90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 150,
        delay: 0.9,
      },
    },
  };

  const groupVariants = {
    hidden: { y: 120, opacity: 0, scale: 0.7 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 100,
        delay: 1.3,
      }
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-amber-400/20 border-t-amber-400 rounded-full"
        />
      </div>
    );
  }

  // Get responsive classes based on screen size
  const getResponsiveClasses = () => {
    const classes = {
      container: "relative min-h-screen flex items-center justify-center overflow-hidden bg-black",
      ambalanText: {
        xs: "w-full max-w-xs mb-4 scale-100",
        sm: "w-full max-w-sm mb-6 scale-110",
        md: "w-full max-w-md mb-8 scale-120",
        lg: "w-full max-w-lg mb-10 scale-135",
        xl: "w-full max-w-xl mb-12 scale-150",
        "2xl": "w-full max-w-2xl mb-16 scale-150"
      },
      groupPeople: {
        xs: "bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg scale-120",
        sm: "bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl scale-140",
        md: "bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl scale-160",
        lg: "bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl scale-180",
        xl: "bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl scale-210",
        "2xl": "bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl scale-135"
      },
      logoDesktop: {
        lg: "w-32 h-32",
        xl: "w-36 h-36",
        "2xl": "w-40 h-40"
      },
      logoMobile: {
        xs: "w-12 h-12",
        sm: "w-14 h-14",
        md: "w-16 h-16"
      }
    };
    return classes;
  };

  const classes = getResponsiveClasses();

  return (
    <motion.section
      ref={containerRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`${classes.container} pt-16 sm:pt-20 md:pt-24`}
    >
      <FloatingParticles />
      <AnimatedBackground backgroundOpacity={backgroundOpacity} />

      {/* Bottom paper - positioned above center lights with improved animation */}
      <motion.img
        src="/images/landing/kertasbawah.webp"
        alt="bottom paper"
        className="absolute bottom-0 left-0 w-full z-30 object-cover"
        initial={{ y: 150, opacity: 0, scaleY: 0.8 }}
        animate={{ y: 0, opacity: 1, scaleY: 1 }}
        transition={{ 
          delay: 1.1, 
          duration: 1.5, 
          type: "spring", 
          damping: 25 
        }}
      />

      {/* Group of people - BIGGER and more responsive */}
      <motion.img
        src="/images/landing/Groupsorang.webp"
        alt="group of people"
        className={`absolute ${classes.groupPeople[screenSize]} z-40 object-contain`}
        variants={groupVariants}
        style={{
          filter: "drop-shadow(0 12px 25px rgba(0, 0, 0, 0.4))",
        }}
      />

      {/* Desktop and Tablet Logo positioning with improved hover effects */}
      <motion.div
        variants={itemVariants}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-[80] hidden lg:block"
      >
        <div className="flex justify-between items-center w-full relative px-8 lg:px-12 xl:px-16 2xl:px-20">
          <motion.img
            src="/images/logo/L2.png"
            alt="Scout Logo Putra"
            className={`${classes.logoDesktop[screenSize] || classes.logoDesktop.lg} drop-shadow-2xl cursor-pointer relative`}
            variants={logoVariants}
            animate={{
              opacity: activeModal === "putra" ? 1 : activeModal ? 0.3 : 1,
              scale: activeModal === "putra" ? 1.5 : activeModal ? 0.7 : 1,
              y: activeModal === "putra" ? 10 : 0,
              x: activeModal === "putra" ? 40 : 0,
              rotate: 0,
            }}
            whileHover={
              !activeModal
                ? {
                    scale: 1.15,
                    rotate: -10,
                    y: -12,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      damping: 15,
                      stiffness: 300,
                    },
                  }
                : activeModal === "putra"
                ? {
                    scale: 1.45,
                    y: 5,
                    rotate: 0,
                    opacity: 1,
                    transition: { duration: 0.2 },
                  }
                : {
                    opacity: 0.5,
                    scale: 0.7,
                    transition: { duration: 0.3 },
                  }
            }
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLogoClick("putra")}
            transition={{
              opacity: { duration: 0.3, ease: "easeOut" },
              scale: { duration: 0.3, ease: "easeOut" },
              y: { duration: 0.3, ease: "easeOut" },
              rotate: { duration: 0.3, ease: "easeOut" },
            }}
            style={{
              filter: "drop-shadow(0 12px 25px rgba(0, 0, 0, 0.5))",
            }}
          />

          <motion.img
            src="/images/logo/L3.png"
            alt="Scout Logo Putri"
            className={`${classes.logoDesktop[screenSize] || classes.logoDesktop.lg} drop-shadow-2xl cursor-pointer relative`}
            variants={logoVariants}
            animate={{
              opacity: activeModal === "putri" ? 1 : activeModal ? 0.3 : 1,
              scale: activeModal === "putri" ? 1.5 : activeModal ? 0.7 : 1,
              y: activeModal === "putri" ? 10 : 0,
              x: activeModal === "putri" ? -60 : 0,
              rotate: 0,
            }}
            whileHover={
              !activeModal
                ? {
                    scale: 1.15,
                    rotate: 10,
                    y: -12,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      damping: 15,
                      stiffness: 300,
                    },
                  }
                : activeModal === "putri"
                ? {
                    scale: 1.45,
                    y: 5,
                    rotate: 0,
                    opacity: 1,
                    transition: { duration: 0.2 },
                  }
                : {
                    opacity: 0.5,
                    scale: 0.7,
                    transition: { duration: 0.3 },
                  }
            }
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLogoClick("putri")}
            transition={{
              opacity: { duration: 0.3, ease: "easeOut" },
              scale: { duration: 0.3, ease: "easeOut" },
              y: { duration: 0.3, ease: "easeOut" },
              rotate: { duration: 0.3, ease: "easeOut" },
            }}
            style={{
              filter: "drop-shadow(0 12px 25px rgba(0, 0, 0, 0.5))",
            }}
          />
        </div>
      </motion.div>

      {/* Main content with improved responsive positioning */}
      <AnimatePresence>
        {!activeModal && (
          <motion.div
            key="heroContent"
            className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center relative bottom-4 xs:bottom-8 sm:bottom-16 md:bottom-24 lg:bottom-32 xl:bottom-40 2xl:bottom-48"
            >
              {/* Ambalan Text - Responsive with subtle hover */}
              <motion.img
                src="/images/landing/ambalantext.png"
                alt="Ambalan Text"
                className={`${classes.ambalanText[screenSize]} z-50`}
                variants={textVariants}
                whileHover={{
                  scale: screenSize === 'xs' ? 1.05 : 
                        screenSize === 'sm' ? 1.08 :
                        screenSize === 'md' ? 1.10 :
                        screenSize === 'lg' ? 1.12 :
                        screenSize === 'xl' ? 1.15 : 1.15,
                  transition: { 
                    duration: 0.3,
                    type: "spring",
                    damping: 25
                  },
                }}
                style={{
                  filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4))",
                }}
              />

              {/* Mobile logo layout with improved spacing */}
              <motion.div
                className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6 md:mt-8 lg:hidden"
                variants={itemVariants}
              >
                <motion.img
                  src="/images/logo/L2.png"
                  alt="Scout Logo Putra"
                  className={`${classes.logoMobile[screenSize]} drop-shadow-lg`}
                  variants={logoVariants}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -6, 
                    rotate: -3,
                    transition: {
                      type: "spring",
                      damping: 20,
                      stiffness: 300
                    }
                  }}
                  style={{
                    filter: "drop-shadow(0 6px 20px rgba(0, 0, 0, 0.4))",
                  }}
                />
                <motion.img
                  src="/images/logo/L3.png"
                  alt="Scout Logo Putri"
                  className={`${classes.logoMobile[screenSize]} drop-shadow-lg`}
                  variants={logoVariants}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -6, 
                    rotate: 3,
                    transition: {
                      type: "spring",
                      damping: 20,
                      stiffness: 300
                    }
                  }}
                  style={{
                    filter: "drop-shadow(0 6px 20px rgba(0, 0, 0, 0.4))",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Corner lights - improved animations and responsive visibility */}
            <>
              <motion.img
                src="/images/landing/Cahaya2.png"
                alt="Cahaya2 top left light"
                className="absolute left-0 top-0 w-1/4 lg:w-1/3 xl:w-1/4 2xl:w-1/5 z-30 pointer-events-none opacity-70 sm:opacity-80 lg:opacity-90 hidden lg:block"
                initial={{ opacity: 0, x: -50, rotate: -10 }}
                animate={{ 
                  opacity: [0.6, 0.4, 0.8, 0.5],
                  x: [-20, 0, -10, 0],
                  rotate: [-5, 0, -3, 0]
                }}
                exit={{ opacity: 0, x: -40, rotate: -15 }}
                transition={{
                  delay: 1.6,
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  exit: { duration: 0.4 },
                }}
                style={{
                  filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.4))",
                }}
              />
              <motion.img
                src="/images/landing/Cahaya1.png"
                alt="Cahaya1 top right light"
                className="absolute right-0 top-0 w-1/4 lg:w-1/3 xl:w-1/4 2xl:w-1/5 z-30 pointer-events-none opacity-70 sm:opacity-80 lg:opacity-90 hidden lg:block"
                initial={{ opacity: 0, x: 50, rotate: 10 }}
                animate={{ 
                  opacity: [0.6, 0.4, 0.8, 0.5],
                  x: [20, 0, 10, 0],
                  rotate: [5, 0, 3, 0]
                }}
                exit={{ opacity: 0, x: 40, rotate: 15 }}
                transition={{
                  delay: 1.8,
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  exit: { duration: 0.4 },
                }}
                style={{
                  filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.4))",
                }}
              />
            </>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal - only on desktop and tablet */}
      <div className="hidden lg:block">
        <LogoModal
          isOpen={activeModal !== null}
          onClose={closeModal}
          logoData={activeModal ? logoData[activeModal] : null}
          clickedLogoType={clickedLogoType}
        />
      </div>
    </motion.section>
  );
};

export default Hero;