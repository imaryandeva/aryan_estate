import express from "express";
import dotenv from "dotenv";
import connectDb from "./DB/connection.js";
import userRoute from "./route/user.route.js";
import authRouter from "./route/auth.route.js"
import listingRouter from "./route/listing.route.js"
import cookieParser from 'cookie-parser'
import path from 'path';

const __dirname = path.resolve();

dotenv.config();
const app = express(); 

const port = process.env.PORT || 9000;
const HOST = 'localhost';
connectDb(process.env.CONNECTION_STRING)
	.then(() => {
		console.log('MongoDB Connected Successfully');
		app.listen(port, HOST, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((error) => {
		console.error("MongoDB Connection Error:", error);
	});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/user', userRoute);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use((err,req,res,next)=>{
	const statusCode = err.statusCode || 500
	const message = err.message || 'Enternal Server Error'
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message
	})
})




	