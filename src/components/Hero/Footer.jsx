import React from 'react';
import { Instagram, Youtube, Music2, MapPin, ChevronRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/tentang-kami' },
    { name: 'Struktur Organisasi', href: '/struktur-organisasi' },
    { name: 'Galeri Kegiatan', href: '/foto-kegiatan' },
    { name: 'Purna Ambalan', href: '/foto-purna-ambalan' },
    { name: 'Seragam', href: '/seragam' },
    { name: 'Materi Pramuka', href: '/materi-pramuka' },
    { name: 'Filosofi', href: '/filosofi' },
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      href: 'https://instagram.com/ambalan_smaituq', 
      label: 'Instagram'
    },
    { 
      icon: Youtube, 
      href: 'https://m.youtube.com/channel/UCBF7Y71LydV27Kkt3ALJ49w', 
      label: 'YouTube'
    },
    { 
      icon: Music2, 
      href: 'https://vt.tiktok.com/ZSCmH6cn/', 
      label: 'TikTok'
    },
  ];

  return (
    <footer className="relative bg-[#5c0b08] text-white overflow-hidden">
      {/* Minimal background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>

      <div className="relative max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-12">
          
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/images/logo/L1.png" 
                alt="Logo Pramuka" 
                className="object-contain w-10 h-10"
              />
              <div>
                <h3 className="text-lg font-bold">Ambalan SMAITUQ</h3>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <img src="/images/logo/L2.png" alt="Putra" className="object-contain w-5 h-5" />
                <span>Shalahudin Al Ayubi</span>
              </div>
              <span className="text-gray-500">•</span>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <img src="/images/logo/L3.png" alt="Putri" className="object-contain w-5 h-5" />
                <span>Fatimah Az Zahra</span>
              </div>
            </div>
            <p className="text-xs italic text-orange-200 border-l-2 border-[#f9ba02] pl-3">
              "Satyaku Kudarmakan, Darmaku Kubaktikan"
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="mb-4 text-sm font-bold tracking-wider text-orange-200 uppercase">
              Navigasi
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-sm text-gray-300 transition-all duration-200 hover:text-white hover:translate-x-1 group"
                  >
                    <div className="w-1 h-1 bg-[#f9ba02] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Location & Social */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Location */}
            <div className="mb-6">
              <h4 className="flex items-center gap-2 mb-3 text-sm font-bold tracking-wider text-orange-200 uppercase">
                <MapPin className="w-4 h-4" />
                Lokasi
              </h4>
              <p className="text-sm leading-relaxed text-gray-300">
                Perumahan, Jl. Boulevard Raya Jl. Pool Bina Marga No.3, RT.006/RW.05, Kayu Manis, Kec. Tanah Sereal, Kota Bogor, Jawa Barat 16169
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="mb-3 text-sm font-bold tracking-wider text-orange-200 uppercase">
                Sosial Media
              </h4>
              <div className="space-y-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-white group"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg bg-white/5 group-hover:bg-white/10">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{social.label}</div>
                      </div>
                      <ExternalLink className="w-3 h-3 transition-opacity opacity-0 group-hover:opacity-100" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-6 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <div className="flex items-center gap-2">
              <span>© 2025 Ambalan SMAITUQ</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">All rights reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/logo/L3.png" alt="Putri" className="object-contain w-5 h-5 opacity-50" />
              <img src="/images/logo/L2.png" alt="Putra" className="object-contain w-5 h-5 opacity-50" />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;