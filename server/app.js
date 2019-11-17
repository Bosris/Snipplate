const express = require('express');
const path = require('path')
const app = express();
const PORT = 3000;
const db = require('../db')
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const morgan = require('morgan')
const { forwardAuthenticated } = require('../config/auth.js');


require('../config/passport')(passport);
app.use(morgan("combined"))
app.use(flash())
app.use(session({ secret: 'cats', resave: true, saveUninitialized: true  }));
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname +'/../public'))

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
})


app.post('/api/signup', (req, res) => {
  console.log(req.body)
  db.createUser(req.body, (err, docs) => {
    if(err){
      req.flash('test', 'it worked')
      res.status(500).send('yo')
    } else{
      res.status(200).json('made it')
    }
  })
})

// app.get('/login', forwardAuthenticated, (req,res) => { })

// app.post('/api/login', (req, res, next) => {
//   console.log('received request')
//   passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true})(req, res, next)

// })

// app.post('/api/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true}))


app.post('/api/login', (req, res) => {
  console.log('yes')

}, passport.authenticate('local'), (req, res) => {
  console.log('logged in', req.body.email);

})


app.get('/api/test', (req, res) => {
  res.send('yo')
})

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../public/')});
});



app.listen(PORT, () => {
  console.log('Listening on', PORT);
})