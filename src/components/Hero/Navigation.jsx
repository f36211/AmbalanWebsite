import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "../../data/index";

const Navigation = ({ isScrolled, isModalOpen = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showCompactNav, setShowCompactNav] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on the home/landing page
  const isHomePage = location.pathname === "/";

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setShowCompactNav(false);
  }, [location]);

  // Close menus when modal state changes
  useEffect(() => {
    if (isModalOpen) {
      setIsMenuOpen(false);
      setActiveDropdown(null);
      setShowCompactNav(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (!isMenuOpen) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && !isMenuOpen) {
      setIsMenuOpen(true);
    }
    if (isRightSwipe && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleDropdownToggle = (index, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMobileDropdownToggle = (index, e) => {
    e.stopPropagation();
    const mobileIndex = `mobile-${index}`;
    setActiveDropdown(activeDropdown === mobileIndex ? null : mobileIndex);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleCompactNav = () => {
    setShowCompactNav(!showCompactNav);
  };

  // Updated route mapping to match App.jsx routes
  const getRouteFromTitle = (itemTitle) => {
    const routeMap = {
      "Struktur Organisasi": "/struktur-organisasi",
      "Achievements": "/achievements",
      "Filosofi Logo": "/filosofi",
      "Foto Kegiatan": "/foto-kegiatan",
      "Foto Purna Ambalan": "/foto-purna-ambalan",
      "Seragam Ambalan SMAIT Ummul Quro": "/seragam",
      "Materi Pembelajaran": "/materi-pramuka",
      "Tentang Kami": "/tentang-kami",
      Beranda: "/",
      Home: "/",
    };
    return routeMap[itemTitle] || "/";
  };

  const handleNavigation = (itemTitle, e) => {
    e.preventDefault();
    const route = getRouteFromTitle(itemTitle);
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      navigate(route);
      closeMobileMenu();
      setShowCompactNav(false);
    }, 100);
  };

  const isActiveRoute = (itemTitle) => {
    const route = getRouteFromTitle(itemTitle);
    return location.pathname === route;
  };

  // This variable now ONLY controls the slide-down animation.
  const topDownVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.4, // Made quicker
        ease: "easeInOut",
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 0.3, // Made quicker
        ease: "easeInOut",
      },
    },
  };
  
  // This variable now ONLY controls the background style.
  const navVariants = {
    transparent: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      backdropFilter: "blur(16px)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    solid: {
      backgroundColor: "rgba(255, 255, 255, 1)", // Fully solid white
      backdropFilter: "blur(0px)",
      borderColor: "rgba(229, 231, 235, 1)", // A light gray for better contrast
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // COMPACT NAVIGATION WHEN MODAL IS OPEN
  if (isModalOpen) {
    return (
      <>
        {/* Compact Navigation Toggle Button */}
        <motion.div
          className="fixed top-4 right-4 z-[70]"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <button
            onClick={toggleCompactNav}
            className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-all duration-300 border border-white/20 shadow-lg"
          >
            <motion.div
              animate={{ rotate: showCompactNav ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {showCompactNav ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </button>
        </motion.div>

        {/* Compact Navigation Menu */}
        <AnimatePresence>
          {showCompactNav && (
            <motion.div
              className="fixed top-20 right-4 z-[65] w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="p-4">
                {/* Compact Logo */}
                <Link
                  to="/"
                  className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200/50"
                  onClick={() => setShowCompactNav(false)}
                >
                  <motion.img
                    src="/images/logo/L3.png"
                    alt="Logo Ambalan Putra"
                    className="w-6 h-6"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.img
                    src="/images/logo/L2.png"
                    alt="Logo Ambalan Putri"
                    className="w-6 h-6"
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <span className="font-bold text-[#5c0b08] text-sm">
                    AMBALAN
                  </span>
                </Link>

                {/* Compact Navigation Items */}
                <div className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }} // Kept a very minimal stagger here for style
                    >
                      <button
                        onClick={(e) =>
                          handleDropdownToggle(`compact-${index}`, e)
                        }
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-[#5c0b08] hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] hover:text-white rounded-lg transition-all duration-200"
                      >
                        <span>{item.title}</span>
                        <motion.div
                          animate={{
                            rotate:
                              activeDropdown === `compact-${index}` ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {activeDropdown === `compact-${index}` && (
                          <motion.div
                            className="ml-2 mt-1 space-y-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.children.map((child, childIndex) => (
                              <motion.button
                                key={child}
                                onClick={(e) => handleNavigation(child, e)}
                                className={`block w-full text-left px-3 py-2 text-xs hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] rounded-md transition-all duration-200 ${
                                  isActiveRoute(child)
                                    ? "text-white bg-gradient-to-r from-[#5c0b08] to-[#903d04]"
                                    : "text-[#903d04]"
                                }`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: childIndex * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <span className="flex items-center gap-2">
                                  <div
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      isActiveRoute(child)
                                        ? "bg-white"
                                        : "bg-[#903d04]"
                                    }`}
                                  ></div>
                                  {child}
                                </span>
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // NORMAL NAVIGATION WHEN MODAL IS CLOSED
  return (
    <>
      {/* Background Image Layer with Smooth Animation */}
      <AnimatePresence>
        {isHomePage && !isScrolled && !isModalOpen && (
          <motion.div
            className="fixed w-full top-0 z-40 h-32 sm:h-40 lg:h-48 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/landing/kertasatas.png")',
            }}
            variants={topDownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Animated overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* This outer nav handles the slide-down motion for the whole component */}
      <motion.nav
        className="fixed w-full top-0 z-50"
        variants={topDownVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* This inner div is the background that changes from transparent to solid */}
        <motion.div
          className="absolute inset-0 w-full h-full border-b shadow-xl"
          variants={navVariants}
          animate={
            isScrolled || !isHomePage || isModalOpen ? "solid" : "transparent"
          }
        ></motion.div>

        {/* The content sits on top of the background. Note the 'relative' class. */}
        <div className="relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                className="flex justify-between items-center px-4 sm:px-6 lg:px-8"
                animate={{
                    height: isScrolled || !isHomePage || isModalOpen ? 56 : 64,
                    transition: { duration: 0.5, ease: "easeInOut" },
                }}
                >
                {/* Logo with Enhanced Animation */}
                <Link
                    to="/"
                    className="flex items-center gap-4"
                    onClick={closeMobileMenu}
                >
                    <div className="flex items-center gap-2 sm:gap-3">
                    <motion.img
                        src="/images/logo/L3.png"
                        alt="Logo Ambalan Putra"
                        className="object-contain"
                        animate={{
                        width: isScrolled || !isHomePage || isModalOpen ? 28 : 36,
                        height: isScrolled || !isHomePage || isModalOpen ? 28 : 36,
                        }}
                        whileHover={{
                        scale: 1.1,
                        rotate: 3,
                        transition: { type: "spring", stiffness: 300 },
                        }}
                        transition={{ duration: 0.5 }}
                    />
                    <motion.img
                        src="/images/logo/L2.png"
                        alt="Logo Ambalan Putri"
                        className="object-contain"
                        animate={{
                        width: isScrolled || !isHomePage || isModalOpen ? 28 : 36,
                        height: isScrolled || !isHomePage || isModalOpen ? 28 : 36,
                        }}
                        whileHover={{
                        scale: 1.1,
                        rotate: -3,
                        transition: { type: "spring", stiffness: 300 },
                        }}
                        transition={{ duration: 0.5 }}
                    />
                    </div>
                    <motion.div
                    className="font-black tracking-tight"
                    animate={{
                        fontSize:
                        isScrolled || !isHomePage || isModalOpen
                            ? "1.5rem"
                            : "1.125rem",
                        color:
                        isScrolled || !isHomePage || isModalOpen
                            ? "#5c0b08"
                            : "#ffffff",
                        textShadow:
                        isScrolled || !isHomePage || isModalOpen
                            ? "none"
                            : "0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.15)",
                    }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    >
                    AMBALAN
                    </motion.div>
                </Link>

                {/* Desktop Navigation with Enhanced Animations */}
                <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                    {navigation.map((item) => (
                    <div key={item.title} className="relative">
                        <motion.button
                        onClick={(e) => handleDropdownToggle(item.title, e)}
                        className={`flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 lg:py-3 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 ${
                            activeDropdown === item.title
                            ? "text-white bg-gradient-to-r from-[#5c0b08] to-[#903d04] shadow-lg"
                            : isScrolled || !isHomePage || isModalOpen
                            ? "text-[#5c0b08] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08]"
                            : "text-white hover:text-white hover:bg-white/30 hover:backdrop-blur-lg drop-shadow-2xl"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }} // Removed delay
                        >
                        <span className="whitespace-nowrap text-xs lg:text-base">
                            {item.title}
                        </span>
                        <motion.div
                            animate={{ rotate: activeDropdown === item.title ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />
                        </motion.div>
                        </motion.button>

                        {/* Enhanced Dropdown with Smooth Animations */}
                        <AnimatePresence>
                        {activeDropdown === item.title && (
                            <motion.div
                            className="absolute top-full left-0 mt-2 w-48 lg:w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-100 overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            >
                            <div className="p-2">
                                {item.children.map((child, childIndex) => (
                                <motion.button
                                    key={child}
                                    onClick={(e) => handleNavigation(child, e)}
                                    className={`block w-full text-left px-3 lg:px-4 py-2 lg:py-3 hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] rounded-xl transition-all duration-200 font-medium text-sm lg:text-base ${
                                    isActiveRoute(child)
                                        ? "text-white bg-gradient-to-r from-[#5c0b08] to-[#903d04]"
                                        : "text-[#5c0b08]"
                                    }`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: childIndex * 0.05 }}
                                    whileHover={{ scale: 1.02, x: 2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="flex items-center gap-1 lg:gap-2">
                                    <motion.div
                                        className={`w-2 h-2 rounded-full opacity-60 ${
                                        isActiveRoute(child)
                                            ? "bg-white"
                                            : "bg-gradient-to-r from-[#903d04] to-[#5c0b08]"
                                        }`}
                                        animate={{
                                        scale: isActiveRoute(child)
                                            ? [1, 1.2, 1]
                                            : 1,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    {child}
                                    </span>
                                </motion.button>
                                ))}
                            </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    ))}
                </div>

                {/* Mobile menu button with Animation */}
                <motion.button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`md:hidden p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                    isScrolled || !isHomePage || isModalOpen
                        ? "text-[#5c0b08] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08]"
                        : "text-white hover:bg-white/30 hover:backdrop-blur-lg drop-shadow-2xl"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    >
                    {isMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                    </motion.div>
                </motion.button>
                </motion.div>
            </div>
        </div>

        {/* Enhanced Mobile Navigation with Smooth Animations */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/90 backdrop-blur-xl border-t border-orange-100 shadow-2xl overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-3 sm:p-4 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="border border-orange-100/50 backdrop-blur-sm bg-white/30 rounded-xl overflow-hidden shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }} // Removed delay
                  >
                    <motion.button
                      onClick={(e) => handleMobileDropdownToggle(index, e)}
                      className="w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 font-semibold text-[#5c0b08] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] transition-all duration-300"
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-sm sm:text-base">{item.title}</span>
                      <motion.div
                        animate={{
                          rotate:
                            activeDropdown === `mobile-${index}` ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {activeDropdown === `mobile-${index}` && (
                        <motion.div
                          className="bg-gradient-to-r from-orange-50/80 to-amber-50/80 backdrop-blur-sm"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-2 space-y-1">
                            {item.children.map((child, childIndex) => (
                              <motion.button
                                key={child}
                                onClick={(e) => handleNavigation(child, e)}
                                className={`block w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] rounded-lg transition-all duration-200 font-medium ${
                                  isActiveRoute(child)
                                    ? "text-white bg-gradient-to-r from-[#5c0b08] to-[#903d04]"
                                    : "text-[#903d04]"
                                }`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: childIndex * 0.05 }}
                                whileHover={{ scale: 1.02, x: 2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <span className="flex items-center gap-1 sm:gap-2">
                                  <motion.div
                                    className={`w-1.5 h-1.5 rounded-full opacity-60 ${
                                      isActiveRoute(child)
                                        ? "bg-white"
                                        : "bg-gradient-to-r from-[#903d04] to-[#5c0b08]"
                                    }`}
                                    animate={{
                                      scale: isActiveRoute(child)
                                        ? [1, 1.2, 1]
                                        : 1,
                                    }}
                                    transition={{ duration: 0.5 }}
                                  />
                                  {child}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile swipe indicator with Animation */}
      <motion.div
        className="md:hidden fixed top-1/2 left-2 z-40 transform -translate-y-1/2 opacity-30"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      ></motion.div>
    </>
  );
};

export default Navigation;