import express from 'express'
import { createUser, login, sendPin, verifyPin } from '../controllers/user.c'
import {
	validator,
	nameValidator,
	emailValidator,
	passwordValidator,
	pinValidator,
} from '../middlewares/validator'
import jwtAuth from '../middlewares/jwtAuth'
import { Request } from 'express-jwt'
import isAdmin from '../middlewares/isAdmin'

const router = express.Router()

//注册
router.post(
	'/',
	nameValidator,
	emailValidator,
	passwordValidator,
	validator,
	createUser
)

//注册验证
router.post('/verify', pinValidator, emailValidator, validator, verifyPin)

//重新发送验证码
router.post('/sendPin', emailValidator, validator, sendPin)

//登录
router.post('/login', emailValidator, passwordValidator, login)

//更新密码

//更新信息

export default router
