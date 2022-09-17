import express from 'express'
import { oneOf } from 'express-validator'
import { createCategory } from '../controllers/category/createCategory'
import { deleteCategory } from '../controllers/category/deleteCategory'
import { getAllCategories } from '../controllers/category/getAllCategories'
import { updateCategory } from '../controllers/category/updateCategory'
import isAdmin from '../middlewares/isAdmin'
import jwtAuth from '../middlewares/jwtAuth'
import {
	idValidator,
	nameValidator,
	parentIdValidator,
	urlnameValidator,
	validator,
} from '../middlewares/validator'
const router = express.Router()

//添加分类
router.post(
	'/',
	jwtAuth,
	isAdmin,
	nameValidator(),
	urlnameValidator(),
	parentIdValidator(),
	validator,
	createCategory
)

router.get('/all', getAllCategories)

//删除分类
router.delete(
	'/:id',
	jwtAuth,
	isAdmin,
	idValidator(),
	validator,
	deleteCategory
)

//TODO:修改分类
router.put(
	'/:id',
	jwtAuth,
	isAdmin,
	idValidator(),
	oneOf([urlnameValidator(), nameValidator(), parentIdValidator()]),
	updateCategory
)

export default router
