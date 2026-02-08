export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'siteName', title: 'Site Name', type: 'string' },
    { name: 'footerMotto', title: 'Footer Motto', type: 'string' },

    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url' },
        { name: 'youtube', type: 'url' },
        { name: 'tiktok', type: 'url' },
      ]
    }
  ]
}
