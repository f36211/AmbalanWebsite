import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Trophy, Users } from "lucide-react";
import { tentangKamiData as fallbackData } from "../data/index.js";
import { client } from "../sanity/client";

const TentangKami = ({ isVisible = {} }) => {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "tentangKami"][0]`;
        if (client) {
          const result = await client.fetch(query);
          if (result) {
            // Start mapping Sanity data to component structure
            const mappedData = {
              title: result.title || fallbackData.title,
              identitas: {
                title: result.identitas?.title || "Identitas Ambalan",
                alamat: {
                  nama: result.identitas?.namaAmbalan || "SMAIT Ummul Quro",
                  jalan: result.identitas?.alamat
                    ? result.identitas.alamat.split(",")[0]
                    : "Jl. Raya Dramaga No. 123",
                  kecamatan: result.identitas?.alamat
                    ? result.identitas.alamat
                        .split(",")
                        .slice(1)
                        .join(",")
                        .trim()
                    : "Dramaga, Bogor, Jawa Barat 16680",
                  negara: "Indonesia",
                  gudep: result.identitas?.gudep || "Gudep 06-215 & 06-216",
                },
                info: {
                  namaAmbalan:
                    result.identitas?.namaAmbalan || "Ambalan SMAIT Ummul Quro",
                  tingkat: result.identitas?.tingkat || "Penegak",
                },
              },
              // Keep other sections static or map them if available
              sejarah: result.sejarah
                ? { title: "Sejarah Ambalan UQ", content: result.sejarah }
                : fallbackData.sejarah,
              prestasi: fallbackData.prestasi, // Prestasi logic is complex, keep for now or map if schema added
            };
            setData(mappedData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch Tentang Kami:", error);
      }
    };
    fetchData();
  }, []);

  const { title, identitas, sejarah, prestasi } = data;

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          id="tentang-header"
          data-animate
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible["tentang-header"]
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5c0b08] mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#5c0b08] hover:to-[#903d04] transition-all duration-500 cursor-default">
            {title}
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#903d04] to-[#9c7502] mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Identitas Ambalan */}
        <div
          id="identitas"
          data-animate
          className={`mb-16 transform transition-all duration-1000 ${
            isVisible["identitas"]
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-orange-100">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#5c0b08] mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-[#903d04]" />
              {identitas.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#903d04] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#5c0b08] mb-1">
                      Alamat Lengkap
                    </h4>
                    <p className="text-gray-700">
                      {identitas.alamat.nama}
                      <br />
                      {identitas.alamat.jalan}
                      <br />
                      {identitas.alamat.kecamatan}
                      <br />
                      {identitas.alamat.negara}
                      <br />
                      {identitas.alamat.gudep}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-[#5c0b08] mb-2">
                    Nama Ambalan
                  </h4>
                  <p className="text-gray-700">{identitas.info.namaAmbalan}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-[#5c0b08] mb-2">Tingkat</h4>
                  <p className="text-gray-700">{identitas.info.tingkat}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangKami;
