module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', 'Zaloguj się aby wyświetlić tą zawartość.')
        res.redirect('/login')
    }
}