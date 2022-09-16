import { Request, Response } from 'express'
import sendResult from '../../constant/sendRes'
import { Category, categoryModel } from '../../models/category.m'

export const updateCategory = async (req: Request, res: Response) => {
	let { id, name, urlname, description, parentId } = req.body
	Category.update(
		{ name, urlname, description, parentId },
		{
			where: {
				id,
			},
		}
	)
}
