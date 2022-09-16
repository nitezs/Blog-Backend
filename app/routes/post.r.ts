import express from 'express'
import { createPost } from '../controllers/post.c'
import isAdmin from '../middlewares/isAdmin'
import jwtAuth from '../middlewares/jwtAuth'
import {
	categoryIdValidator,
	contentValidator,
	descriptionValidator,
	imageValidator,
	postPasswordValidator,
	titleValidator,
	topValidator,
	urlnameValidator,
	validator,
} from '../middlewares/validator'
const router = express.Router()

// 创建文章
router.post(
	'/',
	jwtAuth,
	isAdmin,
	titleValidator,
	urlnameValidator,
	descriptionValidator,
	contentValidator,
	categoryIdValidator,
	imageValidator,
	topValidator,
	postPasswordValidator,
	validator,
	createPost
)

export default router
