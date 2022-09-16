import express from 'express'
import { validator, titleValidator, urlnameValidator, descriptionValidator, contentValidator, categoryIdValidator } from '../middlewares/validator'
import { createPost } from '../controllers/post.c'
const router = express.Router()

// 创建文章
router.post('/',
    titleValidator,
    urlnameValidator,
    descriptionValidator,
    contentValidator,
    categoryIdValidator,
    validator,
    createPost
)