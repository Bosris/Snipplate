const express = require('express')
const router = express.Router()
const User = require('../../db/index.js').User
const passport = require('../passport')
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/signup', (req, res) => {
    console.log('user signup');

    const { email, password } = req.body
    // ADD VALIDATION
    User.findOne({email}, (err, user) => {
      if (err) {
        console.log('User post err:', err)
       } else if (user) {
         res.json({ error: 'Sorry, already a user with that email'})

       } else {
        const createNewUser = new User({
          email, password
        })
        createNewUser.save((err, savedUser) => {
          if (err) return res.json(err)

          res.json(savedUser)
        })
       }
    });
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.body.email);
        var userInfo = {
           email: req.user.email
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

router.post('/snippet', (req, res) => {
    console.log('made it here')

    console.log(req.user._id)
    console.log(req.body.snippets[0])

    User.update({_id: req.user._id }, { $push: {snippets: req.body.snippets} }, (err, result) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(result)
    })
})

router.get('/user', (req, res) => {
    User.findOne({_id: req.user._id}, {"password": 0 }, (err, docs) => {
        if (err) return res.status(400).json(err);

        res.status(200).json(docs)
    })
})

router.put('/snippet', (req, res) => {
    User.update({_id: req.user._id, "snippets.tech": req.body.whichToUpdate}, {$push: {"snippets.$.snipplates": req.body.snippets[0].snipplates[0]}}, (err, docs) => {
        if(err){
            console.log(err)
        } else{
            console.log(docs)
        }

    })
})

router.delete('/snippet/:id', (req,res ) => {
    const { id } = req.params
    const {snipplates} = req.body
    console.log(req.body)

        User.update({_id: req.user._id}, {$set :{ ["snippets." + id + ".snipplates"]: snipplates}}, (err, docs) => {
        if(err){
            console.log(err)
        } else{
            console.log(docs)
        }

    })
    console.log(req.params);
})

module.exports = router

// ["snippets."+ id + ".snipplates.description"]: description


