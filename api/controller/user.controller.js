import { errorHandler } from '../utils/error.js'
import { hashPassword } from '../utils/hashpassword.js'
import User from '../model/user.model.js'
import Listing from '../model/listing.model.js'
const test = async(req,res,next) => {
	try {
		const allUser = await User.find({});
		res.status(200).json(allUser)
	} catch (error) {
		next(error)
	}
}

const updateUser = async(req,res,next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401,"You can only update your own account!"))
	try {
		if(req.body.password){
			req.body.password = await hashPassword(req.body.password);
		}
		const updatedUser = await User.findByIdAndUpdate(req.params.id,{
			$set :{
				username : req.body.username,
				email : req.body.email,
				password: req.body.password,
				avatar: req.body.avatar,
			}
		},{new : true});
		const {password,...rest} = updatedUser._doc;
		res.status(200).json(rest)
	} catch (error) {
		next(error)
	}
}

const deteteUser = async (req,res,next) => {
	if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"))
	try {
		await User.findByIdAndDelete(req.params.id)
		res.clearCookie('access_token');
		res.status(200).json({message: 'user has been deleted...'});
	} catch (error) {
		next(error)
	}
}

const getUserListing = async (req,res,next) => {
	 if(req.user.id === req.params.id){
try {
	const listings = await Listing.find({userRef: req.params.id})
	res.status(200).json(listings);
} catch (error) {
	next(error)
}
	 }else{
		return next(errorHandler(401,'You can only view your own listing!'))
	 }
}

const getUser = async(req,res,next) => {
	try {
		const user = await User.findById(req.params.id)
		if(!user){
			return next(errorHandler(404,'User not found!'))
		}
		const {password: pass,...rest} = user._doc
		res.status(200).json(rest)
	} catch (error) {
		next(error)
	}
}

export { test, updateUser, deteteUser, getUserListing, getUser }