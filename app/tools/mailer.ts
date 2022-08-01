import nodemailer from 'nodemailer'
import { smtpService, smtpHost, smtpPort, smtpUser, smtpPassword, smtpSender } from '../constant/config'
import ejs from 'ejs'
import fs from 'fs'

let transport: nodemailer.Transporter | null = null

if (smtpUser && smtpPassword) {
    if (smtpService) {
        transport = nodemailer.createTransport({
            service: smtpService,
            secure: true,
            auth: {
                user: smtpUser,
                pass: smtpPassword
            }
        })
    }
    else if (smtpHost && smtpPort) {
        transport = nodemailer.createTransport({
            host: smtpHost,
            port: +smtpPort,
            auth: {
                user: smtpUser,
                pass: smtpPassword
            }
        })
    }
} else {
    console.error('缺少发信邮箱设置')
}

export const sendMail = async (to: string, subject: string, htmlPath: string, params: object) => {
    const template = ejs.compile(await fs.readFileSync(htmlPath, 'utf-8'))
    transport?.sendMail({
        from: `"${smtpSender}" <${smtpUser}>`, // sender address
        to,
        subject,
        html: template(params)
    }, (error, info) => {
        if (error) {
            console.error(`邮件发送失败 ${error}`)
        } else {
            //console.log(`邮件发送成功 ${info}`)
        }
    })
}