const mongoose = require('mongoose');
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

  // Hashes the password sent by the user for login and checks if the
  // digest stored in the database matches the one sent.
  // Returns true if the hashes do match, and false if not.
  const compare = await bcrypt.compare( formPassword, hash);
  return compare;
}


module.exports = mongoose.model('User', userSchema, 'users');
