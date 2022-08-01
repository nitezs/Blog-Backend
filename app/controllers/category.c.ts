import { Request, Response } from 'express'
import { Op } from 'sequelize'
import sendResult from '../constant/sendRes'
import { Category } from '../models/category.m'
import data from '../data/data'

export const createCategory = async (req: Request, res: Response) => {
    let { name, urlname, description, parentId } = req.body
    try {
        //判断urlname是否存在
        let result = await Category.findOne({
            attributes: ['id', 'name', 'urlname', 'parentId'],
            where: {
                urlname
            }
        })
        if (result) {
            return sendResult.urlnameExist(res, result)
        }
        //判断父分类是否存在
        if (parentId) {
            result = await Category.findOne({
                attributes: ['id', 'name', 'urlname', 'parentId'],
                where: {
                    id: parentId
                }
            })
            if (!result) {
                return sendResult.parentCategoryExist(res, {
                    name,
                    urlname,
                    description,
                    parentId
                })
            }
        }
        let created
        //添加分类
        if (parentId) {
            [result, created] = await Category.findOrCreate({
                where: {
                    name,
                    parentId
                },
                defaults: {
                    name,
                    urlname,
                    description,
                    parentId
                }
            })
        } else {
            [result, created] = await Category.findOrCreate({
                where: {
                    name
                },
                defaults: {
                    name,
                    urlname,
                    description
                }
            })
        }
        if (!created) {
            sendResult.nameOrEmailExist(res, {
                name,
                urlname,
                description
            })
        } else {
            sendResult.success(res, {
                name,
                urlname,
                description
            })
            data.categorys.push(result.get())
        }
    } catch (err) {
        sendResult.unknowFailed(res, err)
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    let { id } = req.body
    await Category.update({
        parentId: null
    }, {
        where: {
            parentId: id
        }
    })
    let result = await Category.destroy({
        where: {
            id
        }
    })
    if (result) {
        sendResult.success(res)
        data.categorys = data.categorys.filter(category => category.id !== +id)
    } else {
        sendResult.categoryNotExist(res)
    }
}