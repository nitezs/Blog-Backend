import { Request, Response } from 'express'
import sendResult from '../../constant/sendRes'
import Post from '../../models/post.m'

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
	console.log({
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
	})
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
