import { Request, Response } from 'express'
import sendResult from '../../constant/sendRes'
import Post from '../../models/post.m'

export const updatePost = async (req: Request, res: Response) => {
	let { id } = req.params
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
	console.log(req.body)
	//判断文章是否存在
	let result: any = await Post.findOne({ attributes: ['id'], where: { id } })
	if (!result) {
		return sendResult.postNotExist(res, { id })
	}

	//更新内容
	result = await Post.update(
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
	sendResult.success(res)
}
