import express from 'express'
import { createCategory } from '../controllers/category/createCategory'
import { deleteCategory } from '../controllers/category/deleteCategory'
import { getAllCategories } from '../controllers/category/getAllCategories'
import isAdmin from '../middlewares/isAdmin'
import jwtAuth from '../middlewares/jwtAuth'
import {
	descriptionValidator,
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
	nameValidator,
	urlnameValidator,
	descriptionValidator,
	parentIdValidator,
	validator,
	createCategory
)

router.get('/all', getAllCategories)

//删除分类
router.delete('/', jwtAuth, isAdmin, idValidator, validator, deleteCategory)

//TODO:修改分类

export default router
