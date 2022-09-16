import { Request, Response } from 'express'
import sendResult from '../../constant/sendRes'
import Post from '../../models/post.m'
import postCate from '../../models/psotCate.m'
import { Op } from 'sequelize'

export const deletePost = async (req: Request, res: Response) => {
	let { id } = req.body

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
