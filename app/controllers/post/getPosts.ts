import { Request, Response } from 'express'
import sendResult from '../../constant/sendRes'
import Post from '../../models/post.m'

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
