import express from 'express'
import { oneOf } from 'express-validator'
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
	titleValidator(),
	urlnameValidator(),
	descriptionValidator(),
	contentValidator(),
	categoryIdValidator().optional(),
	imageValidator().optional(),
	topValidator().optional(),
	passwordValidator().optional(),
	validator,
	createPost
)

//删除文章
router.delete('/:id', idValidator(), validator, deletePost)

//修改文章
router.put(
	'/:id',
	jwtAuth,
	isAdmin,
	idValidator(),
	oneOf(
		[
			categoryIdValidator(),
			imageValidator(),
			topValidator(),
			passwordValidator(),
		],
		'缺少参数'
	),
	validator,
	updatePost
)

//获取单个文章
router.get('/:id', idValidator(), getPost)

//获取文章列表
router.get(
	'/list',
	limitValidator().optional(),
	offsetValidator().optional(),
	getPosts
)

export default router
