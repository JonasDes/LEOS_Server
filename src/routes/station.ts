import express, { Request, Response } from 'express'
import Station from '../models/station.model'
import Vehicle from '../models/vehicle.model'


const router = express.Router()

// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        
        const station = new Station(req.body)
        await station.save()
        res.status(200).send(station)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// READ
router.get('/', async (req: Request, res: Response) => {
    try {
        const stations = await Station.find()
        return res.status(200).send(stations)
    } catch (e) {
        res.status(500).send(e.message)
    }
})



// READ ONE
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const stations = await Station.findOne({_id:id})
        return res.status(200).send(stations)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// UPDATE
router.post('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const station = await Station.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).send(station)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const station = await Station.findById(id)
        const vehicles = await Vehicle.find({ station: id })
        if (vehicles.length > 0) {
            if (!req.query.forced) {
                res.status(400).send({ message: "Es sind noch Fahrzeuge verknüpft", vehicles })
                return
            } else {
                await station.delete()
                res.status(200).send(station)
                return
            }
        }
        await station.delete()
        res.status(200).send(station)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

export { router as stationRouter }
