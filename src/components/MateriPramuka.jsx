import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  History,
  Anchor,
  Map as MapIcon,
  User,
  Info,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { materiPramukaData as fallbackData } from "../data/index.js";
import { client, urlFor } from "../sanity/client";

// ─── Optimized Image with lazy loading & error state ─────────────────────────

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
        <div className="flex absolute inset-0 justify-center items-center bg-gray-100 animate-pulse">
          <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
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
        <div className="flex justify-center items-center w-full h-full bg-gray-100">
          <BookOpen className="w-8 h-8 text-gray-300" />
        </div>
      )}
    </div>
  );
};

// ─── Additional topics (dedicated pages) ─────────────────────────────────────

const additionalTopics = [
  {
    id: "T1",
    title: "Sejarah Pramuka",
    path: "/sejarah-pramuka",
    icon: "/images/materi/sejarahpramuka.png",
    description: "Asal usul dan perkembangan kepanduan di Indonesia dan Dunia.",
    image: "",
    category: "Pengetahuan",
  },
  {
    id: "T2",
    title: "Simpul & Ikatan",
    path: "/simpul-ikatan",
    icon: Anchor,
    description: "Teknik dasar simpul, ikatan, dan jerat dalam pionering.",
    image: "/images/imags/scarf.jpg",
    category: "Pengetahuan",
  },
  {
    id: "T3",
    title: "Peta & Navigasi",
    path: "/peta",
    icon: MapIcon,
    description: "Membaca koordinat, kompas, dan orientasi medan.",
    image: "/images/imags/scarf.jpg",
    category: "Pengetahuan",
  },
  {
    id: "T4",
    title: "Sri Sultan HB IX",
    path: "/tokoh-pramuka",
    icon: User,
    description: "Mengenal lebih dalam Bapak Pramuka Indonesia.",
    image: "/images/imags/scarf.jpg",
    category: "Tokoh",
  },
  {
    id: "T5",
    title: "Fakta Jambore",
    path: "/fakta-jambore",
    icon: Info,
    description: "Sejarah dan fakta menarik mengenai kegiatan Jambore.",
    image: "/images/imags/scarf.jpg",
    category: "Pengetahuan",
  },
];

// ─── Materi Card — readable, clear ──────────────────────────────────────────

const MateriCard = React.memo(({ material, onClick }) => {
  const isSpecial = material.type === "special";

  const CardWrapper = isSpecial ? Link : "div";
  const wrapperProps = isSpecial
    ? { to: material.path }
    : { onClick, className: "cursor-pointer" };

  return (
    <CardWrapper {...wrapperProps} className={`group block h-full ${isSpecial ? '' : 'cursor-pointer'}`}>
      <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 overflow-hidden flex flex-col">
        {/* Image area */}
        <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
          {material.icon ? (
            typeof material.icon === "string" ? (
              <img
                src={material.icon}
                alt={material.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full bg-gradient-to-br from-orange-50 to-amber-50">
                <material.icon className="w-12 h-12 text-[#903d04] group-hover:scale-110 transition-transform duration-300" />
              </div>
            )
          ) : (
            <OptimizedImage
              src={material.image}
              alt={material.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}

          {/* Category badge */}
          <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#5c0b08] tracking-wide uppercase shadow-sm">
            {material.category}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <h3 className="text-sm sm:text-base font-bold text-[#5c0b08] mb-1.5 leading-snug group-hover:text-[#903d04] transition-colors line-clamp-2">
            {material.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1 mb-3">
            {material.description}
          </p>
          <div className="flex items-center text-xs font-semibold text-[#903d04] gap-1.5 group-hover:gap-2.5 transition-all">
            {isSpecial ? "PELAJARI" : "BACA"} <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </CardWrapper>
  );
});

MateriCard.displayName = 'MateriCard';

// ─── Main Component ─────────────────────────────────────────────────────────

const MateriPramukaPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [materials, setMaterials] = useState(fallbackData.materials);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const ITEMS_PER_PAGE = isMobile ? 8 : 12;

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
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
              id: index + 1,
              _id: item._id,
              title: item.title,
              description: item.description,
              content: item.content,
              category: "Umum",
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

  // Combine main + special materials, then filter
  const filteredMaterials = useMemo(() => {
    const mainMaterials = materials.map((m) => ({
      ...m,
      type: "main",
      category: m.category || "Umum",
    }));
    const specialMaterials = additionalTopics.map((t) => ({
      ...t,
      type: "special",
    }));
    const combined = [...mainMaterials, ...specialMaterials];

    return combined.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "Semua" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [materials, searchQuery, activeCategory]);

  const categories = useMemo(() => {
    const cats = new Set(["Semua"]);
    materials.forEach((m) => cats.add(m.category || "Umum"));
    additionalTopics.forEach((t) => cats.add(t.category));
    return Array.from(cats);
  }, [materials]);

  const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);
  const currentMaterials = filteredMaterials.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextPage = useCallback(
    () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1)),
    [totalPages]
  );
  const prevPage = useCallback(
    () => setCurrentPage((prev) => Math.max(prev - 1, 0)),
    [totalPages]
  );

  const openModal = useCallback((material) => {
    if (material.type === "special") return;
    setSelectedMaterial(material);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedMaterial(null);
    document.body.style.overflow = "unset";
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/images/imags/materi.svg"
          alt="Background"
          className="object-cover object-center w-full h-full max-md:object-none"
          style={{ objectPosition: "center center" }}
          onLoad={() => setBackgroundLoaded(true)}
        />
        {!backgroundLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        )}
        <div className={`absolute inset-0 ${isMobile ? "bg-white/30 backdrop-blur-[1px]" : "bg-white/15 backdrop-blur-[0.5px]"}`} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col px-4 py-6 sm:px-6 md:py-10 lg:px-8">
        <div className="mx-auto w-full max-w-6xl flex-1 flex flex-col">
          
          {/* Search + Filter bar */}
          <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/60 shadow-lg p-3 sm:p-4 mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari materi pembelajaran..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#903d04]/20 focus:border-[#903d04]/30 text-gray-800 placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeCategory === cat
                        ? "bg-[#5c0b08] text-white shadow-md"
                        : "bg-white text-gray-500 hover:text-[#903d04] hover:bg-orange-50 border border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            {(searchQuery || activeCategory !== "Semua") && (
              <p className="text-xs text-gray-500 mt-2.5 pl-1">
                {filteredMaterials.length} materi ditemukan
              </p>
            )}
          </div>

          {/* Materials Grid — 2 cols mobile, 3 cols tablet, 4 cols desktop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8"
            >
              {currentMaterials.map((material, idx) => (
                <motion.div
                  key={material.id || material.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                >
                  <MateriCard
                    material={material}
                    onClick={() => openModal(material)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredMaterials.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center py-16">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-1">Tidak ditemukan</h3>
                <p className="text-sm text-gray-400">Coba kata kunci lain atau ganti filter.</p>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-auto pt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-[#903d04] disabled:opacity-30 border border-white/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentPage 
                        ? "w-8 bg-[#903d04]" 
                        : "w-2 bg-[#903d04]/20 hover:bg-[#903d04]/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-[#903d04] disabled:opacity-30 border border-white/50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Material Detail Modal */}
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-4xl max-h-[88vh] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex justify-between items-center px-5 py-4 md:px-8 md:py-5 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-base md:text-xl font-bold text-[#5c0b08] line-clamp-1 pr-4">
                  {selectedMaterial.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="flex-shrink-0 w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal body */}
              <div className="overflow-auto flex-1 p-5 md:p-8 bg-gray-50/50">
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Presentation image */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden aspect-video">
                    <OptimizedImage
                      src={selectedMaterial.presentationSvg}
                      alt={selectedMaterial.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Description */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 md:p-8">
                    <h3 className="text-sm md:text-base font-bold text-[#5c0b08] mb-3 flex items-center gap-2">
                      <div className="w-1 h-5 bg-[#903d04] rounded-full" />
                      Deskripsi Materi
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700 whitespace-pre-line">
                      {selectedMaterial.content || selectedMaterial.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MateriPramukaPage;
