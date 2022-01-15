const mongo = require('mongoose');

const productSchema = mongo.Schema({

    name: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true
    }

})

module.exports = mongo.model('Product', productSchema);