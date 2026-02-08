export default {
  name: 'strukturOrganisasi',
  title: 'Struktur Organisasi',
  type: 'document',
  fields: [
    { name: 'jabatan', title: 'Jabatan', type: 'string' },
    { name: 'nama', title: 'Nama Lengkap', type: 'string' },
    { name: 'periode', title: 'Periode', type: 'string' },
    { name: 'description', title: 'Description', type: 'string' },
    {
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Putra', value: 'Putra' },
          { title: 'Putri', value: 'Putri' }
        ],
        layout: 'radio'
      }
    }, 
    { name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } }
  ]
}
