import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Anchor, 
  Key, 
  ArrowRight, 
  ChevronLeft, 
  History, 
  Search,
  X,
  ZoomIn,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import KnotDetailModal from "./ui/ImageLightbox";

// ─── Static Data ────────────────────────────────────────────────────────────────

const knotsData = [
  {
    id: 1,
    title: "Simpul Mati (Reef Knot)",
    description: "Digunakan untuk menyambung dua utas tali yang sama besar dan dalam keadaan kering.",
    steps: [
      "Letakkan ujung tali kiri di atas tali kanan.",
      "Putar ujung tali kiri di bawah tali kanan (seperti mengikat tali sepatu awal).",
      "Ambil ujung tali kanan (yang tadinya kiri) dan letakkan di atas ujung tali kiri.",
      "Masukkan ujungnya dan tarik kuat-kuat hingga membentuk simpul yang rapi."
    ],
    image: "/images/materi/simpulpramuka/simpul1.png",
    type: "Simpul"
  },
  {
    id: 2,
    title: "Simpul Hidup (Slip Knot)",
    description: "Digunakan untuk mengikat tiang atau benda, namun sangat mudah untuk dilepas kembali.",
    steps: [
      "Buat sebuah lingkaran (sosok) pada tali.",
      "Masukkan bagian tali (bukan ujungnya) ke dalam lingkaran tersebut untuk membentuk lingkaran baru.",
      "Tarik bagian tali tersebut untuk mengencangkan.",
      "Simpul ini akan terlepas jika ujung talinya ditarik."
    ],
    image: "/images/materi/simpulpramuka/simpul2.png",
    type: "Simpul"
  },
  {
    id: 3,
    title: "Simpul Pangkal (Clove Hitch)",
    description: "Simpul awal yang paling penting untuk memulai suatu ikatan pada tiang atau kayu.",
    steps: [
      "Lingkarkan tali pada tongkat atau kayu.",
      "Silangkan tali tersebut di atas lilitan pertama.",
      "Lingkarkan sekali lagi di sebelah lilitan pertama.",
      "Selipkan ujung tali di bawah lilitan terakhir dan tarik kencang."
    ],
    image: "/images/materi/simpulpramuka/simpul3.png",
    type: "Ikatan"
  },
  {
    id: 4,
    title: "Simpul Tiang (Bowline Knot)",
    description: "Digunakan untuk membuat sosok tali yang tidak akan menyempit meskipun ditarik sangat kuat.",
    steps: [
      "Buat sebuah lingkaran kecil pada tali (tali utama di bawah).",
      "Masukkan ujung tali dari bawah ke dalam lingkaran kecil tersebut.",
      "Lewatkan ujung tali di belakang tali utama.",
      "Masukkan kembali ujung tali ke dalam lingkaran kecil dan tarik kencang."
    ],
    image: "/images/materi/simpulpramuka/simpul4.png",
    type: "Simpul"
  },
  {
    id: 5,
    title: "Simpul Jangkar (Cow Hitch)",
    description: "Digunakan untuk membuat tandu darurat atau mengikat benda berbentuk ring/lingkaran.",
    steps: [
      "Tekuk tali menjadi dua bagian yang sama panjang.",
      "Letakkan tekukan tali tersebut di bawah atau di atas benda yang akan diikat.",
      "Masukkan kedua ujung tali ke dalam lubang tekukan (sosok) tersebut.",
      "Tarik kedua ujung tali hingga kencang."
    ],
    image: "/images/materi/simpulpramuka/simpul5.png",
    type: "Ikatan"
  },
  {
    id: 6,
    title: "Simpul Anyam (Sheet Bend)",
    description: "Digunakan untuk menyambung dua utas tali yang ukurannya tidak sama besar dalam keadaan kering.",
    steps: [
      "Tekuk tali yang lebih besar sehingga membentuk sebuah sosok (lingkaran).",
      "Masukkan ujung tali yang lebih kecil ke dalam sosok tersebut dari bawah.",
      "Lingkarkan tali kecil di bawah kedua bagian tali besar.",
      "Selipkan ujung tali kecil di bawah badannya sendiri, di atas tali besar."
    ],
    image: "/images/materi/simpulpramuka/simpul6.png",
    type: "Simpul"
  },
  {
    id: 7,
    title: "Simpul Anyam Berganda (Double Sheet Bend)",
    description: "Digunakan untuk menyambung dua utas tali yang ukurannya tidak sama besar dalam keadaan basah atau licin.",
    steps: [
      "Lakukan langkah yang sama seperti simpul anyam tunggal.",
      "Lilitkan tali yang lebih kecil dua kali pada sosok tali yang lebih besar.",
      "Selipkan ujung tali kecil di bawah badannya sendiri.",
      "Tarik kuat agar tidak mudah slip atau lepas."
    ],
    image: "/images/materi/simpulpramuka/simpul7.png",
    type: "Simpul"
  }
];

// ─── Knot Card — learning-focused layout ────────────────────────────────────────
// Desktop: image left + content right (side by side)
// Mobile: image top + content bottom (stacked)

const KnotCard = React.memo(({ knot, onOpenModal }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image — always visible, clickable for zoom */}
        <div
          className="relative sm:w-[260px] md:w-[300px] flex-shrink-0 bg-gray-50 cursor-pointer group"
          onClick={() => onOpenModal(knot)}
          role="button"
          tabIndex={0}
          aria-label={`Perbesar gambar ${knot.title}`}
          onKeyDown={(e) => e.key === 'Enter' && onOpenModal(knot)}
        >
          <div className="aspect-square sm:aspect-auto sm:h-full flex items-center justify-center p-5">
            <img 
              src={knot.image} 
              alt={knot.title}
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-[240px] sm:max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
            />
          </div>

          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-sm border border-gray-100 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-600">
            <ZoomIn className="w-3 h-3" /> Perbesar
          </div>

          {/* Type badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="bg-[#5c0b08] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
              {knot.id}
            </span>
            <span className="bg-white/90 backdrop-blur-sm text-[#903d04] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border border-orange-100">
              {knot.type}
            </span>
          </div>
        </div>

        {/* Content — always visible, no collapsing */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col">
          {/* Title + description */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-[#5c0b08] mb-1.5 leading-snug">
              {knot.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {knot.description}
            </p>
          </div>

          {/* Steps — ALWAYS visible, this is the learning content */}
          <div className="flex-1">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Langkah Pembuatan
            </h4>
            <ol className="space-y-2.5">
              {knot.steps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#903d04] to-[#5c0b08] text-white flex items-center justify-center text-[11px] font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed pt-0.5">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* View detail button */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={() => onOpenModal(knot)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#903d04] hover:text-[#5c0b08] transition-colors"
            >
              <Eye className="w-4 h-4" />
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

KnotCard.displayName = 'KnotCard';

// ─── Main Component ─────────────────────────────────────────────────────────────

const SimpulIkatan = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalKnot, setModalKnot] = useState(null);

  const filteredKnots = useMemo(() => {
    return knotsData.filter(knot => {
      const matchesTab = activeTab === "Semua" || knot.type === activeTab;
      const matchesSearch = knot.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          knot.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const openModal = useCallback((knot) => {
    setModalKnot(knot);
  }, []);

  const closeModal = useCallback(() => {
    setModalKnot(null);
  }, []);

  const goToPrev = useCallback(() => {
    if (!modalKnot) return;
    const idx = knotsData.findIndex(k => k.id === modalKnot.id);
    if (idx > 0) setModalKnot(knotsData[idx - 1]);
  }, [modalKnot]);

  const goToNext = useCallback(() => {
    if (!modalKnot) return;
    const idx = knotsData.findIndex(k => k.id === modalKnot.id);
    if (idx < knotsData.length - 1) setModalKnot(knotsData[idx + 1]);
  }, [modalKnot]);

  const currentIdx = modalKnot ? knotsData.findIndex(k => k.id === modalKnot.id) : -1;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < knotsData.length - 1;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #5c0b08 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <Link 
          to="/materi-pramuka"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-[#903d04] font-semibold text-sm hover:bg-[#903d04] hover:text-white transition-all shadow-sm group mb-8"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Kembali ke Materi
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#5c0b08] flex items-center justify-center">
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#5c0b08]">
                Simpul & Ikatan
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {knotsData.length} materi tersedia
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-base text-gray-700 leading-relaxed">
              Dalam kepramukaan tentu tidak asing dengan istilah simpul dan ikatan. 
              <strong className="text-[#903d04]"> Simpul berbeda dengan ikatan</strong> — 
              simpul adalah ikatan tali dengan tali, sedangkan ikatan adalah ikatan tali dengan benda. 
              Berikut ini simpul dan ikatan yang sering digunakan dalam kepramukaan.
            </p>
          </div>
        </div>

        {/* Search & Filter — compact */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          {/* Tabs */}
          <div className="inline-flex p-1 bg-white rounded-xl border border-gray-200 shadow-sm">
            {["Semua", "Simpul", "Ikatan"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-[#5c0b08] text-white shadow"
                    : "text-gray-500 hover:text-[#903d04] hover:bg-gray-50"
                }`}
              >
                {tab}
                {tab !== "Semua" && (
                  <span className="ml-1 opacity-70">
                    ({knotsData.filter(k => k.type === tab).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari simpul atau ikatan..."
              className="w-full pl-10 pr-9 py-2.5 bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#903d04]/20 focus:border-[#903d04]/30"
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
        </div>

        {/* Results counter when filtering */}
        {(searchQuery || activeTab !== "Semua") && (
          <p className="text-sm text-gray-500 mb-4">
            Menampilkan <span className="font-semibold text-[#903d04]">{filteredKnots.length}</span> dari {knotsData.length} materi
          </p>
        )}

        {/* Knot Cards — single column for readability */}
        <div className="space-y-5 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredKnots.map((knot) => (
              <KnotCard
                key={knot.id}
                knot={knot}
                onOpenModal={openModal}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredKnots.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-1">Tidak ditemukan</h3>
            <p className="text-sm text-gray-400">Coba kata kunci lain atau ganti filter.</p>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          <Link to="/sandi-pramuka">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-[#5c0b08] transition-all">
                <Key className="w-5 h-5 text-[#903d04] group-hover:text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#5c0b08] text-sm">Sandi Pramuka</h4>
                <p className="text-xs text-gray-500">Materi Selanjutnya</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#903d04] group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>

          <Link to="/sejarah-pramuka">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-[#5c0b08] transition-all">
                <History className="w-5 h-5 text-[#903d04] group-hover:text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#5c0b08] text-sm">Sejarah Pramuka</h4>
                <p className="text-xs text-gray-500">Materi Sebelumnya</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#903d04] group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        </div>
      </div>

      {/* Detail Modal */}
      <KnotDetailModal
        isOpen={!!modalKnot}
        onClose={closeModal}
        knot={modalKnot}
        onPrev={hasPrev ? goToPrev : null}
        onNext={hasNext ? goToNext : null}
      />
    </div>
  );
};

export default SimpulIkatan;
