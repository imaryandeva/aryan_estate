import express from "express";
import { signUp, signin, signInWithGoogle, signout } from "../controller/auth.controller.js"
const router = express.Router();

router.post('/signup', signUp)
router.post('/signin', signin)
router.post('/google', signInWithGoogle)
router.get('/signout', signout)

export default router;