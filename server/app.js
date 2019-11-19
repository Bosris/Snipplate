require('dotenv').config({path: __dirname + '/../.env'})
const express = require('express');
const path = require('path')
const app = express();
const PORT = 3000;
const db = require('../db')
const passport = require('./passport/index.js');
const flash = require('connect-flash')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const morgan = require('morgan')
const MongoStore = require('connect-mongo')(session)

const user = require('./routes/user')

app.use(morgan("dev"))
app.use(flash())
app.use(session({
  secret: 'cats',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false, maxAge: 3600000 },
  // 3600000
  store: new MongoStore({url: `mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`})
}));
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname +'/../public'))

app.use(passport.initialize())
app.use(passport.session())


app.use('/api/', user);


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


app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../public/')});
});



app.listen(PORT, () => {
  console.log('Listening on', PORT);
})