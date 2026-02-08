export default {
  name: 'materiPramuka',
  title: 'Materi Pramuka',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'content', title: 'Content Detail', type: 'text' },
    { name: 'image', title: 'Cover Image', type: 'image' },
    { name: 'presentationFile', title: 'Presentation File (PDF/SVG)', type: 'file' }
  ]
}
