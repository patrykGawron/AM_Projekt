module.exports = {
    ensureNotAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return res.redirect('/dashboard')
        }
        next()
    }
}