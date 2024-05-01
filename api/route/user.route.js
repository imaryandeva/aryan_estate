import express from "express";
import { test, updateUser, deteteUser, getUserListing, getUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyuser.js";

const router = express.Router();

router.get('/test', test);
router.post('/update/:id',verifyToken ,updateUser);
router.delete('/delete/:id',verifyToken ,deteteUser);
router.get('/listings/:id',verifyToken ,getUserListing);
router.get('/:id',verifyToken ,getUser);

export default router;
