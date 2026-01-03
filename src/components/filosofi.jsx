import React from "react";
import { motion } from "framer-motion";

// The component is updated to integrate with the app's animation system.
// It now accepts an `isVisible` prop, which is passed down from App.jsx's IntersectionObserver.
export default function Filosofi({ isVisible = {} }) {
  // Data for the explanation cards
  const putraData = {
    logo: "images/logo/L2.png",
    name: "SHALAHUDIN AL AYUBI",
    explanation: [
      "Lambang yang berbentuk perisai berarti seorang penegak harus mempunyai perisai diri untuk mempertahankan dirinya dari godaan-godaan atau ajakan-ajakan dari hal-hal yang tidak baik.",
      "Lima bintang menggambarkan sholat lima waktu. Artinya seorang penegak dapat menyinergikan antara amal ibadah dengan aktivitasnya.",
      "Siluet Shalahuddin Al Ayyubi menggambarkan seseorang yang dapat membebaskan Palestina dengan kemuliaan dan kerja keras, sehingga Al-Aqsa bisa dibebaskan bukan hanya dengan kekuatan, melainkan dengan keimanan dan kemanusiaan. Itulah yang menjadi ciri khas Ambalan SMAIT Ummul Quro Bogor.",
      "Tulisan Shalahuddin Al Ayyubi berarti seorang penegak putra harus memiliki jiwa kepemimpinan dengan kekuatan iman dan takwa sehingga dapat memimpin pasukannya ke jalan yang lebih baik.",
      "Pedang scimitar berpasangan, pedang ini senjata khas umat muslim yang digunakan pasukan serdadu muslim, karena ketajaman pedang ini sehingga melambangkan bahwa seorang penegak memiliki keseimbangan, ketajaman pikiran.",
      "Tulisan Ksatria, Jaya, Imana yang artinya selain amanat Ambalan yaitu seorang ksatria yang akan berjaya hanya dengan keimanan yang kuat.",
    ],
  };

  const putriData = {
    logo: "images/logo/L3.png",
    name: "FATHIMAH AZ ZAHRA",
    explanation: [
      "Siluet Fatimah Az Zahra melambangkan seorang penegak putri harus selalu menjaga dirinya sebagai seorang muslimah dengan menutup auratnya.",
      "Tulisan Fatimah Az Zahra artinya seorang penegak putri harus mengedepankan kesucian seperti halnya Fatimah Az Zahra sebagai Penghulu Putri Ahli Surga.",
      "Selendang berarti keanggunan seorang muslimah. Artinya perjuangan atau pengorbanan sekeras apapun tidak akan menghilangkan keanggunannya sebagai muslimah.",
      "Tulisan Putri, Cahaya, Imana yang berarti selain sebagai amanat ini juga berarti bahwa seorang putri akan bercahaya apabila iman yang tertanam pada dirinya sangat kuat.",
      "Lambang tunas kelapa artinya landasan aktivitas seorang penegak harus selalu dengan trisatya dan dasa darma.",
      "Tali coklat disisi perisai, berarti ikatan persatuan merupakan perekat perbedaan di NKRI.",
    ],
  };

  return (
    <>
      {/* Slide 1: Putra */}
      <section
        id="filosofi-putra"
        data-animate
        className="flex flex-col items-center justify-center w-full min-h-screen py-8"
      >
        {/* Desktop View: SVG */}
        <div className="flex-col items-center justify-center hidden w-full h-full md:flex">
          <motion.div
            className="px-4 mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible["filosofi-putra"] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
              Filosofi Logo Ambalan
            </h1>
            <h2 className="mt-2 text-2xl font-semibold text-gray-700 sm:text-3xl">
              {putraData.name}
            </h2>
          </motion.div>
          <motion.div
            className="flex items-center justify-center flex-grow w-full max-w-5xl p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isVisible["filosofi-putra"] ? { opacity: 1, scale: 1 } : {}
            }
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img
              src="/images/landing/svgs/putra.svg"
              alt="Filosofi Logo Amabalan Putra"
              className="w-full h-auto max-h-[65vh] object-contain"
            />
          </motion.div>
        </div>

        {/* Mobile View: Explanation Card */}
        <div className="w-full p-4 md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible["filosofi-putra"] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">
              Filosofi Logo Ambalan
            </h1>
            <div className="p-6 bg-white shadow-xl rounded-2xl">
              <div className="mb-4 text-center">
                <img
                  src={putraData.logo}
                  alt="Logo Putra"
                  className="w-24 h-24 mx-auto mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800">
                  SHALAHUDIN AL AYUBI
                </h2>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                {putraData.explanation.map((text, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mt-1 mr-2">&#8226;</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 2: Putri */}
      <section
        id="filosofi-putri"
        data-animate
        className="flex flex-col items-center justify-center w-full min-h-screen py-8 mt-8 md:mt-0"
      >
        {/* Desktop View: SVG */}
        <div className="flex-col items-center justify-center hidden w-full h-full md:flex">
          <motion.div
            className="px-4 mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible["filosofi-putri"] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700 sm:text-3xl">
              {putriData.name}
            </h2>
          </motion.div>
          <motion.div
            className="flex items-center justify-center flex-grow w-full max-w-5xl p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isVisible["filosofi-putri"] ? { opacity: 1, scale: 1 } : {}
            }
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img
              src="/images/landing/svgs/putri.svg"
              alt="Filosofi Logo Amabalan Putri"
              className="w-full h-auto max-h-[65vh] object-contain"
            />
          </motion.div>
        </div>

        {/* Mobile View: Explanation Card */}
        <div className="w-full p-4 md:hidden">
          <motion.div
            className="p-6 bg-white shadow-xl rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible["filosofi-putri"] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 text-center">
              <img
                src={putriData.logo}
                alt="Logo Putri"
                className="w-24 h-24 mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800">
                {putriData.name}
              </h2>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              {putriData.explanation.map((text, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-1 mr-2">&#8226;</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}
