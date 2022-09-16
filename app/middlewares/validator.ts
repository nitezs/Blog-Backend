import { Request, Response, NextFunction } from 'express'
import {
	validationResult,
	body,
	ValidationChain,
	query,
} from 'express-validator'
import { isBooleanObject } from 'util/types'
import sendResult from '../constant/sendRes'

export const validator = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const verr = validationResult(req)
	if (!verr.isEmpty()) {
		sendResult.validationFailed(res, verr.array()[0])
	} else {
		next()
	}
}

export const existsValidator = (chain: ValidationChain) => {
	return chain.exists().withMessage('缺少参数')
}

// export const nameValidator = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	await body('name')
//
// 		.withMessage('缺少参数')
// 		.notEmpty()
// 		.withMessage('不能为空')
// 		.isLength({ max: 20 })
// 		.withMessage('不符合长度限制(应少于20字符)')
// 		.run(req)
// 	next()
// }

export const nameValidator = body('name')
	.notEmpty()
	.withMessage('不能为空')
	.isLength({ max: 20 })
	.withMessage('不符合长度限制(应少于20字符)')

export const emailValidator = body('email')
	.notEmpty()
	.withMessage('不能为空')
	.isEmail()
	.withMessage('电子邮箱格式错误')

export const passwordValidator = body('password')
	.notEmpty()
	.withMessage('不能为空')
	.isLength({ min: 6, max: 50 })
	.withMessage('不符合长度限制(应多于6字符, 少于50字符)')

export const urlnameValidator = body('urlname')
	.notEmpty()
	.withMessage('不能为空')
	.isLength({ max: 50 })
	.withMessage('不符合长度限制(应少于50字符)')

export const descriptionValidator = body('description')
	.notEmpty()
	.withMessage('不能为空')
	.isLength({ max: 255 })
	.withMessage('不符合长度限制(应少于255字符)')

export const parentIdValidator = body('parentId')
	.notEmpty()
	.withMessage('不能为空')
	.isInt()
	.withMessage('必须为Int')

export const idValidator = body('id')
	.notEmpty()
	.withMessage('不能为空')
	.isInt()
	.withMessage('必须为Int')

export const pinValidator = body('pin')
	.notEmpty()
	.withMessage('不能为空')
	.isInt()
	.withMessage('必须为Int')

export const titleValidator = body('title')
	.notEmpty()
	.withMessage('不能为空')
	.isLength({ max: 255 })
	.withMessage('不符合长度限制(应少于255字符)')

export const contentValidator = body('content')
	.notEmpty()
	.withMessage('不能为空')
	.isLength({ max: 65535 })
	.withMessage('不符合长度限制(应少于65535字符)')

export const categoryIdValidator = body('categoryId')
	.notEmpty()
	.withMessage('不能为空')
	.isInt()
	.withMessage('必须为Int')

export const imageValidator = body('image').notEmpty().withMessage('不能为空')

export const topValidator = body('top')
	.notEmpty()
	.withMessage('不能为空')
	.isInt()
	.withMessage('必须为Int')

export const postPasswordValidator = body('password')
	.notEmpty()
	.withMessage('不能为空')

export const hideValidator = body('hide')
	.notEmpty()
	.withMessage('不能为空')
	.isBoolean()
	.withMessage('必须为 "true" 或 "false"')

export const offsetValidator = query('offset')
	.notEmpty()
	.withMessage('不能为空')
	.isInt()
	.withMessage('必须为Int')

export const limitValidator = query('limit')
	.notEmpty()
	.withMessage('不能为空')
	.isInt()
	.withMessage('必须为Int')
