import { Request, Response } from 'express'
import sendResult from '../../constant/sendRes'
import { Category } from '../../models/category.m'

export const deleteCategory = async (req: Request, res: Response) => {
	let { id } = req.params
	await Category.update(
		{
			parentId: null,
		},
		{
			where: {
				parentId: id,
			},
		}
	)
	let result = await Category.destroy({
		where: {
			id,
		},
	})
	if (result) {
		sendResult.success(res)
	} else {
		sendResult.categoryNotExist(res)
	}
}
