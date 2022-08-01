import { DataTypes } from "sequelize"
import seq from '../data/seq'

const User = seq.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    pin: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    certified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    pinDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

User.sync()

export default User