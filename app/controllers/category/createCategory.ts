import { Request, Response } from 'express'
import sendResult from '../../constant/sendRes'
import { Category } from '../../models/category.m'

export const createCategory = async (req: Request, res: Response) => {
	let { name, urlname, parentId } = req.body
	try {
		//判断urlname是否存在
		let result = await Category.findOne({
			attributes: ['id', 'name', 'urlname', 'parentId'],
			where: {
				urlname,
			},
		})
		if (result) {
			return sendResult.urlnameExist(res, result)
		}
		//判断父分类是否存在
		if (parentId) {
			result = await Category.findOne({
				attributes: ['id', 'name', 'urlname', 'parentId'],
				where: {
					id: parentId,
				},
			})
			if (!result) {
				return sendResult.parentCategoryNotExist(res, {
					name,
					urlname,
					parentId,
				})
			}
		}
		let newCreate
		//添加分类
		if (parentId) {
			;[result, newCreate] = await Category.findOrCreate({
				where: {
					name,
					parentId,
				},
				defaults: {
					name,
					urlname,
					parentId,
				},
			})
		} else {
			;[result, newCreate] = await Category.findOrCreate({
				where: {
					name,
				},
				defaults: {
					name,
					urlname,
				},
			})
		}
		if (!newCreate) {
			sendResult.nameOrEmailExist(res, {
				name,
				urlname,
			})
		} else {
			sendResult.success(res, {
				name,
				urlname,
			})
		}
	} catch (err) {
		sendResult.unknowFailed(res, err)
	}
}
