import { Sequelize } from 'sequelize'
import 'dotenv/config'
import {
	mysqlDB,
	mysqlHost,
	mysqlPASSWD,
	mysqlPort,
	mysqlUser,
} from '../constant/config'

const seq = new Sequelize(mysqlDB, mysqlUser, mysqlPASSWD, {
	host: mysqlHost,
	port: +mysqlPort,
	dialect: 'mysql',
})

seq.sync()

export default seq
