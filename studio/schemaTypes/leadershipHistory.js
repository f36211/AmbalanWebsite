export default {
  name: 'leadershipHistory',
  title: 'Sejarah Kepemimpinan (Leadership History)',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Year (e.g. 2023/2024)',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom(async (year, context) => {
          if (!year) return true;
          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2023-10-01' });
          const id = document._id.replace(/^drafts\./, '');
          const params = { year, id };
          const query = `count(*[_type == "leadershipHistory" && year == $year && !(_id in [$id, "drafts." + $id])])`;
          const count = await client.fetch(query, params);
          return count === 0 || `Periode "${year}" sudah ada. Duplikat tidak diperbolehkan.`;
        }),
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
