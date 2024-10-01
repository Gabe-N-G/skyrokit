// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here
router.get('/', (req,res)=>{
    try{
        res.render('applicatons/index.ejs')
    } catch {
        console.error()
    }
})

// controllers/applications.js

router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
  });
  

module.exports = router;
