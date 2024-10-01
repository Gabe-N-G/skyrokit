const dotenv = require('dotenv'); //allows .env file
dotenv.config();
const express = require('express'); //allows database manipulation, ejs etc
const app = express(); //calling the express function that creates an express server
const mongoose = require('mongoose');//object document mapper, allows js to communicate with MongoDB
const methodOverride = require('method-override');//allows put/delete commands on html forms. 
const morgan = require('morgan');//logs shit onto the console
const session = require('express-session');//stores session data (like login info, with cookies)
// server.js

// require our new middleware! made in the middleware folder
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');



const authController = require('./controllers/auth.js');
//brings in the conroller folder.

const applicationsController = require('./controllers/applications.js');


const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//app.use = probably middleware
//reads information in our url (needs post and put requests so you can encode your requests in the body.)
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev')); //morgan dev is one style/ common short areothers
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView)


app.get('/', (req, res) => {
  // Check if the user is signed in
  if (req.session.user) {
    // Redirect signed-in users to their applications index
    res.redirect(`/users/${req.session.user._id}/applications`);
  } else {
    // Show the homepage for users who are not signed in
    res.render('index.ejs');
  }
});

//unecessary for skyrokit at this moment.
// app.get('/vip-lounge', (req, res) => {
//   if (req.session.user) {
//     res.send(`Welcome to the party ${req.session.user.username}.`);
//   } else {
//     res.send('Sorry, no guests allowed.');
//   }
// });

app.use('/auth', authController);// start using the auth in controllers folder route.

app.use(isSignedIn)
app.use('/users/:userId/applications', applicationsController); // New! after signed in, now you can use applications through the applicationscontroller.

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
