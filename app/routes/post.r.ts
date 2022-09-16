import express from 'express'
import { createPost } from '../controllers/post/createPost'
import { deletePost } from '../controllers/post/deletePost'
import { getPost } from '../controllers/post/getPost'
import { getPosts } from '../controllers/post/getPosts'
import { updatePost } from '../controllers/post/updatePost'
import isAdmin from '../middlewares/isAdmin'
import jwtAuth from '../middlewares/jwtAuth'
import {
	categoryIdValidator,
	contentValidator,
	descriptionValidator,
	existsValidator,
	idValidator,
	imageValidator,
	limitValidator,
	offsetValidator,
	passwordValidator,
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
	existsValidator(titleValidator),
	existsValidator(urlnameValidator),
	existsValidator(descriptionValidator),
	existsValidator(contentValidator),
	categoryIdValidator,
	imageValidator,
	topValidator,
	passwordValidator,
	validator,
	createPost
)

//删除文章
router.delete('/', existsValidator(idValidator), validator, deletePost)

//修改文章
router.put(
	'/',
	jwtAuth,
	isAdmin,
	existsValidator(idValidator),
	categoryIdValidator,
	imageValidator,
	topValidator,
	passwordValidator,
	validator,
	updatePost
)

//获取单个文章
router.get('/', existsValidator(urlnameValidator), getPost)

//获取文章列表
router.get('/list', limitValidator, offsetValidator, getPosts)

export default router
