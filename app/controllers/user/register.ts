import { Op } from 'sequelize'
import User from '../../models/user.m'
import bcryptjs from 'bcryptjs'
import { Request, Response } from 'express'
import sendResult from '../../constant/sendRes'

export const register = async (req: Request, res: Response) => {
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
