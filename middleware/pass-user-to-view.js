// middleware/pass-user-to-view.js
//if there is a user in the session data  make it the session user
//if not, pass in the local user to be null.
//there is always a res.locals, but the properties are undefined unless things are added to them.
//next() goes to the next form of middleware 


const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null
    next()
  }
  
  module.exports = passUserToView
  