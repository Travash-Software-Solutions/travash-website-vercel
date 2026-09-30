import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI & Automation', value: 'AI & Automation' },
          { title: 'Software Engineering', value: 'Software Engineering' },
          { title: 'Cloud & Infrastructure', value: 'Cloud & Infrastructure' },
          { title: 'Cybersecurity', value: 'Cybersecurity' },
          { title: 'Data & Analytics', value: 'Data & Analytics' },
          { title: 'Digital Transformation', value: 'Digital Transformation' },
        ],
      },
    }),
    defineField({
      name: 'author',
      title: 'Author Details',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Author Name', type: 'string', initialValue: 'Travash Editorial Team' }),
        defineField({ name: 'role', title: 'Role', type: 'string', initialValue: 'Technology Practice Lead' }),
        defineField({ name: 'avatar', title: 'Author Avatar', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Topics',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Body Content (Portable Text)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
  orderings: [
    { title: 'Published, Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
})

export const blogSection = defineType({
  name: 'blogSection',
  title: 'Blog Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Latest Insights from Travash',
    }),
    defineField({
      name: 'selectedPosts',
      title: 'Featured Posts (Select up to 3 posts for Home Page)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (rule) => rule.max(3),
      description: 'Select up to 3 specific blog posts to highlight on the Home Page blog section. If left empty, featured & latest posts will be displayed automatically.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'View All CTA Label',
      type: 'string',
      initialValue: 'View All Insights',
    }),
    defineField({
      name: 'ctaHref',
      title: 'View All CTA URL',
      type: 'string',
      initialValue: '/blogs',
    }),
  ],
})
