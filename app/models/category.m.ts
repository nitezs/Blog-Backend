import { DataTypes } from 'sequelize'
import seq from '../data/seq'

type categoryModel = {
	id: number
	name: string
	urlname: string
	description: string
	parentId: number
	createdAt: Date
	updatedAt: Date
}

const Category = seq.define('Category', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	urlname: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	parentId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Categories',
			key: 'id',
		},
	},
})

Category.sync()

export { Category, categoryModel }
