import express from 'express'
import { createUser, login } from '../controllers/user.c'
import {
	validator,
	nameValidator,
	emailValidator,
	passwordValidator,
	existsValidator as existsValidator,
} from '../middlewares/validator'

const router = express.Router()

//注册
router.post(
	'/',
	existsValidator(nameValidator),
	existsValidator(emailValidator),
	existsValidator(passwordValidator),
	validator,
	createUser
)

//登录
router.post(
	'/login',
	existsValidator(emailValidator),
	existsValidator(passwordValidator),
	login
)

//更新密码

//更新信息

export default router
