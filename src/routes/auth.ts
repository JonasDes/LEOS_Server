import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserRoleSchema } from '../models/userrole.model'

import User, { UserSchema } from '../models/user.model'

const router = express.Router()

// LOGIN
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        if (username && password) {
            const user = await User.findOne({ name: username })
            if (user?.password === password) {
                const token = jwt.sign({ accesskey: user.accesskey }, "123456", { expiresIn: '1d' })
                res.status(200).send({ "token": token })
            } else {
                res.status(401).send({ "success": false, "error": "Unauthorized" })
            }
        } else res.status(401).send({ "success": false, "error": "No Data provided" })
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message)
    }
})

// LOGOUT
router.post('/logout', async (req: Request, res: Response) => {
    res.status(200).send({ "success": true })
})


async function checkAuth(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1]
        try {
            const jwtoken = await jwt.verify(token.toString(), "123456")
            const user = await User.findOne({ accesskey: (jwtoken as any).accesskey }).select('name').populate('role')
            if (jwtoken && user) {
                req.body.editor = user
                next()
            } else res.status(403).send({ "success": false, "error": "Forbidden" })

        } catch (e) {
            res.status(500).send(e.message)
        }
    } else return res.status(401).send({ "success": false, "error": "Unauthorized" })
}

const checkRole = {

    async isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body.editor as unknown as UserSchema
            const role = user.role as UserRoleSchema

            if (role.name === 'ADMIN') {
                next()
            } else {
                res.status(403).send({ "success": false, "error": "Forbidden" })
            }
        } catch (error) {
            console.log(error);

        }
    }


}




export { router as authRouter }
export { checkAuth as checkAuth }
export { checkRole as checkRole }

