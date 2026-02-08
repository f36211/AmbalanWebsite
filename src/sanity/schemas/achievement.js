export default {
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'badgeUrl', // Legacy field support if needed, or we just map badgeImage to url
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
