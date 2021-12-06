const express = require('express')
const router = express.Router()

/**
 * @description landing page    GET /
 * @todo make the landing page the default login page
 */
router.get('/', (req, res) => {
    res.render('index', {
        layout: 'login'
    })
})

router.get('/proposal', (req, res) => {
    res.render('proposal', {
        layout: 'main'
    })
})

router.get('/seat_chart', (req, res) => {
    res.render('seat_chart', {
        layout: 'main'
    })
})

module.exports = router