import express, {Request, Response} from 'express'
import VehicleType from '../models/vehicletype.model'
import Vehicle from '../models/vehicletype.model'


const router = express.Router()

// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {
        const vehicleType = new VehicleType(req.body)
        await vehicleType.save()
        res.status(200).send(vehicleType)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// READ
router.get('/', async (req: Request, res: Response) => {
    try {
        const vehicleType = await VehicleType.find()
        return res.status(200).send(vehicleType)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// UPDATE
router.post('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const vehicleType = await VehicleType.findOneAndUpdate({_id:id}, req.body, {new:true})
        res.status(200).send(vehicleType)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const vehicleType = await VehicleType.findById(id)
        const vehicles = await Vehicle.find({station: id})
        if (vehicles.length > 0) {
            if (!req.query.forced) {
                res.status(400).send({message: "Es sind noch Fahrzeuge verknüpft", vehicles})
                return
            } else {
                await vehicleType.delete()
                res.status(200).send(vehicleType)
                return
            }
        }
        await vehicleType.delete()
        res.status(200).send(vehicleType)
    } catch (e) {
        res.status(500).send(e.message)
    }

})

export {router as vehicleTypeRouter}