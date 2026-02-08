export default {
  name: 'tentangKami',
  title: 'Tentang Kami',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    {
      name: 'identitas',
      title: 'Identitas Ambalan',
      type: 'object',
      fields: [
        { name: 'namaAmbalan', title: 'Nama Ambalan', type: 'string' },
        { name: 'tingkat', title: 'Tingkat', type: 'string' },
        { name: 'gudep', title: 'Gudep', type: 'string' },
        { name: 'alamat', title: 'Alamat', type: 'text' },
      ]
    },

    {
      name: 'visi',
      title: 'Visi',
      type: 'text'
    },
    {
      name: 'misi',
      title: 'Misi',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
}
