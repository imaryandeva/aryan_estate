import bcrypt from 'bcrypt';
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, 'username is required'],
		unique: true
	},
	email: {
		type: String,
		required: [true, 'email is required'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
	avatar:{
		type: String,
		default: "https://tse1.mm.bing.net/th?id=OIP.Ghae4OEdb4UmC3hkqpFvLAHaGd&pid=Api&P=0&h=180"
	},
}, { timestamps: true });

userSchema.pre("save", async function (next) {
	if (!this.isModified('password')) return next();
	try {
		this.password = await bcrypt.hash(this.password, 10);
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.isPasswordCorrect = async function (password) {
	try {
		// Compare the provided plaintext password with the hashed password stored in the database
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		// Return false if there's an error (e.g., invalid hashed password format)
		return false;
	}
};


const User = mongoose.model('User', userSchema);

export default User;
