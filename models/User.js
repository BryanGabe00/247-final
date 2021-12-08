const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    googleID: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    attendance: {
        type: [Date],
        required: false
    }
})

module.exports = mongoose.model('User', UserSchema)