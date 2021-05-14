import express, { Request, Response } from 'express'
import sprechWHandler from '../handlers/SprechWHandler'


const router = express.Router()


// READ
router.get('/', async (req: Request, res: Response) => {
    try {
        const sprechw = await sprechWHandler.getSprechWs()
        res.status(200).send(sprechw)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// RESOLVE
router.post('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const sprechw = await sprechWHandler.resolveSprechW(req.body)
        res.status(200).send(sprechw)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


export { router as sprechWRouter }