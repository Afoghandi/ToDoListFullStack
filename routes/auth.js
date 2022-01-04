const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validateRegisterInput = require('../validation/registerValidation');

// @route GET /api/auth/test
// @desc  Test the auth route
// @access Public
router.get('/test', (req, res) => {
	res.send('Auth is working');
});

// @route Post /api/auth/register
// @desc  Create a new user
// @access Public

router.post('/register', async (req, res) => {
	try {
		const { errors, isValid } = validateRegisterInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}
		//deconstruct from req.body
		const { email, password, name } = req.body;

		//check for existing user
		const existingEmail = await User.findOne({
			email: new RegExp('^' + email + '$', 'i'),
		});
		if (existingEmail) {
			return res
				.status(400)
				.json({ error: 'There is already a user with this email' });
		}
		//hash password
		const hashedPassword = await bcrypt.hash(password, 12);
		// create a new user
		const newUser = new User({
			email: email,
			password: hashedPassword,
			name: name,
		});

		// save the user to the database
		const savedUser = await newUser.save();

		//retuen the new user

		return res.json(savedUser);
	} catch (err) {
		console.log(err);
		res.status(500).send(err.message);
	}
});
module.exports = router;
