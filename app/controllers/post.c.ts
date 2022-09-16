import { Request, Response } from 'express'

export const createPost = (req: Request, res: Response) => {
    let { title, urlname, description, content, categoryId } = req.body
    //验证分类ID是否存在
    //验证urlname是否存在
    //插入数据库
    //返回信息
}
