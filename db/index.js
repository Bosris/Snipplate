const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.connect('mongodb://localhost/snipplate', { useNewUrlParser: true,  useUnifiedTopology: true });


let userSchema = mongoose.Schema({
  email: {type: String, required: "Email can't be empty.", unique: true},
  password: {type: String, required: "password can't be empty."},
  snippets: Array,
});



  userSchema.methods = {
    hashPassword: plainTextPassword => {
      return bcrypt.hashSync(plainTextPassword, 10)
    },

    checkPassword: function (inputPassword) {
      return bcrypt.compareSync(inputPassword, this.password)
    },

}

userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');

		this.password = this.hashPassword(this.password)
		next()
	}
})

// const createUser = ({email, password}, callback) => {
//   User.findOne({email}, (err, res) => {
//     if (err) {
//       callback(err, null)
//      }
//      if (res !== null) {
//        callback('User Already Exists', null)
//      } else {
//        console.log('made it')
//       bcrypt.hash(password, saltRounds, (error, hash) => {
//         if (err) {
//           return callback(err, null)
//         }
//         User.create({email, password: hash}, (err, docs) => {
//           if (err) {
//             callback(err, null);
//           } else {
//             callback(null, docs)
//           }
//         });
//       });
//      }
//   });
// }

// const handleLogin = ({email, password}, callback) => {
//   console.log('made it here')
//   User.findOne({email}, (err, res) => {
//     if(err){
//       callback('User doesn\'t exist', null);
//     } else {
//       bcrypt.compare(password, res.password, (err, result) => {
//         if(!result){
//           callback('Wrong password')
//         } else {
//           callback(null, result)
//         }
//       })
//     }
//   })
// }


let User = mongoose.model('user', userSchema);

module.exports = {
  User,
  // createUser,
  // handleLogin,

}