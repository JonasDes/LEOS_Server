import express, { Request, Response } from 'express'
import { Station, UserRole, User } from '../application/controller/'


const router = express.Router()

// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {
        const userrole = new UserRole(req.body)
        await userrole.save()
        res.status(200).send(userrole)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// READ
router.get('/', async (req: Request, res: Response) => {
    try {
        const userrole = await UserRole.find({ name: { $ne: 'SYSTEM' } })
        return res.status(200).send(userrole)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// UPDATE
router.post('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const userrole = await UserRole.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).send(userrole)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userrole = await User.findById(id)
        const user = await User.find({ role: id })
        if (user.length > 0) {
            if (!req.query.forced) {
                res.status(400).send({ message: "Es sind noch Nutzer verknüpft", user })
                return
            } else {
                await userrole.delete()
                res.status(200).send(userrole)
                return
            }
        }
        await userrole.delete()
        res.status(200).send(userrole)
    } catch (e) {
        res.status(500).send(e.message)
    }

})

export { router as userRoleRouter }