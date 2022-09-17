import { Request, Response, NextFunction } from 'express'
import {
	validationResult,
	body,
	ValidationChain,
	query,
	param,
} from 'express-validator'
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

export const nameValidator = () =>
	body('name')
		.isString()
		.withMessage('参数类型错误或缺少参数')
		.isLength({ max: 20 })
		.withMessage('不符合长度限制(应少于20字符)')

export const emailValidator = () =>
	body('email').isEmail().withMessage('参数类型错误或缺少参数')

export const passwordValidator = () =>
	body('password')
		.isString()
		.withMessage('参数类型错误或缺少参数')
		.isLength({ min: 6, max: 50 })
		.withMessage('不符合长度限制(应多于6字符, 少于50字符)')

export const urlnameValidator = () =>
	body('urlname')
		.isAlpha()
		.withMessage('参数类型错误或缺少参数')
		.isLength({ max: 50 })
		.withMessage('不符合长度限制(应少于50字符)')

export const descriptionValidator = () =>
	body('description')
		.isString()
		.withMessage('参数类型错误或缺少参数')
		.isLength({ max: 255 })
		.withMessage('不符合长度限制(应少于255字符)')

export const parentIdValidator = () =>
	body('parentId').isInt().withMessage('参数类型错误或缺少参数')

export const idValidator = () =>
	param('id').isInt().withMessage('参数类型错误或缺少参数')

export const pinValidator = () =>
	body('pin').isInt().withMessage('参数类型错误或缺少参数')

export const titleValidator = () =>
	body('title')
		.isString()
		.withMessage('参数类型错误或缺少参数')
		.isLength({ max: 255 })
		.withMessage('不符合长度限制(应少于255字符)')

export const contentValidator = () =>
	body('content')
		.isString()
		.withMessage('参数类型错误或缺少参数')
		.isLength({ max: 65535 })
		.withMessage('不符合长度限制(应少于65535字符)')

export const categoryIdValidator = () =>
	body('categoryid').isInt().withMessage('参数类型错误或缺少参数')

export const imageValidator = () =>
	body('image').isURL().withMessage('参数类型错误或缺少参数')

export const topValidator = () =>
	body('top').isInt().withMessage('参数类型错误或缺少参数')

export const hideValidator = () =>
	body('hide').isBoolean().withMessage('参数类型错误或缺少参数')

export const offsetValidator = () =>
	query('offset').isInt().withMessage('参数类型错误或缺少参数')

export const limitValidator = () =>
	query('limit').isInt().withMessage('参数类型错误或缺少参数')
