import express, { Request, Response } from 'express'
import vehicleHandler from '../handlers/VehicleHandler'

const router = express.Router()

// READ
router.get('/', async (req: Request, res: Response) => {
    const vehicles = await vehicleHandler.getVehicles()
    return res.status(200).send(vehicles)
})

// READ ONE
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const vehicle = await vehicleHandler.getById(id)
    return res.status(200).send(vehicle)
})


// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {
        const vehicle = await vehicleHandler.createVehicle(req.body)
        return res.status(200).json(vehicle)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

// UPDATE
router.post('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const vehicle = await vehicleHandler.updateVehicle(id, req.body, true)
        return res.status(200).json(vehicle)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const vehicle = await vehicleHandler.deleteVehicle(id)
        res.status(200).send(vehicle)
    } catch (e) {
        res.status(500).send(e.message)
    }
})



export { router as vehicleRouter }
