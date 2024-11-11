import { CollectionConfig } from 'payload/types'

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published', 'archived'],
      defaultValue: 'draft',
    },
    {
      name: 'fields',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: ['text', 'number', 'date', 'file', 'select'],
          required: true,
        },
        {
          name: 'validation',
          type: 'group',
          fields: [
            {
              name: 'required',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'pattern',
              type: 'text',
              admin: {
                condition: (data) => data.type === 'text',
              },
            }
          ]
        }
      ]
    }
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Add validation and processing logic
        return data
      }
    ],
    afterChange: [
      async ({ doc }) => {
        // Trigger N8N workflow after form changes
      }
    ]
  }
} 