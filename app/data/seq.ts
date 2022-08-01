import { Sequelize } from 'sequelize'
import 'dotenv/config'

const host = process.env.MYSQL_HOST || '127.0.0.1'
const database = process.env.MYSQL_DB || 'db'
const user = process.env.MYSQL_USER || 'root'
const passwd = process.env.MYSQL_PASSWD || '123456'
const port = +(process.env.MYSQL_PORT || '3306')

const seq = new Sequelize(database, user, passwd, {
    host,
    port,
    dialect: 'mysql'
})

seq.sync()

//测试连接
// seq.authenticate().then(() => {
//     console.log('数据库连接成功')
//     seq.close().then(() => {
//         console.log('数据库连接已关闭')
//     })
// }).catch((error) => {
//     console.log('数据库连接失败', JSON.stringify(error))
// })

export default seq