export default {
  name: 'leadershipHistory',
  title: 'Sejarah Kepemimpinan (Leadership History)',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Year (e.g. 2023/2024)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Angkatan Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'putra',
      title: 'Pengurus Putra',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', title: 'Jabatan (e.g. Pradana, Kerani)', type: 'string' },
            { name: 'name', title: 'Nama Lengkap', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'putri',
      title: 'Pengurus Putri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', title: 'Jabatan (e.g. Pradana, Kerani)', type: 'string' },
            { name: 'name', title: 'Nama Lengkap', type: 'string' }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'year',
      media: 'image'
    }
  }
};
