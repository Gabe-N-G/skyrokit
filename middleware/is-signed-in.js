// middleware/is-signed-in.js
// next does the thing after the login.
//if there is a user that is signed in, keep going (return next), if not redirect them to the sign in part of the website.
const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/auth/sign-in');
  };
  
  module.exports = isSignedIn;
  