let controller = {
    index: (req, res) => {
        res.render('index', {
            userLogged: req.session.userLogged
        })
    }
}

module.exports = controller