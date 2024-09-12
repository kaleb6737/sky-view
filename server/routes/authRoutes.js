import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // Ensure this path is correct

const router = express.Router();

// User signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log('Signup attempt:', { username, password });  // Logging the incoming credentials

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    console.log('Existing user check:', existingUser);  // Log the result of the user search

    if (existingUser) {
      console.log('Signup error: User already exists');
      return res.status(400).json({ message: "User already exists!" });
    }
    
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Hashed password:', hashedPassword);  // Log the hashed password

    const user = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    console.log('User saved:', user);  // Log the saved user object

    // Generate JWT token for the new user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT token generated:', token);  // Log the JWT token

    // Return the token and success message
    res.status(201).json({ token, message: "User created successfully!" });
  } catch (error) {
    console.error('Signup error:', error);  // Log any errors that occur
    res.status(500).json({ message: "Failed to register user." });
  }
});

// User login
// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt with username:', username);  // Log the username attempt
  console.log('Incoming password:', password);  // Log the raw incoming password

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Login error: User not found');
      return res.status(404).json({ message: "User not found!" });
    }

    console.log('Stored hash for user:', user.password);  // Log the stored password hash

    // Optionally log a new hash of the incoming password
    const debugHash = await bcrypt.hash(password, 12);
    console.log('Debug hash of incoming password:', debugHash);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isMatch);  // Log the result of the password comparison

    if (!isMatch) {
      console.log('Login error: Invalid credentials');
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT generated for login:', token);  // Log the generated JWT

    // Return token to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);  // Log any errors during login
    res.status(500).json({ message: "Login failed." });
  }
});

export default router;
