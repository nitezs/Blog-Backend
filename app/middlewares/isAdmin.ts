import { Response, NextFunction } from 'express'
import { Request } from 'express-jwt'
import User from '../models/user.m'
import sendResult from '../constant/sendRes'

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const email = req.auth?.email
	const result = await User.findOne({
		attributes: ['isAdmin'],
		where: {
			email,
		},
	})
	if (result) {
		if (result.getDataValue('isAdmin')) {
			next()
		} else {
			sendResult.notAdmin(res, {
				email,
			})
		}
	} else {
		sendResult.userNotExist(res, {
			email,
		})
	}
}

export default isAdmin
