const express = require('express')
const router = express.Router()
const {checkAuth, isAuth} = require('../middleware/auth')

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
    res.render('seat_chart', {
        layout: 'main',
        name: req.user.displayName
    })
})

module.exports = router