import { buildConfig } from 'payload/config'
import { Forms } from '../collections/forms'
import { Users } from '../collections/users'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Forms, Users],
  plugins: [
    cloudStorage({
      collections: {
        'forms': {
          adapter: 's3',
          config: {
            bucket: process.env.S3_BUCKET,
            prefix: 'forms',
          },
        },
      },
    }),
  ],
}) 