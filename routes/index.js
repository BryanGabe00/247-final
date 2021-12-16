const express = require('express')
const router = express.Router()
const {checkAuth, isAuth} = require('../middleware/auth')

const db = require('../config/db')

/**
 * @description landing page    GET /
 * @todo make the landing page the default login page
 */
router.get('/', isAuth, (req, res) => {
    res.render('index', {
        layout: 'login'
    })
})

router.get('/proposal', checkAuth, (req, res) => {
    res.render('proposal', {
        layout: 'main'
    })
})

router.get('/seat_chart', checkAuth, (req, res) => {

    db.readAttendance(req.user.displayName).then(value => {
        res.render('seat_chart', {
            layout: 'main',
            name: req.user.displayName,
            attendance: value.attendance
        })
    })
})

router.post('/submit-form', (req, res) => {
    let date_obj = new Date()
    let month = date_obj.getMonth() + 1
    let day = date_obj.getDate()
    let year = date_obj.getFullYear()
    let time = month + "/" + day + "/" + year
    
    db.insertSeat(req.user.displayName, time, req.body.tableNumber, req.body.seatNumber)
    res.render('submit_form', {
        layout: 'main',
        name: req.user.displayName,
        time_recorded: time,
        table_number: req.body.tableNumber,
        seat_number: req.body.seatNumber
    })
})

module.exports = router