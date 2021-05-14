import express, { Request, Response } from 'express'
import MissionDiary, { MissionDiarySchema } from '../models/missiondiary.model'
import MissionDiaryHandler from '../handlers/MissionDiaryHandler';


const router = express.Router()

// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {
        const entry: MissionDiarySchema = req.body
        entry.editor = req.body.editor as string
        const missionDiary = await MissionDiaryHandler.addEntry(req.body)
        res.status(200).send(missionDiary)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// READ
router.get('/', async (req: Request, res: Response) => {
    try {

        if (!req.query.mission) {
            const missionDiary = await MissionDiary.find().populate('mission').populate('edit.data.editor', `name`).populate('editor', `name`).sort({ 'entryId': -1 })
            return res.status(200).send(missionDiary)
        } else {
            const missionDiary = await MissionDiary.find({ mission: req.query.mission }).populate('mission').populate('editor', `name`)
            return res.status(200).send(missionDiary)
        }

    } catch (e) {
        res.status(500).send(e.message)
    }
})

// READ ONE
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const missionDiary = await MissionDiary.findOne({ _id: id }).populate('mission').populate('editor', `name`)
        return res.status(200).send(missionDiary)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// UPDATE
router.post('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const entry: MissionDiarySchema = req.body
        entry.editor = req.body.editor as string
        const missionDiary = await MissionDiaryHandler.editEntry(id, entry)
        res.status(200).send(missionDiary)
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message)
    }
})


// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const missionDiaryEntry = await MissionDiary.findById(id)
        await missionDiaryEntry.delete()
        return res.status(200).send(missionDiaryEntry)

    } catch (e) {
        res.status(500).send(e.message)
    }

})

export { router as missionDiaryRouter }