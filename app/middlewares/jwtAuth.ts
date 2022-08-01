import { expressjwt } from 'express-jwt'
import { jwtSecretKey } from '../constant/config'
import { Request, Response, NextFunction } from 'express'

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
    const func = expressjwt({ secret: jwtSecretKey, algorithms: ['HS256'] })
    func(req, res, next)
}

export default jwtAuth