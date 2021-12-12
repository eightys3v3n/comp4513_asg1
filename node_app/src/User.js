const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  id:				Number,
  details: {
    firstname:		String,
    lastname:		String,
    city:			String,
    country:		String,
  },
  picture: {
    large:			String,
    thumbnail:		String,
  },
  membership: {
    date_joined:	String,
    last_update:	String,
    likes:			Number,
  },
  email: 			String,
  password_bcrypt:	String,
  apikey:			String,
  favorites:		[]
});

userSchema.methods.isValidPassword = async function(formPassword) {
  const user = this;
  const hash = user.password_bcrypt;
  const compare = await bcrypt.compare( formPassword, hash);
  return compare;
}

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);
