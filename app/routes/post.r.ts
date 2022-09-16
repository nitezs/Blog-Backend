import express, { Request } from 'express'
import { body, oneOf } from 'express-validator'
import { createPost, deletePost, updatePost } from '../controllers/post.c'
import isAdmin from '../middlewares/isAdmin'
import jwtAuth from '../middlewares/jwtAuth'
import {
	categoryIdValidator,
	contentValidator,
	descriptionValidator,
	idValidator,
	imageValidator,
	postPasswordValidator,
	titleValidator,
	topValidator,
	urlnameValidator,
	validator,
	existsValidator,
} from '../middlewares/validator'
const router = express.Router()

// 创建文章
router.post(
	'/',
	jwtAuth,
	isAdmin,
	existsValidator(titleValidator),
	existsValidator(urlnameValidator),
	existsValidator(descriptionValidator),
	existsValidator(contentValidator),
	categoryIdValidator,
	imageValidator,
	topValidator,
	postPasswordValidator,
	validator,
	createPost
)

//删除文章
router.delete(
	'/',
	oneOf([existsValidator(idValidator), existsValidator(urlnameValidator)]),
	validator,
	deletePost
)

//修改文章
router.put(
	'/',
	jwtAuth,
	isAdmin,
	oneOf([existsValidator(idValidator), existsValidator(urlnameValidator)]),
	categoryIdValidator,
	imageValidator,
	topValidator,
	postPasswordValidator,
	validator,
	updatePost
)

export default router
