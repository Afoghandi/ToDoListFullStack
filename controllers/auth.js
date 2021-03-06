import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import validateRegisterInput from '../validation/registerValidation.js';
import jwt from 'jsonwebtoken';

// @desc  Test the auth route
// @access Public

export const test = async (req, res) => {
	try {
		res.send('Auth is working');
	} catch (error) {
		console.log('Not working');
	}
};

// @desc  Create a new user
// @access Public

export const registerUser = async (req, res) => {
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

		const payload = { userId: savedUser._id };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});

		res.cookie('access-token', token, {
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		});

		const userToReturn = { ...savedUser._doc };

		delete userToReturn.password;
		//retuen the new user

		return res.json(userToReturn);
	} catch (err) {
		console.log(err);
		res.status(500).send(err.message);
	}
};

// @desc  Loging user and return access token
// @access Public
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		//check for the user
		const user = await User.findOne({
			email: new RegExp('^' + email + '$', 'i'),
		});
		if (!user) {
			return res
				.status(400)
				.json({ error: 'There was a problem with your login credentials' });
		}
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res

				.status(400)
				.json({ error: 'There was a problem with your login credentials' });
		}

		const payload = { userId: user._id };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});

		res.cookie('access-token', token, {
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		});

		const userToReturn = { ...user._doc };
		delete userToReturn.password;

		return res.json({
			token: token,
			user: userToReturn,
		});
	} catch (err) {
		return res.status(500).send(err.message);
	}
};

// @desc  Return the currently authed user
// @access Private

export const current = async (req, res) => {
	if (!req.user) {
		return res.status(401).send('Unauthorised');
	}
	return res.json(req.user);
};

// @desc  Logout user and clear the cookie
// @access Private

export const logout = async (req, res) => {
	try {
		res.clearCookie('access-token');

		return res.json({ success: true });
	} catch (err) {
		console.log(err);
		return res.status(500).send(err.message);
	}
};
