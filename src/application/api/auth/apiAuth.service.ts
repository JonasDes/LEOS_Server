import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserRoleSchema, UserSchema, User } from '../../controller/'


export async function checkAuth(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1]

        try {
            const jwtoken = await jwt.verify(token.toString(), process.env.JWT_SECRET)
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

export const checkRole = {

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