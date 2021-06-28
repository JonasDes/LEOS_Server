import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../../../controller'

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

export { router as authRoute }