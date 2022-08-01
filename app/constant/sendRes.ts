import { Response } from 'express'
class sendResult {
    static success(res: Response, data?: any): void {
        res.status(200).send({
            code: 1000,
            message: '成功',
            data
        })
    }

    static unknowFailed(res: Response, data?: any): void {
        res.status(500).send({
            code: 1001,
            message: '未知错误',
            data
        })
    }

    static validationFailed(res: Response, data?: any): void {
        res.status(412).send({
            code: 1002,
            message: '参数错误',
            data
        })
    }

    static apiNotFound(res: Response, data?: any): void {
        res.status(404).send({
            code: 1003,
            message: '接口不存在',
            data
        })
    }

    static nameOrEmailExist(res: Response, data?: any): void {
        res.status(409).send({
            code: 1004,
            message: '用户名或邮箱已存在',
            data
        })
    }

    static userNotExist(res: Response, data?: any): void {
        res.status(200).send({
            code: 1005,
            message: '用户不存在',
            data
        })
    }

    static passwrodError(res: Response, data?: any): void {
        res.status(200).send({
            code: 1006,
            message: '密码错误',
            data
        })
    }

    static authFailed(res: Response, data?: any): void {
        res.status(401).send({
            code: 1007,
            message: '身份认证失败',
            data
        })
    }

    static notAdmin(res: Response, data?: any): void {
        res.status(403).send({
            code: 1008,
            message: '权限不足',
            data
        })
    }

    static urlnameExist(res: Response, data?: any): void {
        res.status(412).send({
            code: 1009,
            message: 'urlname已存在',
            data
        })
    }

    static categoryExist(res: Response, data?: any): void {
        res.status(200).send({
            code: 1010,
            message: 'category已存在',
            data
        })
    }

    static parentCategoryExist(res: Response, data?: any): void {
        res.status(200).send({
            code: 1011,
            message: '父分类不存在',
            data
        })
    }

    static categoryNotExist(res: Response, data?: any): void {
        res.status(200).send({
            code: 1012,
            message: '分类不存在',
            data
        })
    }

    static wrongPin(res: Response, data?: any): void {
        res.status(200).send({
            code: 1013,
            message: '验证码错误',
            data
        })
    }

    static timespanNotEnough(res: Response, data?: any): void {
        res.status(200).send({
            code: 1014,
            message: '60秒内只能获取一次验证码',
            data
        })
    }

    static pinTimeLimit(res: Response, data?: any): void {
        res.status(200).send({
            code: 1015,
            message: '验证码已失效',
            data
        })
    }

    static pinNotExist(res: Response, data?: any): void {
        res.status(200).send({
            code: 1016,
            message: '验证码不存在',
            data
        })
    }

    static notEnablePin(res: Response, data?: any): void {
        res.status(200).send({
            code: 1017,
            message: '未开启验证码功能',
            data
        })
    }

    static notCertified(res: Response, data?: any): void {
        res.status(200).send({
            code: 1018,
            message: '邮箱未验证',
            data
        })
    }
}

export default sendResult