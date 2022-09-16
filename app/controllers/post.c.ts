import { Request, Response } from 'express'
import { Category } from '../models/category.m'
import sendResult from '../constant/sendRes'
import Post from '../models/post.m'
import { marked } from 'marked'
import postCate from '../models/psotCate.m'
import { PostalCodeLocale } from 'express-validator/src/options'
import sequelize from 'sequelize'

// 添加文章
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

		return sendResult.success(res, {
			postId,
			title,
			urlname,
		})
	}
}

//删除文章
export const deletePost = async (req: Request, res: Response) => {
	let { id, urlname } = req.body

	let result = await Post.destroy({
		where: {
			id,
		},
	})

	if (result == 0) {
		return sendResult.postNotExist(res, { id })
	} else {
		await postCate.destroy({
			where: {
				postId: id,
			},
		})
		sendResult.success(res)
	}
}

//更新文章
export const updatePost = async (req: Request, res: Response) => {
	let {
		id,
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

	let result = await Post.update(
		{
			title,
			urlname,
			description,
			content,
			categoryId,
			image,
			top,
			password,
			hide,
		},
		{
			where: {
				id,
			},
		}
	)

	if (result[0] == 0) {
		return sendResult.postNotExist(res, { id })
	} else {
		sendResult.success(res)
	}
}

//获取文章
export const getPosts = async (req: Request, res: Response) => {
	let { offset, limit } = req.query
	offset = offset == undefined ? '0' : offset
	limit = limit == undefined ? '20' : limit

	let result = await Post.findAll({
		offset: Number.parseInt(offset as string),
		limit: Number.parseInt(limit as string),
	})
	if (!result) {
		sendResult.postNotExist(res)
	} else {
		let r: any = []
		result.map((post) => {
			r.push(post.get())
		})
		sendResult.success(res, { posts: r })
	}
}

//获取文章
export const getPost = async (req: Request, res: Response) => {
	let { urlname } = req.query
	let result = await Post.findOne({
		where: {
			urlname,
		},
	})

	if (!result) {
		sendResult.postNotExist(res, { urlname })
	} else {
		sendResult.success(res, { post: result.get() })
	}
}
