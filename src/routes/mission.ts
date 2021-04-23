import express, {Request, Response} from 'express'
import Mission from '../models/mission.model'
import Keyword from "../models/keyword.model";


const router = express.Router()

// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {
        const mission = new Mission(req.body)
        await mission.save()
        res.status(200).send(mission)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// READ
router.get('/', async (req: Request, res: Response) => {
    try {
        const missions = await Mission.find()
        return res.status(200).send(missions)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// READ ONE
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const mission = await Mission.findOne({_id:id})
        return res.status(200).send(mission)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// UPDATE
router.post('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const mission = await Mission.findOneAndUpdate({_id:id}, req.body, {new:true})
        res.status(200).send(mission)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const mission = await Mission.findById(id)
        await mission.delete()
        res.status(200).send(mission)
    } catch (e) {
        res.status(500).send(e.message)
    }

})

export {router as missionRouter}