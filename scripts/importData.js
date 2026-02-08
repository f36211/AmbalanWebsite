
import { createClient } from '@sanity/client'
import { 
  periods, 
  stats, 
  heroData, 
  tentangKamiData, 
  fotoKegiatanData, 
  fotoPurnaAmbalanData, 
  materiPramukaData, 
  seragamPramukaData, 
  strukturOrganisasiData, 
  footerData 
} from '../src/data/index.js'
import { achievementsData } from '../src/data/achievementsData.js'
import process from 'process'
import dotenv from 'dotenv'

dotenv.config()

// --- CONFIGURATION ---
const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'
// USER MUST PROVIDE A TOKEN WITH WRITE ACCESS
const token = process.env.SANITY_TOKEN 

if (!projectId) {
  console.error("❌ Missing VITE_SANITY_PROJECT_ID in .env")
  process.exit(1)
}

if (!token) {
  console.error("❌ Missing SANITY_TOKEN. Please create a token with 'Editor' permissions at sanity.io/manage and run: $env:SANITY_TOKEN='your_token'")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2023-10-01',
  useCdn: false,
})

const importData = async () => {
  console.log('🚀 Starting data import to Sanity...')

  // 1. Achievements
  console.log('Migrating Achievements...')
  for (const item of achievementsData) {
    const doc = {
      _type: 'achievement',
      title: item.title,
      year: item.year,
      description: item.description,
      badgeUrl: item.badgeUrl 
    }
    await client.create(doc)
  }

  // 2. Foto Purna Ambalan
  console.log('Migrating Foto Purna Ambalan...')
  for (const item of fotoPurnaAmbalanData.purnaData) {
    const doc = {
      _type: 'purnaAmbalan',
      title: item.title,
      year: item.year,
      date: item.date,
      graduates: item.graduates,
      achievements: item.achievements,
      quote: item.quote,
    }
    await client.create(doc)
  }

  // 3. Hero - REMOVED

  // 4. Tentang Kami
  console.log('Migrating Tentang Kami...')
  await client.createOrReplace({
    _id: 'tentangKami',
    _type: 'tentangKami',
    title: tentangKamiData.title,
    subtitle: tentangKamiData.subtitle,
    identitas: {
        namaAmbalan: tentangKamiData.identitas.info.namaAmbalan,
        tingkat: tentangKamiData.identitas.info.tingkat,
        gudep: tentangKamiData.identitas.alamat.gudep,
        alamat: `${tentangKamiData.identitas.alamat.jalan}, ${tentangKamiData.identitas.alamat.kecamatan}`
    },
    // Sejarah removed
    visi: tentangKamiData.sections.find(s => s.id === 'visi-misi')?.visi || '',
    misi: tentangKamiData.sections.find(s => s.id === 'visi-misi')?.misi || [],
  })

  // 5. Leadership History (Periods)
  console.log('Migrating Leadership History...')
  for (const period of periods) {
     const putraRoles = Object.entries(period.putra).map(([role, name]) => ({
         _key: role,
         role: role.replace(/_/g, ' '),
         name: name
     }))
     const putriRoles = Object.entries(period.putri).map(([role, name]) => ({
         _key: role,
         role: role.replace(/_/g, ' '),
         name: name
     }))

     const doc = {
         _type: 'leadershipHistory',
         year: period.year,
         putra: putraRoles,
         putri: putriRoles
     }
     await client.create(doc)
  }

  // 6. Foto Kegiatan
  console.log('Migrating Foto Kegiatan...')
  for (const photo of fotoKegiatanData.photos) {
      const doc = {
          _type: 'fotoKegiatan',
          title: photo.title,
          category: photo.category,
          date: photo.date,
          location: photo.location,
          participants: photo.participants
      }
      await client.create(doc)
  }

  // 7. Materi Pramuka
  console.log('Migrating Materi Pramuka...')
  for (const mat of materiPramukaData.materials) {
      const doc = {
          _type: 'materiPramuka',
          title: mat.title,
          description: mat.description,
          content: mat.content
      }
      await client.create(doc)
  }

  // 8. Struktur Organisasi
  console.log('Migrating Struktur Organisasi...')
  // Pembina
  await client.create({
      _type: 'strukturOrganisasi',
      jabatan: 'Pembina Ambalan',
      nama: strukturOrganisasiData.pembina.name
  })
  // Structure
  for (const s of strukturOrganisasiData.struktur) {
    // Determine gender string from isPutra logic or usage
    const gender = s.jabatan.toLowerCase().includes('putra') ? 'Putra' : 'Putri';
      const doc = {
          _type: 'strukturOrganisasi',
          jabatan: s.jabatan,
          nama: s.nama,
          periode: s.periode,
          description: s.description,
          gender: gender // Updated from isPutra
      }
      await client.create(doc)
  }

  // 9. Site Settings (Footer)
  console.log('Migrating Site Settings...')
  await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteName: footerData.title,
      footerMotto: footerData.motto,
      // copyrightText removed
      socialLinks: {
          instagram: footerData.socialLinks.instagram,
          youtube: footerData.socialLinks.youtube,
          tiktok: footerData.socialLinks.tiktok
      }
  })

  console.log('✅ Data migration complete!')
}

importData().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
