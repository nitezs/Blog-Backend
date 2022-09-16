import { Request, Response } from 'express'
import { Op } from 'sequelize'
import sendResult from '../constant/sendRes'
import { Category, categoryModel } from '../models/category.m'

export const createCategory = async (req: Request, res: Response) => {
	let { name, urlname, description, parentId } = req.body
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
				return sendResult.parentCategoryExist(res, {
					name,
					urlname,
					description,
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
					description,
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
					description,
				},
			})
		}
		if (!newCreate) {
			sendResult.nameOrEmailExist(res, {
				name,
				urlname,
				description,
			})
		} else {
			sendResult.success(res, {
				name,
				urlname,
				description,
			})
		}
	} catch (err) {
		sendResult.unknowFailed(res, err)
	}
}

export const deleteCategory = async (req: Request, res: Response) => {
	let { id } = req.body
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

export const getAllCategories = async (req: Request, res: Response) => {
	let result = await Category.findAll()
	let data: categoryModel[] = []
	result.map((category) => {
		data.push(category.get())
	})
	sendResult.success(res, data)
}
