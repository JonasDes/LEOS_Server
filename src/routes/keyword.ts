import express, { Request, Response } from 'express'
import { Keyword } from '../application/controller'


const router = express.Router()

// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {
        const keyword = new Keyword(req.body)
        await keyword.save()
        res.status(200).send(keyword)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// READ
router.get('/', async (req: Request, res: Response) => {
    try {
        const keyword = await Keyword.find().populate('vehicles')
        return res.status(200).send(keyword)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// READ ONE
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const keyword = await Keyword.findOne({ _id: id }).populate('vehicles', 'name')
        return res.status(200).send(keyword)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// UPDATE
router.post('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const keyword = await Keyword.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).send(keyword)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const keyword = await Keyword.findById(id)
        await keyword.delete()
        res.status(200).send(keyword)
    } catch (e) {
        res.status(500).send(e.message)
    }

})

export { router as keywordRouter }