import { Op } from 'sequelize'
import User from '../models/user.m'
import bcryptjs from 'bcryptjs'
import { Request, Response } from 'express'
import sendResult from '../constant/sendRes'
import jwt from 'jsonwebtoken'
import { jwtSecretKey, pinEmailPath, enableSmtp } from '../constant/config'
import { sendMail } from '../tools/mailer'

export const createUser = async (req: Request, res: Response) => {
	let { name, password, email } = req.body
	try {
		//密码加密
		password = bcryptjs.hashSync(password, 10)
		let pin = null
		let pinDate = null

		if (enableSmtp) {
			//生成验证码
			pin = Math.floor(+Math.random().toFixed(6) * 1000000)
			pinDate = new Date()
			sendMail(email, '验证码', pinEmailPath, { pin })
		}

		//添加到数据库同时判断是否已存在 如果之前不存在则created为true
		const [result, newCreate] = await User.findOrCreate({
			where: {
				[Op.or]: [{ email }, { name }],
			},
			defaults: {
				name,
				email,
				password,
				isAdmin: 0,
				pin,
				pinDate,
				certified: enableSmtp ? false : true,
			},
		})
		if (!newCreate) {
			sendResult.nameOrEmailExist(res, {
				email,
				name,
			})
		} else {
			sendResult.success(res, {
				email,
				name,
			})
		}
	} catch (err) {
		sendResult.unknowFailed(res, err)
	}
}

export const login = async (req: Request, res: Response) => {
	let { email, password } = req.body
	//从数据库取出密码
	try {
		const result = await User.findOne({
			where: {
				email,
			},
		})
		if (result) {
			if (result.get('certified') as boolean) {
				return sendResult.notCertified(res)
			}
			const p: string = result.get('password') as string
			const name = result.get('name')
			if (await bcryptjs.compare(password, p)) {
				const tokenStr = jwt.sign({ name, email }, jwtSecretKey, {
					expiresIn: '1w',
				})
				sendResult.success(res, { email, token: tokenStr })
			} else {
				//密码错误
				sendResult.passwrodError(res, { email })
			}
		} else {
			//用户不存在
			sendResult.userNotExist(res, { email })
		}
	} catch (err) {
		sendResult.unknowFailed(res, err)
	}
}

export const verifyPin = async (req: Request, res: Response) => {
	if (!enableSmtp) {
		return sendResult.notEnablePin(res)
	}
	const { email, pin } = req.body
	let result = await User.findOne({
		where: {
			email,
		},
	})
	if (result) {
		if (!result.get('pin')) {
			return sendResult.pinNotExist(res)
		}
		const pinDate: Date = result.get('pinDate') as Date
		const currentDate = new Date()
		const timespan = (currentDate.getTime() - pinDate.getTime()) / 1000 / 60
		if (timespan > 60) {
			return sendResult.pinTimeLimit(res)
		}

		if (result.get('pin') === +pin) {
			await User.update(
				{ certified: true, pin: null, pinDate: null },
				{
					where: {
						email,
					},
				}
			)
			sendResult.success(res, { email, pin })
		} else {
			sendResult.wrongPin(res, { email, pin })
		}
	} else {
		sendResult.userNotExist(res, { email })
	}
}

export const sendPin = async (req: Request, res: Response) => {
	if (!enableSmtp) {
		return sendResult.notEnablePin(res)
	}
	const { email } = req.body
	let result = await User.findOne({
		where: {
			email,
		},
	})
	if (result) {
		const pinDate: Date = result.get('pinDate') as Date
		const currentDate = new Date()
		const timespan = (currentDate.getTime() - pinDate.getTime()) / 1000 / 60
		if (timespan < 1) {
			return sendResult.timespanNotEnough(res)
		}
		//生成验证码
		const pin = Math.floor(+Math.random().toFixed(6) * 1000000)
		//发送验证码
		sendMail(email, '验证码', pinEmailPath, { pin })
	} else {
		sendResult.userNotExist(res)
	}
}
