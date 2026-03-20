export default {
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom(async (title, context) => {
          if (!title) return true;
          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2023-10-01' });
          const id = document._id.replace(/^drafts\./, '');
          const params = { title, id };
          const query = `count(*[_type == "achievement" && title == $title && !(_id in [$id, "drafts." + $id])])`;
          const count = await client.fetch(query, params);
          return count === 0 || `Achievement "${title}" sudah ada. Periksa apakah ini duplikat.`;
        }),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(2000).max(2100),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'badgeImage',
      title: 'Badge Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'badgeUrl',
      title: 'External Badge URL (Optional)',
      type: 'url',
      description: 'Use if you have a direct link instead of uploading an image.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'badgeImage',
    },
  },
};
