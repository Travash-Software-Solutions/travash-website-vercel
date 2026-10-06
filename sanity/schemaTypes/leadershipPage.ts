import { defineType, defineField } from 'sanity'

export const leadershipPage = defineType({
  name: 'leadershipPage',
  title: 'Leadership Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Leadership' }),
        defineField({ name: 'name', title: 'Leader Name', type: 'string', initialValue: 'Gaurav Gupta' }),
        defineField({ name: 'role', title: 'Role', type: 'string', initialValue: 'Founder & Chief Executive Officer | Travash Software Solutions' }),
        defineField({ name: 'description', title: 'Short Description/Quote', type: 'text', rows: 3 }),
        defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
        defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string', initialValue: 'contact@travash.com' }),
        defineField({ name: 'image', title: 'Leader Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
    
    defineField({
      name: 'biography',
      title: 'Biography (Portable Text)',
      description: 'The main body content of the leadership page',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    
    defineField({
      name: 'careerHighlights',
      title: 'Career Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value/Highlight (e.g. 24+ Years)', type: 'string' }),
            defineField({ name: 'label', title: 'Label/Description (e.g. IT Industry Experience)', type: 'string' }),
            defineField({ name: 'iconName', title: 'Lucide Icon Name (e.g. Globe, BookOpen, GraduationCap)', type: 'string', description: 'Name of the lucide-react icon (e.g. Globe)' }),
          ],
        },
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
        defineField({ name: 'ogImage', title: 'OpenGraph Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
})
