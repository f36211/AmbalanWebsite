import React, { useRef, useState, memo } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Map as MapIcon, Compass, BookOpen, Anchor, Layers, Target, Ruler, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Section = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} className={className}>
      {children}
    </motion.div>
  );
};

const Peta = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #5c0b08 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link to="/materi-pramuka" className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-[#903d04] font-semibold text-sm hover:bg-[#903d04] hover:text-white transition-all shadow-sm group mb-8">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Kembali ke Materi
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#5c0b08] flex items-center justify-center">
              <MapIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#5c0b08]">Peta & Navigasi</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">Materi dasar membaca peta, komponen peta, dan navigasi darat untuk kegiatan kepramukaan.</p>
        </div>

        {/* Pengertian with full-width old map */}
        <Section>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-10">
            <img src="/images/materi/PETA/world_map_1689-1.webp" alt="Peta Dunia Kuno 1689" className="w-full object-contain bg-[#f5f0e8]" loading="lazy" />
            <div className="p-5 sm:p-7">
              <h2 className="text-xl sm:text-2xl font-bold text-[#5c0b08] mb-1">Pengertian Peta</h2>
              <p className="text-sm font-semibold text-[#903d04] mb-4">Dasar Ilmu Kartografi</p>
              <p className="text-sm sm:text-base text-gray-700 leading-[1.85]">
                Peta adalah gambaran permukaan bumi yang ditampilkan pada suatu bidang datar dengan skala tertentu. Istilah <strong className="text-[#5c0b08]">peta</strong> berasal dari bahasa Yunani <em>"mappa"</em> yang berarti taplak atau kain penutup meja. Secara umum, peta merupakan lembaran seluruh atau sebagian permukaan bumi pada bidang datar yang diperkecil dengan menggunakan skala tertentu.
              </p>
            </div>
          </div>
        </Section>

        <div className="space-y-8 mb-12">
          {/* Syarat Peta */}
          <Section>
            <div className="bg-white border-l-4 border-[#903d04] rounded-xl shadow-sm p-5 sm:p-7">
              <h3 className="text-lg sm:text-xl font-bold text-[#5c0b08] mb-4">Syarat-Syarat Peta</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-[1.85] mb-4">Sebuah peta yang baik harus memenuhi tiga syarat utama:</p>
              <div className="space-y-4">
                {[
                  { term: "Conform", desc: "Bentuk peta yang digambar harus sebangun (mirip) dengan keadaan asli di lapangan. Peta harus merepresentasikan bentuk wilayah secara proporsional." },
                  { term: "Equidistance", desc: "Jarak di peta jika dikalikan dengan skala yang ditentukan harus sesuai dengan jarak sesungguhnya di lapangan. Ini menjamin akurasi pengukuran jarak." },
                  { term: "Equivalent", desc: "Daerah atau bidang yang digambar di peta, setelah dihitung dengan skalanya, harus sama luasnya dengan keadaan di lapangan." },
                ].map((item) => (
                  <div key={item.term} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#903d04] to-[#5c0b08] text-white flex items-center justify-center text-[11px] font-bold mt-0.5">✓</span>
                    <div><strong className="text-[#5c0b08]">{item.term}</strong><span className="text-sm sm:text-base text-gray-700"> — {item.desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Full-width Java topography */}
          <Section>
            <img src="/images/materi/PETA/java_locator_topography_ijen-1.webp" alt="Peta topografi Pulau Jawa" className="w-full rounded-xl object-contain bg-[#1a2332]" loading="lazy" />
            <p className="text-xs text-gray-400 text-center mt-2">Contoh peta topografi Pulau Jawa — menunjukkan ketinggian dan bentuk permukaan bumi</p>
          </Section>

          {/* Fungsi */}
          <Section>
            <h3 className="text-lg sm:text-xl font-bold text-[#5c0b08] mb-4">Fungsi Pembuatan Peta</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: Target, title: "Menunjukkan Posisi", desc: "Menunjukkan lokasi relatif suatu tempat dalam hubungannya dengan tempat lain di permukaan bumi." },
                { icon: Layers, title: "Menggambarkan Bentuk", desc: "Memperlihatkan bentuk-bentuk permukaan bumi seperti benua, pegunungan, sungai, dan laut." },
                { icon: Ruler, title: "Mengukur Jarak & Luas", desc: "Melalui peta dapat diukur luas daerah dan jarak-jarak di atas permukaan bumi dengan skala." },
                { icon: Compass, title: "Menyajikan Data Potensi", desc: "Menyajikan informasi tentang potensi suatu daerah untuk perencanaan dan analisis." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center"><Icon className="w-4 h-4 text-[#903d04]" /></div>
                      <h4 className="text-sm font-bold text-[#5c0b08]">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Tujuan */}
          <Section>
            <h3 className="text-lg sm:text-xl font-bold text-[#5c0b08] mb-3">Tujuan Pembuatan Peta</h3>
            <ul className="space-y-2 ml-1 text-sm sm:text-base text-gray-700 leading-[1.85]">
              {[
                "Membantu suatu pekerjaan seperti konstruksi jalan, navigasi, dan perencanaan wilayah.",
                "Analisis data spasial, misalnya perhitungan volume dan sebaran penduduk.",
                "Menyimpan informasi geografis secara terstruktur dan mudah diakses.",
                "Membantu dalam pembuatan desain infrastruktur, misalnya tata letak jalan.",
                "Komunikasi informasi ruang — menyampaikan data lokasi secara visual dan efisien.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#903d04] to-[#5c0b08] text-white flex items-center justify-center text-[11px] font-bold mt-0.5">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Unsur-unsur Peta */}
          <Section>
            <h3 className="text-lg sm:text-xl font-bold text-[#5c0b08] mb-2">Unsur-Unsur Kelengkapan Peta</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-5">Peta dilengkapi berbagai komponen untuk mempermudah pembacaan:</p>
            <div className="space-y-3">
              {[
                { num: "1", title: "Judul Peta", desc: "Mencerminkan isi sekaligus tipe peta. Ditulis di bagian atas dengan huruf kapital." },
                { num: "2", title: "Legenda", desc: "Keterangan simbol-simbol pada peta — kunci utama untuk memahami informasi yang disajikan." },
                { num: "3", title: "Orientasi / Tanda Arah", desc: "Penunjuk arah mata angin. Umumnya arah utara ditunjukkan oleh tanda panah ke atas peta." },
                { num: "4", title: "Skala", desc: "Perbandingan jarak pada peta dengan jarak sesungguhnya. Contoh: 1:50.000 berarti 1 cm = 500 m." },
                { num: "5", title: "Simbol Peta", desc: "Tanda atau gambar yang mewakili kenampakan di permukaan bumi, seperti jalan, sungai, dan gunung." },
                { num: "6", title: "Warna Peta", desc: "Biru untuk perairan, hijau untuk dataran rendah, cokelat untuk pegunungan, putih untuk salju." },
                { num: "7", title: "Tipe Huruf (Lettering)", desc: "Huruf kapital untuk daratan, huruf miring untuk perairan — mempertegas arti simbol." },
                { num: "8", title: "Garis Astronomis", desc: "Garis lintang (barat-timur) dan bujur (utara-selatan) untuk menunjukkan letak absolut." },
                { num: "9", title: "Inset", desc: "Peta kecil yang disisipkan di peta utama untuk menunjukkan konteks lokasi yang lebih luas." },
                { num: "10", title: "Garis Tepi Peta", desc: "Garis pembatas ruang peta dan tempat meletakkan informasi koordinat astronomis." },
                { num: "11", title: "Sumber Peta", desc: "Referensi dari mana data peta diperoleh untuk menjamin keakuratan informasi." },
                { num: "12", title: "Garis Lintang & Bujur", desc: "Membentuk grid koordinat bumi — lintang melintang, bujur membujur." },
              ].map((item) => (
                <div key={item.num} className="flex gap-3 items-start bg-white rounded-xl border border-gray-200 p-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#5c0b08] text-white flex items-center justify-center text-xs font-bold">{item.num}</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#5c0b08] mb-0.5">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Tips */}
          <Section>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-5 h-5 text-[#9c7502]" />
                <h3 className="text-base sm:text-lg font-bold text-[#9c7502]">Tips Navigasi untuk Pramuka</h3>
              </div>
              <div className="space-y-3">
                {[
                  { emoji: "🧭", title: "Orientasikan Peta", desc: "Pastikan arah utara peta sejajar dengan utara kompas sebelum membaca." },
                  { emoji: "📏", title: "Pahami Skala", desc: "Latihlah menghitung jarak sesungguhnya dari jarak di peta agar tidak tersesat." },
                  { emoji: "🏔️", title: "Baca Kontur", desc: "Garis kontur rapat = tanjakan curam, renggang = dataran landai. Penting saat mendaki!" },
                  { emoji: "⭐", title: "Navigasi Alam", desc: "Tanpa kompas: matahari terbit di timur, terbenam di barat. Malam hari, Polaris menunjuk utara." },
                ].map((tip) => (
                  <div key={tip.title} className="bg-white/70 rounded-lg p-4 border border-amber-100">
                    <h4 className="text-sm font-bold text-[#5c0b08] mb-1">{tip.emoji} {tip.title}</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* Bottom Nav */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          <Link to="/simpul-ikatan">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-[#5c0b08] transition-all"><Anchor className="w-5 h-5 text-[#903d04] group-hover:text-white" /></div>
              <div className="flex-1"><h4 className="font-semibold text-[#5c0b08] text-sm">Simpul & Ikatan</h4><p className="text-xs text-gray-500">Materi Sebelumnya</p></div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </Link>
          <Link to="/tokoh-pramuka">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-[#5c0b08] transition-all"><BookOpen className="w-5 h-5 text-[#903d04] group-hover:text-white" /></div>
              <div className="flex-1"><h4 className="font-semibold text-[#5c0b08] text-sm">Sri Sultan HB IX</h4><p className="text-xs text-gray-500">Materi Selanjutnya</p></div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Peta;
