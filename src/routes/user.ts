import express, { Request, Response } from 'express'
import userHandler from '../handlers/UserHandler'
import { checkRole } from './auth'

const router = express.Router()

// READ ALL
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userHandler.getUsers()
        return res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e.message)
    }

})

// CURRENT USER
router.get('/me', async (req: Request, res: Response) => {
    try {
        return res.status(200).send({ user: req.headers.user })
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// READ ONE
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await userHandler.getById(id)
        return res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// CREATE
router.post('/', checkRole.isAdmin, async (req: Request, res: Response) => {
    try {
        const user = await userHandler.createUser(req.body)
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// UPDATE
router.post('/:id', checkRole.isAdmin, async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await userHandler.updateUser(id, req.body)
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// DELETE
router.delete('/:id', checkRole.isAdmin, async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await userHandler.deleteUser(id)
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


export { router as userRouter }