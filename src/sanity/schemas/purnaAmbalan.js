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
      type: 'string', // Kept as string to allow "2023/2024" format if needed
      validation: (Rule) => Rule.required(),
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
