module.exports = {
    checkAuth: function(req, res, next){
        if(req.isAuthenticated()) {
            next()
        } else {
            res.redirect('/')
        }
    },
    isAuth: function(req, res, next) {
        if(req.isAuthenticated()) {
            res.redirect('/seat_chart')
        } else {
            next()
        }
    }
}