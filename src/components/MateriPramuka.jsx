import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { materiPramukaData as fallbackData } from "../data/index.js";
import { client, urlFor } from "../sanity/client";

// Skeleton Loading Component
const CardSkeleton = ({ isMobile }) => (
  <div
    className={`${
      isMobile ? "w-80 max-w-[90vw] h-[480px]" : "w-64 h-96"
    } bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 flex flex-col animate-pulse`}
  >
    <div className={`relative ${isMobile ? "h-56" : "h-48"} bg-gray-300`}></div>
    <div className={`${isMobile ? "p-6" : "p-5"} flex flex-col flex-1`}>
      <div
        className={`${isMobile ? "h-6 mb-4" : "h-5 mb-3"} bg-gray-300 rounded`}
      ></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
      <div
        className={`${isMobile ? "h-12 mt-6" : "h-10 mt-4"} bg-gray-300 rounded-xl`}
      ></div>
    </div>
  </div>
);

// Optimized Image Component with lazy loading and error handling
const OptimizedImage = ({ src, alt, className, onLoad, onError, ...props }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  return (
    <div className="relative w-full h-full">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
        </div>
      )}
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          className={`${className} ${imageLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-gray-400" />
        </div>
      )}
    </div>
  );
};

const MateriPramukaPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const [materials, setMaterials] = useState(fallbackData.materials);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        // Expand presentationFile asset to get the URL
        const query = `*[_type == "materiPramuka"]{
                ...,
                presentationFile{
                    asset->{
                        url
                    }
                }
            }`;
        if (client) {
          const result = await client.fetch(query);
          if (result && result.length > 0) {
            const mapped = result.map((item, index) => ({
              id: index + 1, // Display ID
              _id: item._id, // Real ID
              title: item.title,
              description: item.description,
              content: item.content,
              image: item.image
                ? urlFor(item.image).url()
                : "/images/imags/scarf.jpg",
              presentationSvg:
                item.presentationFile?.asset?.url || "/images/imags/0001.svg",
            }));
            setMaterials(mapped);
          }
        }
      } catch (error) {
        console.error("Failed to fetch Materi Pramuka:", error);
      }
    };
    fetchMaterials();
  }, []);

  // Memoized calculations for better performance
  const materialsPerPage = useMemo(() => (isMobile ? 1 : 3), [isMobile]);
  const totalPages = useMemo(
    () => Math.ceil(materials.length / materialsPerPage),
    [materials.length, materialsPerPage],
  );
  const currentMaterials = useMemo(
    () =>
      materials.slice(
        currentPage * materialsPerPage,
        (currentPage + 1) * materialsPerPage,
      ),
    [materials, currentPage, materialsPerPage],
  );

  // Optimized mobile detection with debounce
  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Touch handlers for swipe navigation
  const handleTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage < totalPages - 1) {
      nextPage();
    }
    if (isRightSwipe && currentPage > 0) {
      prevPage();
    }
  }, [touchStart, touchEnd, currentPage, totalPages]);

  // Navigation functions with better performance
  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const openModal = useCallback((material) => {
    setSelectedMaterial(material);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedMaterial(null);
    // Restore body scroll
    document.body.style.overflow = "unset";
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedMaterial) {
        if (e.key === "Escape") closeModal();
        return;
      }

      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "ArrowRight") nextPage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMaterial, closeModal, prevPage, nextPage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background SVG - Optimized loading */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/images/imags/materi.svg"
          alt="Background"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: "center center" }}
          onLoad={() => setBackgroundLoaded(true)}
        />

        {/* Fallback background while loading */}
        {!backgroundLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        )}

        {/* Enhanced overlay for better text readability */}
        <div
          className={`absolute inset-0 ${
            isMobile
              ? "bg-white/10 backdrop-blur-[1px]"
              : "bg-white/5 backdrop-blur-[0.5px]"
          }`}
        ></div>
      </div>

      {/* Content - Enhanced mobile spacing */}
      <div
        className={`relative z-10 min-h-screen flex flex-col justify-center ${
          isMobile ? "px-3 py-6" : "px-4 py-8"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Materials Grid - Enhanced animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`page-${currentPage}`}
              initial={{ opacity: 0, x: isMobile ? 50 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isMobile ? -50 : -100 }}
              transition={{
                duration: isMobile ? 0.3 : 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className={`flex justify-center ${isMobile ? "mb-8" : "gap-8 mb-12"}`}
            >
              {currentMaterials.map((material, index) => (
                <motion.div
                  key={`${material.id}-${currentPage}`}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: isMobile ? 0 : index * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="group cursor-pointer"
                  onClick={() => openModal(material)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openModal(material);
                    }
                  }}
                  aria-label={`Open ${material.title} material`}
                >
                  <div
                    className={`${
                      isMobile ? "w-80 max-w-[90vw] h-[480px]" : "w-64 h-96"
                    } bg-white/95 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/30 hover:border-white/50 active:scale-95 flex flex-col`}
                  >
                    {/* Image Section - Enhanced */}
                    <div
                      className={`relative ${isMobile ? "h-56" : "h-48"} overflow-hidden flex-shrink-0`}
                    >
                      <OptimizedImage
                        src={material.image}
                        alt={material.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

                      {/* Material Number - Enhanced */}
                      <div className="absolute top-3 left-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`${isMobile ? "w-11 h-11" : "w-9 h-9"} bg-gradient-to-r from-[#5c0b08] to-[#903d04] rounded-full flex items-center justify-center shadow-lg border-2 border-white/30`}
                        >
                          <span
                            className={`text-white ${isMobile ? "text-lg" : "text-sm"} font-bold`}
                          >
                            {material.id}
                          </span>
                        </motion.div>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#5c0b08]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content Section - Enhanced */}
                    <div
                      className={`${isMobile ? "p-6" : "p-5"} flex flex-col flex-1`}
                    >
                      <h3
                        className={`${
                          isMobile ? "text-xl mb-4" : "text-lg mb-3"
                        } font-bold text-[#5c0b08] group-hover:text-[#903d04] transition-colors duration-300 leading-tight line-clamp-2`}
                      >
                        {material.title}
                      </h3>

                      <p
                        className={`text-gray-600 ${
                          isMobile
                            ? "text-base mb-6 line-clamp-4"
                            : "text-sm mb-4 line-clamp-3"
                        } flex-1 leading-relaxed`}
                      >
                        {material.description}
                      </p>

                      {/* Action Button - Enhanced */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-center gap-3 ${
                          isMobile ? "px-5 py-4 text-base" : "px-4 py-3 text-sm"
                        } bg-gradient-to-r from-[#903d04] to-[#5c0b08] text-white rounded-xl font-semibold hover:from-[#5c0b08] hover:to-[#903d04] transition-all duration-300 shadow-md hover:shadow-lg active:shadow-sm mt-auto group/btn`}
                      >
                        <BookOpen
                          className={`${isMobile ? "w-5 h-5" : "w-4 h-4"} transition-transform group-hover/btn:scale-110`}
                        />
                        Buka Materi
                        <ArrowRight
                          className={`${isMobile ? "w-5 h-5" : "w-4 h-4"} transition-transform group-hover/btn:translate-x-1`}
                        />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation - Enhanced for mobile */}
          <div
            className={`flex justify-center items-center ${isMobile ? "gap-6" : "gap-4 sm:gap-6"}`}
          >
            <motion.button
              whileHover={{ scale: isMobile ? 1.05 : 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevPage}
              disabled={currentPage === 0 && totalPages === 1}
              className={`${
                isMobile
                  ? "w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-xl border border-white/30"
                  : "px-4 py-2 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/30 text-sm sm:text-base"
              } text-[#903d04] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95`}
              aria-label="Previous page"
            >
              {isMobile ? <ChevronLeft className="w-7 h-7" /> : "← Prev"}
            </motion.button>

            {/* Page Indicators - Enhanced */}
            <div className={`flex ${isMobile ? "gap-3" : "gap-1.5 sm:gap-2"}`}>
              {Array.from({ length: totalPages }, (_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(index)}
                  className={`${
                    isMobile ? "w-5 h-5" : "w-3 h-3 sm:w-3.5 sm:h-3.5"
                  } rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? "bg-gradient-to-r from-[#903d04] to-[#5c0b08] scale-125 shadow-lg"
                      : "bg-white/70 hover:bg-white/90 shadow-md"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: isMobile ? 1.05 : 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPage}
              disabled={currentPage === totalPages - 1 && totalPages === 1}
              className={`${
                isMobile
                  ? "w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-xl border border-white/30"
                  : "px-4 py-2 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/30 text-sm sm:text-base"
              } text-[#903d04] hover:text-white hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95`}
              aria-label="Next page"
            >
              {isMobile ? <ChevronRight className="w-7 h-7" /> : "Next →"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal - Significantly Enhanced */}
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center ${
              isMobile ? "p-3" : "p-4"
            } bg-black/80 backdrop-blur-md`}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative bg-white rounded-3xl ${
                isMobile
                  ? "w-full max-w-sm max-h-[90vh]"
                  : "max-w-4xl max-h-[90vh] w-full"
              } overflow-hidden shadow-2xl border border-white/20`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Enhanced */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                className={`absolute top-4 right-4 z-10 ${
                  isMobile ? "w-12 h-12" : "w-11 h-11"
                } bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg border border-white/30`}
                aria-label="Close modal"
              >
                <X
                  className={`${isMobile ? "w-6 h-6" : "w-5 h-5"} text-gray-700`}
                />
              </motion.button>

              {/* Modal Header - Enhanced */}
              <div
                className={`${isMobile ? "p-5 pr-16" : "p-6 pr-16"} border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white`}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${isMobile ? "text-xl" : "text-2xl"} font-bold text-[#5c0b08] leading-tight`}
                >
                  {selectedMaterial.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`text-gray-600 mt-2 ${isMobile ? "text-sm" : "text-base"} leading-relaxed`}
                >
                  {selectedMaterial.description}
                </motion.p>
              </div>

              {/* Modal Content - Enhanced */}
              <div
                className={`${isMobile ? "p-4" : "p-6"} overflow-auto ${
                  isMobile ? "max-h-[65vh]" : "max-h-[60vh]"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`w-full ${
                    isMobile ? "h-80" : "h-96"
                  } bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner`}
                >
                  <OptimizedImage
                    src={selectedMaterial.presentationSvg}
                    alt={`${selectedMaterial.title} Presentation`}
                    className={`w-full h-full object-contain ${isMobile ? "p-2" : "p-4"}`}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />

                  {/* Fallback content */}
                  <div className="hidden flex-col items-center justify-center text-gray-500 p-8 text-center">
                    <BookOpen
                      className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} mb-4 text-gray-400`}
                    />
                    <h3
                      className={`${isMobile ? "text-lg" : "text-xl"} font-semibold mb-2`}
                    >
                      Materi {selectedMaterial.title}
                    </h3>
                    <p
                      className={`${isMobile ? "text-sm" : "text-base"} leading-relaxed max-w-md`}
                    >
                      {selectedMaterial.content ||
                        "Materi pembelajaran akan ditampilkan di sini."}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MateriPramukaPage;
