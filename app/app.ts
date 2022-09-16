import express, { Request, Response, NextFunction } from 'express'
import { port } from './constant/config'
import userRotuer from './routes/user.r'
import postRotuer from './routes/post.r'
import categoryRouter from './routes/category.r'
import sendResult from './constant/sendRes'

const app = express()

app.use(express.urlencoded({ extended: false }))

//路由
app.use('/users', userRotuer)
app.use('/categories', categoryRouter)
app.use('/posts', postRotuer)

//捕获未知路由
app.use((req, res) => {
	sendResult.apiNotFound(res)
})
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	if (err.name === 'UnauthorizedError') {
		sendResult.authFailed(res)
	}
})
app.listen(port, () => {
	console.log(`Server is running on http://127.0.0.1:${port}`)
})
