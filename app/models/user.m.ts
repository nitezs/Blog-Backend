import { DataTypes } from 'sequelize'
import seq from '../data/seq'

type userModel = {
	name: string
	email: string
	password: string
	isAdmin: boolean
}

const User = seq.define('User', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
})

User.sync()

export default User
