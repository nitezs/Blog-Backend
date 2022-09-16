import { Request, Response, NextFunction } from 'express'
import { validationResult, body } from 'express-validator'
import { isBooleanObject } from 'util/types'
import sendResult from '../constant/sendRes'

export const validator = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const verr = validationResult(req)
	if (!verr.isEmpty()) {
		sendResult.validationFailed(res, verr)
	} else {
		next()
	}
}

export const nameValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('name')
		.exists()
		.withMessage('缺少参数')
		.notEmpty()
		.withMessage('不能为空')
		.isLength({ max: 20 })
		.withMessage('不符合长度限制(应少于20字符)')
		.run(req)
	next()
}

export const emailValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('email')
		.exists()
		.withMessage('缺少参数')
		.notEmpty()
		.withMessage('不能为空')
		.isEmail()
		.withMessage('电子邮箱格式错误')
		.run(req)
	next()
}

export const passwordValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('password')
		.exists()
		.withMessage('缺少参数')
		.notEmpty()
		.withMessage('不能为空')
		.isLength({ min: 6, max: 50 })
		.withMessage('不符合长度限制(应多于6字符, 少于50字符)')
		.run(req)
	next()
}

export const urlnameValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('urlname')
		.exists()
		.withMessage('缺少参数')
		.notEmpty()
		.withMessage('不能为空')
		.isLength({ max: 50 })
		.withMessage('不符合长度限制(应少于50字符)')
		.run(req)
	next()
}

export const urlnameOptionalValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('urlname')
		.optional()
		.notEmpty()
		.withMessage('不能为空')
		.isLength({ max: 50 })
		.withMessage('不符合长度限制(应少于50字符)')
		.run(req)
	next()
}

export const descriptionValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('description')
		.exists()
		.withMessage('缺少参数')
		.notEmpty()
		.withMessage('不能为空')
		.isLength({ max: 255 })
		.withMessage('不符合长度限制(应少于255字符)')
		.run(req)
	next()
}

export const descriptionOptionalValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('description')
		.optional()
		.notEmpty()
		.withMessage('不能为空')
		.isLength({ max: 255 })
		.withMessage('不符合长度限制(应少于255字符)')
		.run(req)
	next()
}

export const parentIdValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('parentId')
		.optional()
		.notEmpty()
		.withMessage('不能为空')
		.isInt()
		.withMessage('必须为Int')
		.run(req)
	next()
}

export const idValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('id')
		.notEmpty()
		.withMessage('不能为空')
		.isInt()
		.withMessage('必须为Int')
		.run(req)
	next()
}

export const pinValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('pin')
		.notEmpty()
		.withMessage('不能为空')
		.isInt()
		.withMessage('必须为Int')
		.run(req)
	next()
}

export const titleValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('title')
		.exists()
		.notEmpty()
		.withMessage('不能为空')
		.isLength({ max: 255 })
		.withMessage('不符合长度限制(应少于255字符)')
		.run(req)
	next()
}

export const titleOptionalValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('title')
		.optional()
		.notEmpty()
		.withMessage('不能为空')
		.isLength({ max: 255 })
		.withMessage('不符合长度限制(应少于255字符)')
		.run(req)
	next()
}

export const contentValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('content')
		.exists()
		.notEmpty()
		.withMessage('不能为空')
		.isLength({ max: 65535 })
		.withMessage('不符合长度限制(应少于65535字符)')
		.run(req)
	next()
}

export const contentOptionalValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('content')
		.optional()
		.notEmpty()
		.withMessage('不能为空')
		.isLength({ max: 65535 })
		.withMessage('不符合长度限制(应少于65535字符)')
		.run(req)
	next()
}

export const categoryIdValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('categoryId')
		.optional()
		.notEmpty()
		.withMessage('不能为空')
		.isInt()
		.withMessage('必须为Int')
		.run(req)
	next()
}

export const imageValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('image').optional().notEmpty().withMessage('不能为空').run(req)
	next()
}

export const topValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('top')
		.optional()
		.notEmpty()
		.withMessage('不能为空')
		.isInt()
		.withMessage('必须为Int')
		.run(req)
	next()
}

export const postPasswordValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('password').optional().notEmpty().withMessage('不能为空').run(req)
	next()
}

export const hideValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await body('hide')
		.optional()
		.notEmpty()
		.withMessage('不能为空')
		.isBoolean()
		.withMessage('必须为 "true" 或 "false"')
		.run(req)
	next()
}
