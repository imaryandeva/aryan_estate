import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

const signUp = async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.status(200).json({ message: 'user created successfully.' });
	} catch (error) {
		// res.status(500).json({ message: error.message });
		next(error);
	}
}

const signin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const validUser = await User.findOne({ email: email });
		if (!validUser) return next(errorHandler(404, 'User not found!'));

		const isPasswordCorrect = await validUser.isPasswordCorrect(password);
		if (!isPasswordCorrect) return next(errorHandler(401, 'Invalid Password!'));

		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
		const { password: pass, ...rest } = validUser._doc;
		res
			.cookie('access_token', token, { httpOnly: true })
			.status(200)
			.json(rest);
	} catch (error) {
		next(error);
	}
}





const signInWithGoogle = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			const { password: pass, ...rest } = user._doc;
			res
				.cookie('access_token', token, { httpOnly: true })
				.status(200)
				.json(rest);
		} else {
			const generatedPassword = Math.random().toString(36).slice(-8);
			// const hashPassword = await bcrypt.hash(generatedPassword, 10); // Hash the generated password
			const newUser = await User.create({
				username:
					req.body.name.split(' ').join('').toLowerCase() +
					Math.random().toString(36).slice(-4),
				email: req.body.email,
				password: generatedPassword,
				avatar: req.body.photo,
			});
			const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
			const { password: pass, ...rest } = newUser._doc;
			res
				.cookie('access_token', token, { httpOnly: true })
				.status(200)
				.json(rest);
		}
	} catch (error) {
		next(error);
	}
};

const signout = async (req, res, next) => {
	try {
		res.clearCookie('access_token');
		res.status(200).json({ message: 'user has been looged out!' })
	} catch (error) {
		next(error)
	}
}

export { signUp, signin, signInWithGoogle, signout }