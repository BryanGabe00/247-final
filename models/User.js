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
    attendance: [{
        day: String,
        table_number: Number,
        seat_number: Number
    }]
})

module.exports = mongoose.model('User', UserSchema)