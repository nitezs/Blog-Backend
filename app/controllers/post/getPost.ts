import { Request, Response } from 'express'
import sendResult from '../../constant/sendRes'
import Post from '../../models/post.m'

export const getPost = async (req: Request, res: Response) => {
	let { id } = req.query
	let result = await Post.findOne({
		where: {
			id,
		},
	})

	if (!result) {
		sendResult.postNotExist(res, { id })
	} else {
		sendResult.success(res, { post: result.get() })
	}
}
