/* name, 6-digit sku, store id, date, category (list), image, parent item id*/

const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  sku: {
    type: Number,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /^\d{6}$/.test(v)
      }
    },
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
  },
  image: {
    type: Image,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Item', itemSchema)