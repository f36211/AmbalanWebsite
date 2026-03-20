export default {
  name: 'materiPramuka',
  title: 'Materi Pramuka',
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
          const query = `count(*[_type == "materiPramuka" && title == $title && !(_id in [$id, "drafts." + $id])])`;
          const count = await client.fetch(query, params);
          return count === 0 || `Materi "${title}" sudah ada. Duplikat tidak diperbolehkan.`;
        }),
    },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'content', title: 'Content Detail', type: 'text' },
    { name: 'image', title: 'Cover Image', type: 'image' },
    { name: 'presentationFile', title: 'Presentation File (PDF/SVG)', type: 'file' }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
};
