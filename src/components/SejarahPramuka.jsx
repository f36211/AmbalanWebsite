import React, { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Flag,
  User,
  BookOpen,
  Search,
  X,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

// ─── Sections ───────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "baden-powell", label: "Baden-Powell", icon: User, accent: "#9c7502" },
  { id: "dunia", label: "Sejarah Dunia", icon: Globe, accent: "#903d04" },
  { id: "indonesia", label: "Sejarah Indonesia", icon: Flag, accent: "#5c0b08" },
];

// ─── Content Data — rich article content ────────────────────────────────────────

const CONTENT = {
  "baden-powell": {
    title: "Robert Baden-Powell",
    subtitle: "Bapak Pandu Sedunia (1857–1941)",
    heroImage: "/images/materi/materiresources/badenpowell.jpg",
    intro: "Robert Stephenson Smyth Baden-Powell, atau yang dikenal sebagai BP, adalah pendiri gerakan kepramukaan dunia. Lahir di London pada 22 Februari 1857, ia menginspirasi jutaan pemuda di seluruh penjuru bumi untuk menjadi pribadi yang mandiri, berkarakter, dan cinta alam.",
    sections: [
      {
        heading: "Masa Kecil & Pembentukan Karakter",
        content: "Baden-Powell lahir sebagai anak ke-8 dari 10 bersaudara. Ayahnya, Profesor H.G. Baden-Powell, adalah dosen Geometri di Universitas Oxford yang meninggal saat BP masih kecil. Sejak saat itu, ibunya Hannah menjadi sosok utama pembentuk wataknya — mengajarkan kemandirian, kejujuran, dan tanggung jawab.\n\nDari kakak-kakaknya, BP belajar keterampilan alam terbuka: berlayar, berenang, berkemah, dan menjelajah hutan. Ia dikenal sangat cerdas, gembira, humoris, dan multitalenta — ia bisa bermain musik, bersandiwara, mengarang, dan menggambar dengan baik sehingga disukai banyak teman.",
      },
      {
        heading: "Karir Militer & Pengalaman di Lapangan",
        content: "Setelah lulus sekolah, BP bergabung dengan tentara Inggris dan dikirim ke India sebagai pembantu Letnan pada Resimen 13 Kavaleri. Di India ia mengasah kemampuan pelacakan — berhasil mengikuti jejak kuda yang hilang hingga ke puncak gunung, serta melatih panca indera kepada Kimball O'Hara (yang kemudian menginspirasi tokoh Kim dalam novel Rudyard Kipling).\n\nPengalaman paling bersejarah terjadi di Afrika Selatan saat Perang Boer (1899-1900). Di kota Mafeking, BP dan pasukannya terkepung selama 217 hari oleh tentara Boer yang jumlahnya jauh lebih besar. Dalam kondisi kekurangan pasukan, ia melibatkan anak-anak muda setempat sebagai kurir dan pengantar pesan — dan mereka berhasil menjalankan tugas dengan luar biasa. Pengalaman inilah yang meyakinkan BP bahwa pemuda memiliki potensi besar jika diberikan kepercayaan dan pelatihan yang tepat.",
      },
      {
        heading: "Buku Aids to Scouting & Scouting for Boys",
        content: "Setelah kembali ke Inggris sebagai pahlawan perang, BP menulis buku \"Aids to Scouting\" yang awalnya ditujukan untuk tentara muda. Namun buku ini ternyata sangat populer di kalangan anak-anak dan remaja Inggris yang mempraktikkan teknik-teknik di dalamnya.\n\nMelihat antusiasme ini, BP memutuskan untuk menulis ulang materinya khusus untuk kaum muda. Hasilnya adalah \"Scouting for Boys\" (1908), buku panduan kepramukaan yang menjadi salah satu buku terlaris sepanjang masa dan diterjemahkan ke puluhan bahasa.",
      },
      {
        heading: "Perkemahan Pertama di Pulau Brownsea (1907)",
        content: "Pada 25 Juli 1907, BP mengajak 21 pemuda dari berbagai lapisan sosial untuk berkemah selama 8 hari di Pulau Brownsea, Selat Inggris. Perkemahan ini menjadi percobaan pertama metode kepramukaan: patroli, kegiatan alam terbuka, keterampilan bertahan hidup, dan pembentukan karakter melalui pengalaman langsung.\n\nHasilnya sangat positif — para peserta menunjukkan perkembangan karakter yang luar biasa. Momen ini dianggap sebagai titik lahir gerakan kepramukaan dunia.",
        highlight: true,
      },
      {
        heading: "Kehidupan Pribadi & Warisan",
        content: "Pada tahun 1910, BP pensiun dari tentara dengan pangkat Letnan Jenderal untuk fokus sepenuhnya mengembangkan gerakan pramuka. Ia menikah dengan Olave St. Clair Soames pada 1912 dan dikaruniai 3 anak.\n\nPada 1929, Raja George V menganugerahkan gelar Lord kepadanya, sehingga ia dikenal sebagai Lord Baden-Powell of Gilwell. BP wafat pada 8 Januari 1941 di Nyeri, Kenya. Di batu nisannya terukir simbol pramuka yang berarti \"Saya sudah pulang\" — sebuah pesan terakhir yang sederhana namun penuh makna.\n\nWarisannya hidup hingga kini: gerakan pramuka telah menyebar ke lebih dari 170 negara dengan lebih dari 50 juta anggota aktif di seluruh dunia.",
      },
    ],
  },
  dunia: {
    title: "Sejarah Pramuka Dunia",
    subtitle: "Dari Pulau Brownsea hingga 170+ Negara",
    heroImage: null,
    intro: "Gerakan kepramukaan lahir dari sebuah eksperimen kecil di sebuah pulau Inggris, kemudian berkembang menjadi gerakan pemuda terbesar di dunia. Berikut perjalanan penting perkembangan pramuka dunia.",
    sections: [
      {
        heading: "Lahirnya Gerakan Pramuka (1907–1908)",
        content: "Semuanya dimulai dari perkemahan percobaan di Pulau Brownsea pada 25 Juli 1907. Baden-Powell mengundang 21 pemuda dari berbagai latar belakang sosial untuk berkemah selama 8 hari. Kegiatan meliputi pelacakan, pertolongan pertama, pengamatan alam, dan keterampilan bertahan hidup.\n\nKeberhasilan perkemahan ini mendorong BP menulis \"Scouting for Boys\" yang terbit pada 1908. Buku ini memicu lahirnya kelompok-kelompok pramuka secara spontan di seluruh Inggris, lalu menyebar ke negara-negara lain.",
        highlight: true,
      },
      {
        heading: "Perkembangan Cabang Pramuka (1910–1920)",
        content: "Gerakan pramuka berkembang pesat dengan terbentuknya berbagai cabang:\n\n• 1910 — Girl Guides didirikan untuk pramuka putri, dibantu oleh Agnes Baden-Powell (adik BP) dan kemudian dilanjutkan oleh istrinya, Olave.\n• 1916 — CUB Scout (Pramuka Siaga) didirikan untuk usia yang lebih muda, dengan buku panduan terinspirasi dari \"The Jungle Book\" karya Rudyard Kipling.\n• 1918 — Rover Scout didirikan untuk kelompok remaja usia 17 tahun ke atas.",
      },
      {
        heading: "Jambore Dunia Pertama (1920)",
        content: "Pada 30 Juli hingga 8 Agustus 1920, Jambore Pramuka Dunia pertama diselenggarakan di Olympia Hall, London. Acara ini dihadiri sekitar 8.000 anggota pramuka dari 34 negara — sebuah pencapaian luar biasa mengingat dunia baru saja melewati Perang Dunia I.\n\nDalam jambore inilah Baden-Powell dinobatkan sebagai \"Chief Scout of the World\" (Bapak Pandu Sedunia) oleh seluruh delegasi. Dibentuk pula Dewan Internasional Organisasi Pramuka yang beranggotakan 9 orang sebagai badan koordinasi internasional.",
        highlight: true,
      },
      {
        heading: "Perkembangan Modern (1922–sekarang)",
        content: "Pada 1922, BP menerbitkan \"Rovering to Success\" yang menceritakan perumpamaan seorang pemuda mengayuh sampan menuju pantai kebahagiaan — menjadi inspirasi bagi jutaan pemuda.\n\nKantor sekretariat pramuka dunia berpindah dari London ke Ottawa, Kanada (1958), lalu ke Geneva, Swiss (1968) di mana ia berada hingga saat ini. Saat ini, World Organization of the Scout Movement (WOSM) menaungi organisasi pramuka dari lebih dari 170 negara dengan total lebih dari 50 juta anggota.",
      },
    ],
  },
  indonesia: {
    title: "Sejarah Pramuka Indonesia",
    subtitle: "Dari Organisasi Bentukan Belanda hingga Gerakan Pramuka",
    heroImage: null,
    intro: "Perjalanan kepramukaan di Indonesia sangat erat dengan sejarah perjuangan kemerdekaan. Organisasi kepanduan menjadi wadah bagi para pemuda Indonesia untuk menempa karakter dan semangat nasionalisme.",
    sections: [
      {
        heading: "Awal Mula: NPO & Kebangkitan Nasional (1912–1923)",
        content: "Pada tahun 1912, pemerintah Belanda mendirikan Nederlandsche Padvinders Organisatie (NPO) di Hindia Belanda. Organisasi ini awalnya hanya untuk anak-anak Belanda, namun kemudian memberi inspirasi bagi bangsa Indonesia untuk membentuk organisasi kepanduan sendiri.\n\nPada 1916, NPO berganti nama menjadi NIPV. Di tahun yang sama, S.P. Mangkunegara VII memprakarsai Javaansche Padvinders Organisatie (JPO) — organisasi kepanduan pertama bentukan bangsa Indonesia. Ini menjadi tonggak awal kebangkitan kepanduan nasional.",
      },
      {
        heading: "Pasca Sumpah Pemuda: Kepanduan & Nasionalisme (1928)",
        content: "Setelah Sumpah Pemuda 1928, semangat persatuan melahirkan berbagai organisasi kepanduan yang bernapaskan nasionalisme dan keagamaan:",
        list: [
          "Hizbul Wathan (HW) — didirikan oleh Muhammadiyah",
          "Nationale Padvinderij — didirikan oleh Budi Utomo",
          "SIAP — didirikan oleh Syarikat Islam",
          "NATIPIJ — didirikan oleh Jong Islamieten Bond",
          "INPO — didirikan oleh Pemuda Indonesia",
        ],
        afterList: "Pada 23 Mei 1928, dibentuk Persaudaraan Antara Pandu Indonesia (PAPI) untuk mewadahi semua organisasi kepanduan. Pada 1930, PAPI melebur menjadi Kepanduan Bangsa Indonesia (KBI), yang kemudian berkembang menjadi BPPKI.",
        highlight: true,
      },
      {
        heading: "Masa Penjajahan Jepang & Kemerdekaan (1942–1945)",
        content: "Saat Jepang menduduki Indonesia (1942–1945), semua organisasi kepanduan dilarang berdiri. Gerakan kepanduan terpaksa berhenti secara resmi, meskipun semangat dan nilai-nilainya tetap hidup di hati para anggotanya.\n\nSetelah proklamasi kemerdekaan 17 Agustus 1945, para tokoh kepanduan segera bergerak. Pada 27–29 Desember 1945, diadakan Kongres Kesatuan Kepanduan Indonesia di Surakarta. Hasilnya: terbentuknya Pandu Rakyat Indonesia, yang diakui pemerintah sebagai satu-satunya organisasi kepanduan melalui keputusan Menteri Pendidikan pada 1 Februari 1947.",
      },
      {
        heading: "Lahirnya Gerakan Pramuka (14 Agustus 1961)",
        content: "Keputusan organisasi tunggal ternyata dianulir, sehingga bermunculan organisasi kepanduan baru. Di awal tahun 60-an, diperkirakan ada lebih dari 100 organisasi kepanduan yang bernaung pada tiga federasi: IPINDO, PKPI, dan POPPINDO.\n\nUntuk menyatukan kembali gerakan kepanduan, Presiden Soekarno menerbitkan Keputusan Presiden No. 238 Tahun 1961. Pada tanggal 14 Agustus 1961, dilakukan pelantikan Majelis Pimpinan Nasional (Mapinas), Kwartir Nasional (Kwarnas), dan Kwartir Nasional Harian (Kwarnari) di Istana Negara, disertai penganugerahan Panji-Panji Gerakan Pramuka oleh Presiden.\n\nSejak saat itu, tanggal 14 Agustus diperingati sebagai Hari Pramuka. Gerakan Pramuka menjadi satu-satunya organisasi kepramukaan di Indonesia yang diakui oleh pemerintah dan WOSM (World Organization of the Scout Movement).",
        highlight: true,
      },
    ],
  },
};

// ─── Article Section Card ───────────────────────────────────────────────────────

const SectionBlock = ({ section, index, accent }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.05 }}
      className={`relative ${section.highlight ? "bg-white border-l-4 rounded-xl shadow-sm p-5 sm:p-7" : ""}`}
      style={section.highlight ? { borderColor: accent } : {}}
    >
      <h3 className="text-lg sm:text-xl font-bold text-[#5c0b08] mb-3 leading-snug">
        {section.heading}
      </h3>

      {/* Main content — preserve newlines for paragraphs */}
      <div className="text-sm sm:text-base text-gray-700 leading-[1.85] whitespace-pre-line">
        {section.content}
      </div>

      {/* Bullet list if present */}
      {section.list && (
        <ul className="mt-4 space-y-2 ml-1">
          {section.list.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700">
              <span
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: accent }}
              />
              {item}
            </li>
          ))}
        </ul>
      )}

      {section.afterList && (
        <p className="mt-4 text-sm sm:text-base text-gray-700 leading-[1.85]">
          {section.afterList}
        </p>
      )}
    </motion.div>
  );
};

// ─── Search ─────────────────────────────────────────────────────────────────────

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const out = [];
    for (const sec of SECTIONS) {
      const data = CONTENT[sec.id];
      data.sections.forEach((s, i) => {
        if (s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)) {
          out.push({ sectionId: sec.id, label: sec.label, heading: s.heading, idx: i });
        }
      });
    }
    return out.slice(0, 6);
  }, [query]);

  return (
    <div className="relative w-full max-w-sm mb-8">
      <div className="relative flex items-center bg-white rounded-xl border border-gray-200 shadow-sm">
        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Cari tokoh, peristiwa..."
          className="w-full pl-10 pr-9 py-2.5 bg-transparent text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#903d04]/20"
        />
        {query && (
          <button onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="absolute right-3 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-50"
          >
            {results.map((r, i) => (
              <button
                key={i}
                onMouseDown={() => { onSelect(r.sectionId); setQuery(""); setOpen(false); }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{r.label}</span>
                <p className="text-sm font-semibold text-gray-800 truncate">{r.heading}</p>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────────

const SejarahPramuka = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") ?? "baden-powell";
  const validTab = SECTIONS.find((s) => s.id === tabFromUrl)?.id ?? "baden-powell";
  const [activeSection, setActiveSection] = useState(validTab);

  const data = CONTENT[activeSection];
  const meta = SECTIONS.find((s) => s.id === activeSection);

  const changeSection = useCallback((id) => {
    setActiveSection(id);
    setSearchParams({ tab: id }, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setSearchParams]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Background */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #5c0b08 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back button */}
        <Link
          to="/materi-pramuka"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-[#903d04] font-semibold text-sm hover:bg-[#903d04] hover:text-white transition-all shadow-sm group mb-8"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Kembali ke Materi
        </Link>

        {/* Page title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#5c0b08] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#5c0b08]">Sejarah Pramuka</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
            Menelusuri perjalanan gerakan kepramukaan dari awal mula hingga menjadi gerakan pemuda terbesar di Indonesia dan dunia.
          </p>
        </div>

        {/* Search */}
        <SearchBar onSelect={changeSection} />

        {/* Section tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => changeSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "text-white shadow-md"
                    : "bg-white text-gray-500 hover:text-[#903d04] hover:bg-orange-50 border border-gray-200"
                }`}
                style={isActive ? { backgroundColor: section.accent } : {}}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Article content */}
        <AnimatePresence mode="wait">
          <motion.article
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero header for the section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
              {data.heroImage && (
                <div className="bg-[#3d2b1a] flex items-center justify-center py-6">
                  <img
                    src={data.heroImage}
                    alt={data.title}
                    className="max-h-[320px] sm:max-h-[400px] object-contain rounded"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <div className="p-5 sm:p-7">
                <h2 className="text-xl sm:text-2xl font-bold text-[#5c0b08] mb-1">
                  {data.title}
                </h2>
                <p className="text-sm font-medium mb-4" style={{ color: meta.accent }}>
                  {data.subtitle}
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {data.intro}
                </p>
              </div>
            </div>

            {/* Article sections */}
            <div className="space-y-8">
              {data.sections.map((section, idx) => (
                <SectionBlock
                  key={idx}
                  section={section}
                  index={idx}
                  accent={meta.accent}
                />
              ))}
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-[#5c0b08] mb-2">Jelajahi Materi Lainnya</h3>
            <p className="text-sm text-gray-600 mb-5">
              Pelajari simpul & ikatan, navigasi, dan materi kepramukaan lainnya.
            </p>
            <Link
              to="/materi-pramuka"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5c0b08] text-white text-sm font-semibold rounded-xl hover:shadow-md transition-all"
            >
              Lihat Semua Materi <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SejarahPramuka;
