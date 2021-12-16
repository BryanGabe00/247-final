const mongoose = require('mongoose')
const UserM = require('../models/User')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
    } catch(e) {
        console.error(e)
        process.exit(1)
    }
}

const insertSeat = async (name, day, table_number, seat_number) => {
    let query = {displayName: name}
    table_number = Number(table_number)
    seat_number = Number(seat_number)

    if(Number.isInteger(table_number) && Number.isInteger(seat_number)) {
    const doc = await UserM.updateOne(query, {$push:{
        attendance: [{
            "day": day,
            "table_number": table_number,
            "seat_number": seat_number
        }]
    }})
    return true
    } else {
        console.log("PLEASE ENTER ONLY NUMBERS FOR TABLE AND SEAT")
        return false
    }
}

const readAttendance = async(name) => {
    let query = {displayName: name}

    const doc = await UserM.findOne(query)
    return doc
}

module.exports.connectDB = connectDB
module.exports.insertSeat = insertSeat
module.exports.readAttendance = readAttendance