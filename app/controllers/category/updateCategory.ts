import { Request, Response } from 'express'
import sendResult from '../../constant/sendRes'
import { Category } from '../../models/category.m'

export const updateCategory = async (req: Request, res: Response) => {
	let { id } = req.params
	let { name, urlname, parentId } = req.body
	let result: any = await Category.findOne({
		attributes: ['id'],
		where: {
			id,
		},
	})
	//判断分类是否存在
	if (!result) {
		return sendResult.categoryNotExist(res, {
			id,
		})
	}
	//判断父分类是否存在
	if (parentId) {
		result = await Category.findOne({
			attributes: ['id'],
			where: {
				id: parentId,
			},
		})
		if (!result) {
			return sendResult.parentCategoryNotExist(res, {
				parentId,
			})
		}
	}
	//修改分类
	result = await Category.update(
		{ name, urlname, parentId },
		{
			where: {
				id,
			},
		}
	)
	sendResult.success(res, { id, name, urlname, parentId })
}
