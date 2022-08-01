import { Category, categoryModel } from "../models/category.m"

class Data {
    categorys: categoryModel[] = []
    async init() {
        //缓存分类表
        const result = await Category.findAll()
        if (!result) {
            console.error('分类数据表读取失败')
        } else {
            result.map(category => {
                this.categorys.push(category.get())
            })
        }
    }
}
const data = new Data()
data.init()
export default data