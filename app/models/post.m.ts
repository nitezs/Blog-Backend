import { DataTypes } from 'sequelize'
import seq from '../data/seq'

type postModel = {
	title: string
	description: string
	content: string
	urlname: string
	image: string
	top: number
	password: string
	hide: boolean
}

const Post = seq.define('Post', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	urlname: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	top: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	hide: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
})

Post.sync()

export default Post
