import express, { Request, Response } from 'express'
import Patient from '../models/patient.model'
const router = express.Router()

// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        const station = new Patient(req.body)
        await station.save()
        res.status(200).send(station)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// READ
router.get('/', async (req: Request, res: Response) => {
    try {
        const stations = await Patient.find()
        return res.status(200).send(stations)
    } catch (e) {
        res.status(500).send(e.message)
    }
})



// READ ONE
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const stations = await Patient.findOne({_id:id})
        return res.status(200).send(stations)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// UPDATE
router.post('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const station = await Patient.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).send(station)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const station = await Patient.findById(id)
        await station.delete()
        res.status(200).send(station)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

export { router as patientRouter }
