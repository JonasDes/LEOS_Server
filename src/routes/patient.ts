import express, { Request, Response } from 'express'
import { Patient } from '../application/controller/'
const router = express.Router()


// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        const patient = new Patient(req.body)
        await patient.save()
        res.status(200).send(patient)

    } catch (e) {
        res.status(500).send(e.message)
    }
})

// CREATE from efÜ
router.post('/efue', async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const patient = new Patient({
            name: req.body.Name,
            surname: req.body.Vorname,
            origin: req.body.Fundort,
            sex: req.body.Geschlecht,
            msg: req.body.Diagnose,
            birthdate: req.body.Geburtstag,
            triage: req.body.SK
        })
        await patient.save()
        res.status(200).send(patient) // ioServer.io.emit('new-patient', patient)
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
        const stations = await Patient.findOne({ _id: id })
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
