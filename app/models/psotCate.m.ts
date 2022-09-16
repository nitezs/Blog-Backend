import { DataTypes } from 'sequelize'
import seq from '../data/seq'
import { Category } from './category.m'
import Post from './post.m'

type postcateModel = {
	postId: number
	categoryId: number
}

const postCate = seq.define('postCate', {
	postId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Post,
			key: 'id',
		},
	},
	categoryId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Category,
			key: 'id',
		},
	},
})

postCate.sync()

export default postCate
