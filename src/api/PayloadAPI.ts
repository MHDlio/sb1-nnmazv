import { createAPIRoute } from 'payload/next'

export default createAPIRoute({
  routers: {
    forms: {
      get: async (req, res) => {
        const forms = await payload.find({
          collection: 'forms',
          depth: 2
        })
        return res.json(forms)
      },
      post: async (req, res) => {
        const newForm = await payload.create({
          collection: 'forms',
          data: req.body
        })
        return res.json(newForm)
      }
    }
  }
}) 