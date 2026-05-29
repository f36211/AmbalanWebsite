import React from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Crown, Star, BookOpen, Award, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

// ─── Section Block with scroll animation ────────────────────────────────────────

const Section = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────────

const TokohPramuka = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Background pattern */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #5c0b08 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back button */}
        <Link
          to="/materi-pramuka"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-[#903d04] font-semibold text-sm hover:bg-[#903d04] hover:text-white transition-all shadow-sm group mb-8"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Kembali ke Materi
        </Link>

        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#5c0b08] flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#5c0b08]">Tokoh Pramuka</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            Mengenal sosok inspiratif di balik gerakan pramuka Indonesia.
          </p>
        </div>

        {/* ─── Hero: Portrait + Quick Bio ─── */}
        <Section>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-10">
            <div className="flex flex-col md:flex-row">
              {/* Portrait image */}
              <div className="md:w-[280px] lg:w-[320px] flex-shrink-0 bg-[#2a1f14] flex items-center justify-center p-6">
                <img
                  src="/images/materi/srisultan/photoofthesrisultan.webp"
                  alt="Sri Sultan Hamengkubuwana IX"
                  className="max-h-[300px] sm:max-h-[360px] object-contain rounded"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Quick bio */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#5c0b08] mb-1 leading-snug">
                  Sri Sultan Hamengkubuwana IX
                </h2>
                <p className="text-sm font-semibold text-[#903d04] mb-5">
                  Bapak Pramuka Indonesia (1912–1988)
                </p>

                {/* Key facts */}
                <div className="space-y-3">
                  {[
                    { label: "Nama Lahir", value: "Gusti Raden Mas Dorodjatun" },
                    { label: "Jabatan", value: "Sultan Yogyakarta ke-9, Gubernur DIY pertama" },
                    { label: "Pramuka", value: "Ketua Kwartir Nasional Gerakan Pramuka pertama" },
                    { label: "Wakil Presiden", value: "Wakil Presiden RI ke-2 (1973–1978)" },
                  ].map((fact) => (
                    <div key={fact.label} className="flex gap-3 text-sm">
                      <span className="text-gray-400 font-medium w-28 sm:w-32 flex-shrink-0">{fact.label}</span>
                      <span className="text-gray-800 font-semibold">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── Main Article Content ─── */}
        <div className="space-y-8 mb-12">

          {/* Biografi */}
          <Section>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#5c0b08] mb-3">
                Biografi Singkat
              </h3>
              <div className="text-sm sm:text-base text-gray-700 leading-[1.85] space-y-4">
                <p>
                  Sri Sultan Hamengkubuwana IX lahir dengan nama Gusti Raden Mas Dorodjatun pada 12 April 1912 di Yogyakarta. Beliau adalah Sultan Yogyakarta kesembilan sekaligus Gubernur Daerah Istimewa Yogyakarta yang pertama. Perannya dalam sejarah Indonesia sangat besar — tidak hanya sebagai pemimpin kerajaan, tetapi juga sebagai negarawan yang turut memperjuangkan kemerdekaan dan membangun bangsa.
                </p>
                <p>
                  Dalam dunia kepramukaan, Sri Sultan HB IX memiliki peran yang sangat istimewa. Beliau menjadi <strong className="text-[#5c0b08]">Ketua Kwartir Nasional (Kwarnas) Gerakan Pramuka yang pertama</strong> dan dikenal luas sebagai <strong className="text-[#5c0b08]">Bapak Pramuka Indonesia</strong>. Atas dedikasi dan kepemimpinannya, gerakan pramuka di Indonesia dapat bersatu di bawah satu wadah yang kokoh dan terorganisir.
                </p>
              </div>
            </div>
          </Section>

          {/* Second image */}
          <Section>
            <div className="bg-[#2a1f14] rounded-xl overflow-hidden flex items-center justify-center p-4 sm:p-6">
              <img
                src="/images/materi/srisultan/id.jpeg"
                alt="Sri Sultan Hamengkubuwana IX dalam kegiatan pramuka"
                className="max-h-[350px] sm:max-h-[420px] object-contain rounded"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Section>

          {/* Asal Usul Istilah Pramuka */}
          <Section>
            <div className="bg-white border-l-4 border-[#903d04] rounded-xl shadow-sm p-5 sm:p-7">
              <h3 className="text-lg sm:text-xl font-bold text-[#5c0b08] mb-3">
                Asal Usul Istilah "Pramuka"
              </h3>
              <div className="text-sm sm:text-base text-gray-700 leading-[1.85] space-y-4">
                <p>
                  Tahukah kamu bahwa istilah <strong className="text-[#903d04]">"Pramuka"</strong> berasal dari Sri Sultan Hamengkubuwana IX? Beliaulah yang memberikan nama tersebut untuk menggantikan istilah "Pandu" yang digunakan sebelumnya.
                </p>
                <p>
                  Kata <strong className="text-[#903d04]">Pramuka</strong> berasal dari bahasa Jawa, yaitu <em>"Praja Muda Karana"</em> yang berarti "Rakyat Muda yang Suka Berkarya". Selain itu, dalam tradisi Jawa juga dikenal istilah <em>"Poro Muko"</em> — sebutan bagi pasukan yang berada pada posisi terdepan dalam suatu pertempuran. Nama ini dipilih karena mencerminkan semangat pemuda yang selalu berani tampil di garis depan.
                </p>
              </div>
            </div>
          </Section>

          {/* Peran dalam Pramuka */}
          <Section>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#5c0b08] mb-3">
                Peran dalam Gerakan Pramuka Indonesia
              </h3>
              <div className="text-sm sm:text-base text-gray-700 leading-[1.85] space-y-4">
                <p>
                  Sri Sultan HB IX tidak hanya memberi nama, tetapi juga berperan aktif dalam penyatuan organisasi kepanduan di Indonesia. Pada awal tahun 1960-an, terdapat lebih dari 100 organisasi kepanduan yang terpisah-pisah. Di bawah kepemimpinan Sri Sultan sebagai Ketua Kwarnas, seluruh organisasi tersebut berhasil disatukan ke dalam satu wadah: <strong className="text-[#5c0b08]">Gerakan Pramuka</strong>.
                </p>
                <p>
                  Pada tanggal 14 Agustus 1961, Gerakan Pramuka resmi dilantik di Istana Negara. Sri Sultan HB IX menerima Panji-Panji Gerakan Pramuka dari Presiden Soekarno sebagai simbol persatuan seluruh gerakan kepanduan. Tanggal tersebut kemudian diperingati setiap tahun sebagai <strong className="text-[#5c0b08]">Hari Pramuka</strong>.
                </p>
                <p>
                  Beliau juga menjabat sebagai <strong>Wakil Presiden Republik Indonesia ke-2</strong> pada periode 1973–1978, menjadikannya salah satu tokoh paling berpengaruh dalam sejarah Indonesia modern.
                </p>
              </div>
            </div>
          </Section>

          {/* Fun Fact */}
          <Section>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-[#9c7502]" />
                <h3 className="text-base sm:text-lg font-bold text-[#9c7502]">Fun Fact</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white/70 rounded-lg p-4 border border-amber-100">
                  <h4 className="text-sm font-bold text-[#5c0b08] mb-1.5">
                    🏛️ PNS Pertama di Indonesia
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Sri Sultan Hamengkubuwana IX tercatat sebagai <strong>Pegawai Negeri Sipil (PNS) pertama</strong> di Indonesia dengan <strong>NIP (Nomor Induk Pegawai) 010000001</strong>. Ini menunjukkan betapa besarnya pengabdian beliau kepada negara sejak awal terbentuknya pemerintahan Republik Indonesia.
                  </p>
                </div>

                <div className="bg-white/70 rounded-lg p-4 border border-amber-100">
                  <h4 className="text-sm font-bold text-[#5c0b08] mb-1.5">
                    🏅 Gelar Pahlawan Nasional
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Atas jasa-jasanya yang luar biasa bagi bangsa dan negara, Sri Sultan HB IX dianugerahi gelar <strong>Pahlawan Nasional</strong> oleh pemerintah Republik Indonesia.
                  </p>
                </div>

                <div className="bg-white/70 rounded-lg p-4 border border-amber-100">
                  <h4 className="text-sm font-bold text-[#5c0b08] mb-1.5">
                    🤝 Yogyakarta untuk Republik
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Saat kemerdekaan diproklamasikan, Sri Sultan HB IX langsung menyatakan bergabung dengan Republik Indonesia dan menjadikan Yogyakarta sebagai ibu kota darurat saat Jakarta jatuh ke tangan Belanda pada Agresi Militer II (1948–1949).
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Quote */}
          <Section>
            <div className="text-center py-6">
              <Quote className="w-8 h-8 text-[#903d04]/20 mx-auto mb-3 rotate-180" />
              <blockquote className="text-lg sm:text-xl italic text-[#5c0b08] font-medium leading-relaxed max-w-2xl mx-auto mb-3">
                "Pramuka adalah rakyat muda yang suka berkarya — pemuda yang berani tampil di garis terdepan."
              </blockquote>
              <p className="text-sm text-gray-500">— Semangat di balik nama "Pramuka"</p>
            </div>
          </Section>
        </div>

        {/* Bottom Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          <Link to="/sejarah-pramuka">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-[#5c0b08] transition-all">
                <BookOpen className="w-5 h-5 text-[#903d04] group-hover:text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#5c0b08] text-sm">Sejarah Pramuka</h4>
                <p className="text-xs text-gray-500">Materi Terkait</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#903d04] transition-all" />
            </div>
          </Link>

          <Link to="/fakta-jambore">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-[#5c0b08] transition-all">
                <Award className="w-5 h-5 text-[#903d04] group-hover:text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#5c0b08] text-sm">Fakta Jambore</h4>
                <p className="text-xs text-gray-500">Materi Selanjutnya</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#903d04] transition-all" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TokohPramuka;
