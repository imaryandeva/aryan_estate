import mongoose from 'mongoose'

async function connectDb(url){
	return await mongoose.connect(url)
}

export default connectDb;