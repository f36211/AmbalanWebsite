export default {
  name: 'purnaAmbalan',
  title: 'Foto Purna Ambalan',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title (e.g. Purna Ambalan Angkatan 2023)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year/Angkatan',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom(async (year, context) => {
          if (!year) return true;
          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2023-10-01' });
          const id = document._id.replace(/^drafts\./, '');
          const params = { year, id };
          const query = `count(*[_type == "purnaAmbalan" && year == $year && !(_id in [$id, "drafts." + $id])])`;
          const count = await client.fetch(query, params);
          return count === 0 || `Purna Ambalan tahun "${year}" sudah ada. Duplikat tidak diperbolehkan.`;
        }),
    },
    {
      name: 'date',
      title: 'Date of Photo/Event',
      type: 'string',
    },
    {
      name: 'graduates',
      title: 'Number of Graduates',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Group Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'quote',
      title: 'Quote/Message',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'image',
    },
  },
};
