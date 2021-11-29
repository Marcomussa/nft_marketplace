function userLoggedMiddleware(req, res, next){
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    } else {
        res.locals.isLogged = false
    }
    next()
}

module.exports = userLoggedMiddleware