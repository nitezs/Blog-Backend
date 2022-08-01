import 'dotenv/config'
import path from 'path'

export const port = process.env.APP_PORT || 3000
export const mysqlHost = process.env.MYSQL_HOST || '127.0.0.1'
export const mysqlPort = process.env.MYSQL_PORT || '3306'
export const mysqlUser = process.env.MYSQL_USER || 'root'
export const mysqlPASSWD = process.env.MYSQL_PASSWD || '123456'
export const jwtSecretKey = process.env.JWT_KEY || '3Hjd%YNRr^*5tc'
export const smtpService = process.env.SMTP_SERVICE
export const smtpHost = process.env.SMTP_HOST
export const smtpPort = process.env.SMTP_PORT
export const smtpUser = process.env.SMTP_USER
export const smtpPassword = process.env.SMTP_PASSWD
export const smtpSender = process.env.SMTP_SENDER
export const pinEmailPath = path.join(__dirname, '..', '..', 'pin.ejs')
export const enableSmtp = process.env.SMTP || false