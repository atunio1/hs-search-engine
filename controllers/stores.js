const storesRouter = require('express').Router()
const Store = require('../models/store')

storesRouter.get('/', async (request, response) => {
  const stores = await Store
    .find({}).populate('item')
  response.json(stores)
})

storesRouter.post('/', async (request, response) => {
  const body = request.body

  const store = new Store({
    name: body.name,
    street: body.street,
    province: body.province,
    postal: body.postal,
    items: []
  })

  const savedStore = await store.save()
  response.status(201).json(savedStore)
})

storesRouter.delete('/:id', async (request, response) => {
  const store = await Store.findById(request.params.id)
  await Store.deleteOne(store)
  response.status(204).end()
})

module.exports = storesRouter