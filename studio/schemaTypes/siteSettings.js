export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Restrict to singleton — only one siteSettings document should exist
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    { name: 'siteName', title: 'Site Name', type: 'string' },
    { name: 'footerMotto', title: 'Footer Motto', type: 'string' },

    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'tiktok', title: 'TikTok', type: 'url' },
      ]
    }
  ]
};
