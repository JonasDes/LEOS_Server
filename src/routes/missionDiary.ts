import express, { Request, Response } from 'express'
import VehicleType from '../models/vehicletype.model'
import Vehicle from '../models/vehicletype.model'
import MissionDiary from '../models/missiondiary.model'
import Keyword from "../models/keyword.model";


const router = express.Router()

// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {
        req.body.entryId = await MissionDiary.countDocuments({ mission: req.body.mission }) + 1
        req.body.editor = req.headers.user
        req.body.timestamp = Date.now()
        const missionDiary = new MissionDiary(req.body)
        await missionDiary.save()
        res.status(200).send(missionDiary)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// READ
router.get('/', async (req: Request, res: Response) => {
    try {

        if (!req.query.mission) {
            const missionDiary = await MissionDiary.find().populate('mission').populate('editor', `name`).sort({'timestamp': -1})
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
        const missionDiary = await MissionDiary.findOne({ _id: id })

        missionDiary.edit.push({ timestamp: missionDiary?.timestamp, data: { content: missionDiary?.content, comment: missionDiary?.comment } })
        missionDiary.timestamp = Date.now()
        missionDiary.content = req.body.content || missionDiary.content
        missionDiary.comment = req.body.comment || missionDiary.comment


        const missionDiaryNew = await MissionDiary.findOneAndUpdate({ _id: id }, missionDiary, { new: true })
        res.status(200).send(missionDiaryNew)
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