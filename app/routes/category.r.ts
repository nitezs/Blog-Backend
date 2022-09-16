import express from 'express'
import {
	createCategory,
	deleteCategory,
	getAllCategories,
} from '../controllers/category.c'
import jwtAuth from '../middlewares/jwtAuth'
import isAdmin from '../middlewares/isAdmin'
import {
	nameValidator,
	validator,
	urlnameValidator,
	descriptionValidator,
	parentIdValidator,
	idValidator,
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
