import React, { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * KnotDetailModal — Split-view modal with image (left) and steps (right).
 * Responsive: stacks vertically on mobile, side-by-side on desktop.
 * Image supports zoom via scroll wheel and controls.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} knot - { id, title, description, image, steps, type }
 * @param {function} [onPrev] - Navigate to previous knot
 * @param {function} [onNext] - Navigate to next knot
 */
const KnotDetailModal = ({ isOpen, onClose, knot, onPrev, onNext }) => {
  const [scale, setScale] = useState(1);

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;

  // Reset zoom when knot changes
  useEffect(() => {
    setScale(1);
  }, [knot?.id]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard controls
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Mouse wheel zoom on image
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setScale((prev) => {
      const delta = e.deltaY > 0 ? -0.25 : 0.25;
      return Math.max(MIN_SCALE, Math.min(prev + delta, MAX_SCALE));
    });
  }, []);

  const zoomIn = () => setScale((s) => Math.min(s + 0.5, MAX_SCALE));
  const zoomOut = () => setScale((s) => Math.max(s - 0.5, MIN_SCALE));
  const resetZoom = () => setScale(1);

  if (!knot) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl max-h-[92vh] flex flex-col"
          >
            {/* ─── Header ─── */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-orange-50 bg-gradient-to-r from-slate-50 to-orange-50/30 flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#5c0b08] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {knot.id}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-bold text-[#5c0b08] truncate">
                    {knot.title}
                  </h2>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#903d04]">
                    {knot.type}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 flex items-center justify-center text-gray-500 transition-all flex-shrink-0 ml-3"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ─── Body: Image (left) + Steps (right) ─── */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">

              {/* Left — Image */}
              <div className="relative md:w-1/2 flex-shrink-0 bg-gradient-to-br from-slate-50 to-orange-50/20 flex flex-col">
                {/* Image area */}
                <div
                  className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden min-h-[220px] sm:min-h-[300px] md:min-h-0 cursor-zoom-in"
                  onWheel={handleWheel}
                  onDoubleClick={() => setScale(scale > 1 ? 1 : 2.5)}
                  style={{ cursor: scale > 1 ? "zoom-out" : "zoom-in" }}
                >
                  <motion.img
                    key={knot.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={knot.image}
                    alt={knot.title}
                    className="max-w-full max-h-full object-contain select-none"
                    style={{
                      transform: `scale(${scale})`,
                      transition: "transform 0.2s ease-out",
                    }}
                    draggable={false}
                  />
                </div>

                {/* Zoom controls bar */}
                <div className="flex items-center justify-center gap-1 px-4 py-2.5 bg-white/80 backdrop-blur-sm border-t border-orange-50 flex-shrink-0">
                  <button
                    onClick={zoomOut}
                    disabled={scale <= MIN_SCALE}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-all"
                    aria-label="Perkecil"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] text-gray-400 font-mono min-w-[3.5rem] text-center select-none">
                    {Math.round(scale * 100)}%
                  </span>

                  <button
                    onClick={zoomIn}
                    disabled={scale >= MAX_SCALE}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-all"
                    aria-label="Perbesar"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>

                  <div className="w-px h-4 bg-gray-200 mx-1" />

                  <button
                    onClick={resetZoom}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all"
                    aria-label="Reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right — Steps & Description */}
              <div className="flex-1 flex flex-col overflow-y-auto border-t md:border-t-0 md:border-l border-orange-100 min-h-0">
                <div className="p-5 sm:p-7 space-y-6">
                  {/* Description */}
                  <div>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {knot.description}
                    </p>
                  </div>

                  {/* Steps */}
                  <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Langkah Pembuatan
                    </h3>

                    <ol className="space-y-3">
                      {knot.steps.map((step, i) => (
                        <motion.li
                          key={i}
                          initial={{ x: 15, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 + i * 0.07 }}
                          className="flex gap-3 items-start"
                        >
                          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#903d04] to-[#5c0b08] text-white flex items-center justify-center text-xs font-bold shadow-sm mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed pt-1">
                            {step}
                          </p>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Footer with navigation ─── */}
            {(onPrev || onNext) && (
              <div className="flex items-center justify-between px-5 sm:px-7 py-3 border-t border-orange-50 bg-slate-50/50 flex-shrink-0">
                <button
                  onClick={onPrev}
                  disabled={!onPrev}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:text-[#903d04] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>

                <span className="text-xs text-gray-400 font-mono">
                  {knot.id} / 7
                </span>

                <button
                  onClick={onNext}
                  disabled={!onNext}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:text-[#903d04] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KnotDetailModal;
