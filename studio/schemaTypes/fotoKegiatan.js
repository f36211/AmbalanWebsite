export default {
  name: 'fotoKegiatan',
  title: 'Foto Kegiatan',
  type: 'document',
  fields: [
    { name: 'title', title: 'Activity Title', type: 'string' },
    { name: 'category', title: 'Category', type: 'string', options: {
      list: [
        { title: 'Latihan Rutin', value: 'latihan' },
        { title: 'Kemah', value: 'kemah' },
        { title: 'Lomba', value: 'lomba' },
        { title: 'Bakti Sosial', value: 'baksos' },
        { title: 'Other', value: 'other' },
      ]
    }},
    { name: 'date', title: 'Date', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'participants', title: 'Participants Count', type: 'number' },
    { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }
  ]
}
