const mongo = require('mongoose');

const userSchema = mongo.Schema({

    userName: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    }

})

module.exports = mongo.model('User', userSchema);