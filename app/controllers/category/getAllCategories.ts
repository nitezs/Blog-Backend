import { Request, Response } from 'express'
import sendResult from '../../constant/sendRes'
import { Category, categoryModel } from '../../models/category.m'

export const getAllCategories = async (req: Request, res: Response) => {
	let result = await Category.findAll()
	let data: categoryModel[] = []
	result.map((category) => {
		data.push(category.get())
	})
	sendResult.success(res, data)
}
