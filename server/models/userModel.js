import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
  return regex.test(password);
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(next) {
  console.log('Pre-save hook triggered for:', this.username);

  // Validate password strength before hashing
  if (this.isModified('password')) {
    if (!validatePassword(this.password)) {
      console.error('Password validation failed for:', this.username);
      const err = new Error('Password does not meet strength requirements.');
      err.statusCode = 400;
      return next(err);
    }

    // Hash the password if it passes validation
    console.log('Hashing password for:', this.username);
    this.password = await bcrypt.hash(this.password, 12);
    console.log('Hashed password:', this.password);
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;



// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// userSchema.pre('save', async function(next) {
//   console.log('Pre-save hook triggered for:', this.username);
//   if (this.isModified('password')) {
//     console.log('Hashing password for:', this.username);
//     this.password = await bcrypt.hash(this.password, 12);
//     console.log('Hashed password:', this.password);
//   }
//   next();
// });


// const User = mongoose.model('User', userSchema);

// export default User;  // This is correct for ES6 modules

// Documentation: User Model Update to Prevent Double Hashing
// Overview
// This update to the user model introduces a safeguard to prevent the password field from being hashed more than once before saving it to the MongoDB database. This change ensures that user authentication remains reliable and secure by maintaining the integrity of the stored password hashes.

// Problem Identified
// Prior to the update, there were instances where the password hashing mechanism in the pre('save') hook of our Mongoose schema might inadvertently re-hash an already hashed password. This was due to multiple calls to the save() method on the same user instance, leading to authentication failures during user login because the password hashes did not match.

// Solution Implemented
// To address this, we introduced a conditional check within the pre-save middleware to determine if the password has already been hashed. If the password is identified as hashed (based on its format and salt rounds), the middleware skips re-hashing and proceeds with saving the user object.

// Code Changes

// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// userSchema.pre('save', async function(next) {
//   // Log to see if this function is called more than once
//   console.log('Pre-save hook triggered for:', this.username);

//   // Only hash the password if it has been modified and is not already hashed
//   if (this.isModified('password')) {
//     // Check if password needs hashing
//     if (!this.password.startsWith('$2a$12$')) {
//       console.log('Hashing password for:', this.username);
//       this.password = await bcrypt.hash(this.password, 12);
//       console.log('Hashed password:', this.password);
//     } else {
//       console.log('Password already hashed:', this.password);
//     }
//   }
//   next();
// });

// const User = mongoose.model('User', userSchema);

// export default User;
