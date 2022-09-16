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
		password = bcryptjs.hashSync(password, 10)
		let pin = null
		let pinDate = null

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
