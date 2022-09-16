import express from 'express'
import { createUser, login, sendPin, verifyPin } from '../controllers/user.c'
import {
	validator,
	nameValidator,
	emailValidator,
	passwordValidator,
	pinValidator,
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

//注册验证
router.post(
	'/verify',
	existsValidator(pinValidator),
	existsValidator(emailValidator),
	validator,
	verifyPin
)

//重新发送验证码
router.post('/sendPin', existsValidator(emailValidator), validator, sendPin)

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
