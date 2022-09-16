import express from 'express'
import { createPost, deletePost, updatePost } from '../controllers/post.c'
import isAdmin from '../middlewares/isAdmin'
import jwtAuth from '../middlewares/jwtAuth'
import {
	categoryIdValidator,
	contentOptionalValidator,
	contentValidator,
	descriptionOptionalValidator,
	descriptionValidator,
	idValidator,
	imageValidator,
	postPasswordValidator,
	titleOptionalValidator,
	titleValidator,
	topValidator,
	urlnameOptionalValidator,
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

//删除文章
router.delete('/', idValidator, validator, deletePost)

//修改文章
router.put(
	'/',
	jwtAuth,
	isAdmin,
	idValidator,
	titleOptionalValidator,
	urlnameOptionalValidator,
	descriptionOptionalValidator,
	contentOptionalValidator,
	categoryIdValidator,
	imageValidator,
	topValidator,
	postPasswordValidator,
	validator,
	updatePost
)

export default router
