const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


mongoose.connect('mongodb://localhost/snipplate', { useNewUrlParser: true,  useUnifiedTopology: true });


let userSchema = mongoose.Schema({
  email: {type: String, required: "Email can't be empty.", unique: true},
  password: {type: String, required: "password can't be empty."},
  snippets: Array,
});

let User = mongoose.model('user', userSchema);

const createUser = ({email, password}, callback) => {
  User.findOne({email}, (err, res) => {
    if (err) {
      callback(err, null)
     }
     if (res !== null) {
       callback('User Already Exists', null)
     } else {
       console.log('made it')
      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (err) {
          return callback(err, null)
        }
        User.create({email, password: hash}, (err, docs) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, docs)
          }
        });
      });
     }
  });
}

const handleLogin = ({email, password}, callback) => {
  console.log('made it here')
  User.findOne({email}, (err, res) => {
    if(err){
      callback('User doesn\'t exist', null);
    } else {
      bcrypt.compare(password, res.password, (err, result) => {
        if(!result){
          callback('Wrong password')
        } else {
          callback(null, result)
        }
      })
    }
  })
}

const getUserByEmail = (email, callback) => {
  User.findOne({email}, callback);
}
const getUserById = (id, callback) => {
  User.findById(id, callback);
}


const comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch)
  });
}



module.exports = {
  User,
  createUser,
  handleLogin,
  getUserByEmail,
  getUserById
}