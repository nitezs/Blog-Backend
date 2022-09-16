import { Request, Response } from 'express'
import { Category } from '../models/category.m'
import sendResult from '../constant/sendRes'
import Post from '../models/post.m'
import { marked } from 'marked'
import postCate from '../models/psotCate.m'

export const createPost = async (req: Request, res: Response) => {
	let {
		title,
		urlname,
		description,
		content,
		categoryId,
		image,
		top,
		password,
		hide,
	} = req.body

	//验证分类ID是否存在
	let result = await Category.findOne({
		attributes: ['id'],
		where: {
			id: categoryId,
		},
	})
	if (!result) {
		return sendResult.categoryNotExist(res, {
			title,
			urlname,
			description,
			content,
			categoryId,
		})
	}
	//将markdown转换为html
	let html = marked.parse(content)
	//插入数据库
	let newCreate
	;[result, newCreate] = await Post.findOrCreate({
		where: {
			urlname,
		},
		defaults: {
			title,
			urlname,
			description,
			content: html,
			image,
			top,
			password,
			hide,
		},
	})

	//返回信息
	if (!newCreate) {
		return sendResult.urlnameExist(res, {
			title,
			urlname,
			description,
			content,
			categoryId,
		})
	} else {
		let postId = result.getDataValue('id')
		result = await postCate.create({
			categoryId,
			postId,
		})

		return sendResult.success(res)
	}
}
