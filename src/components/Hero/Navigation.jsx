import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "../../data/index";

const Navigation = ({ isPageLoading, isInitialLoad = false, isScrolled = false, isModalOpen = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showCompactNav, setShowCompactNav] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setShowCompactNav(false);
  }, [location]);

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

  const topDownVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  
  const navVariants = {
    transparent: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      backdropFilter: "blur(16px)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    solid: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      backdropFilter: "blur(0px)",
      borderColor: "rgba(229, 231, 235, 1)",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // COMPACT NAVIGATION WHEN MODAL IS OPEN
  if (isModalOpen) {
    return (
      <>
        <motion.div
          className="fixed top-4 right-4 z-[70]"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <button
            onClick={toggleCompactNav}
            className="flex items-center justify-center w-12 h-12 text-white transition-all duration-300 border rounded-full shadow-lg bg-black/20 backdrop-blur-md hover:bg-black/30 border-white/20"
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
                <Link
                  to="/"
                  className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200/50"
                  onClick={() => setShowCompactNav(false)}
                >
                  <motion.img
                    src="/images/logo/L3.webp"
                    alt="Logo Ambalan Putra"
                    className="w-6 h-6"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.img
                    src="/images/logo/L2.webp"
                    alt="Logo Ambalan Putri"
                    className="w-6 h-6"
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <span className="font-bold text-[#5c0b08] text-sm">
                    AMBALAN
                  </span>
                </Link>

                <div className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
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
                            className="mt-1 ml-2 space-y-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.children?.map((child) => (
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
                                transition={{ delay: 0.05 }}
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

  // NORMAL NAVIGATION - Hide only on initial load, show on navigation loads
  const shouldShowNav = !isPageLoading || !isInitialLoad;

  return (
    <>
      <AnimatePresence>
        {isHomePage && !isScrolled && !isModalOpen && shouldShowNav && (
          <motion.div
            className="fixed top-0 z-40 w-full h-32 bg-center bg-no-repeat bg-cover sm:h-40 lg:h-48"
            style={{
              backgroundImage: 'url("/images/landing/kertasatas.webp")',
            }}
            variants={topDownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        className="fixed top-0 z-50 w-full"
        variants={topDownVariants}
        initial="hidden"
        animate={shouldShowNav ? "visible" : "hidden"}
        exit="exit"
      >
        <motion.div
          className="absolute inset-0 w-full h-full border-b shadow-xl"
          variants={navVariants}
          animate={
            isScrolled || !isHomePage || isModalOpen ? "solid" : "transparent"
          }
        />

        <div className="relative">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="flex items-center justify-between px-4 sm:px-6 lg:px-8"
              animate={{
                height: isScrolled || !isHomePage || isModalOpen ? 56 : 64,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              <Link
                to="/"
                className="flex items-center gap-4"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.img
                    src="/images/logo/L3.webp"
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
                    src="/images/logo/L2.webp"
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

              <div className="items-center hidden space-x-1 md:flex lg:space-x-2">
                {navigation.map((item, index) => (
                  <div key={item.title} className="relative">
                    <motion.button
                      onClick={(e) => handleDropdownToggle(index, e)}
                      className={`flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 lg:py-3 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 ${
                        activeDropdown === index
                          ? "text-white bg-gradient-to-r from-[#5c0b08] to-[#903d04] shadow-lg"
                          : isScrolled || !isHomePage || isModalOpen
                          ? "text-[#5c0b08] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08]"
                          : "text-white hover:text-white hover:bg-white/30 hover:backdrop-blur-lg drop-shadow-2xl"
                      }`}
                      whileHover={{ y: -2 }}
                    >
                      <span className="text-xs whitespace-nowrap lg:text-base">
                        {item.title}
                      </span>
                      <motion.div
                        animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          className="absolute left-0 w-56 mt-2 overflow-hidden border shadow-lg top-full bg-white/95 backdrop-blur-lg rounded-xl border-gray-200/50"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0, transition: { staggerChildren: 0.05 } }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <div className="p-2">
                            {item.children?.map((child, childIndex) => (
                              <motion.button
                                key={child}
                                onClick={(e) => handleNavigation(child, e)}
                                className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                  isActiveRoute(child)
                                    ? "text-white bg-gradient-to-r from-[#5c0b08] to-[#903d04]"
                                    : "text-[#5c0b08]"
                                }`}
                                variants={{
                                  hidden: { opacity: 0, x: -15 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                whileHover={{
                                  backgroundColor: "#e5e7eb",
                                  color: "#5c0b08",
                                  scale: 1.05,
                                  transition: { duration: 0.15 }
                                }}
                              >
                                <span className="flex items-center gap-1 lg:gap-2">
                                  <motion.div
                                    className={`w-2 h-2 rounded-full opacity-60 ${
                                      isActiveRoute(child)
                                        ? "bg-white"
                                        : "bg-gradient-to-r from-[#903d04] to-[#5c0b08]"
                                    }`}
                                    animate={{
                                      scale: isActiveRoute(child) ? [1, 1.2, 1] : 1,
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

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                  isScrolled || !isHomePage || isModalOpen
                    ? "text-[#5c0b08] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08]"
                    : "text-white hover:bg-white/30 hover:backdrop-blur-lg drop-shadow-2xl"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 md:hidden z-60"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              className="absolute top-0 right-0 w-4/5 h-full max-w-sm border-l border-orange-100 shadow-2xl bg-white/90 backdrop-blur-xl"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="h-full p-3 space-y-2 overflow-y-auto sm:p-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="overflow-hidden border shadow-sm border-orange-100/50 backdrop-blur-sm bg-white/30 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <motion.button
                      onClick={(e) => handleMobileDropdownToggle(index, e)}
                      className="w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 font-semibold text-[#5c0b08] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] transition-all duration-300"
                    >
                      <span className="text-sm sm:text-base">{item.title}</span>
                      <motion.div
                        animate={{
                          rotate: activeDropdown === `mobile-${index}` ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {activeDropdown === `mobile-${index}` && (
                        <motion.div
                          className="bg-white/50"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1, transition: { staggerChildren: 0.05 } }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <div className="p-2 space-y-1">
                            {item.children?.map((child, childIndex) => (
                              <motion.button
                                key={child}
                                onClick={(e) => handleNavigation(child, e)}
                                className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                  isActiveRoute(child)
                                    ? "text-white bg-gradient-to-r from-[#5c0b08] to-[#903d04]"
                                    : "text-[#5c0b08]"
                                }`}
                                variants={{
                                  hidden: { opacity: 0, x: -15 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                transition={{ delay: 0.1 + childIndex * 0.05 }}
                                whileHover={{ 
                                  backgroundColor: "#e5e7eb",
                                  color: "#5c0b08",
                                  scale: 1.05,
                                  transition: { duration: 0.15 }
                                }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;