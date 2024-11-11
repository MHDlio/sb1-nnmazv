import { buildConfig } from 'payload/config'

export default buildConfig({
  collections: [
    // Forms
    {
      slug: 'forms',
      admin: {
        useAsTitle: 'name'
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true
        },
        {
          name: 'fields',
          type: 'array',
          fields: [
            {
              name: 'fieldType',
              type: 'select',
              options: ['text', 'number', 'date', 'file']
            }
          ]
        },
        {
          name: 'workflow',
          type: 'relationship',
          relationTo: 'workflows'
        }
      ],
      hooks: {
        afterChange: [
          async ({ doc }) => {
            // Trigger form update workflow
          }
        ]
      }
    },
    // Users with extended functionality
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email'
      },
      fields: [
        {
          name: 'role',
          type: 'select',
          options: ['admin', 'user', 'manager']
        },
        {
          name: 'preferences',
          type: 'json'
        }
      ]
    }
  ]
}) 