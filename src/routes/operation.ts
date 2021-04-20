import express, { Request, Response } from 'express'
import Station from '../models/station.model'
import Operation from '../models/operation.model'
import Vehicle from "../models/vehicle.model";
import { ioServer } from '../index'
import axios from 'axios'
import vehicleHandler from '../handlers/VehicleHandler';
import { transform, isEqual, isObject } from 'lodash';


const router = express.Router()

// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {


        let searchString = "";

        for (const [key, value] of Object.entries(req.body.address)) {
            searchString += value + "+"
        }

        let coordinates = await axios.get("https://nominatim.openstreetmap.org/search?q=" + encodeURI(searchString) + "&format=json&polygon=1&addressdetails=1"
        )

        req.body.address.postcode = coordinates.data[0].address.postcode
        req.body.address.street = coordinates.data[0].address.road
        req.body.address.number = coordinates.data[0].address.house_number





        req.body.editor = req.headers.user
        req.body.mission = "602ac22c8bb6c947a06a4106"
        req.body.timestamp = Date.now()

        const operation = new Operation(req.body)
        await operation.save()
        req.body?.vehicles?.forEach(async (vehicle: any) => {
            vehicleHandler.updateVehicle(vehicle, { "lat": coordinates.data[0].lat, "lng": coordinates.data[0].lon }, true)
            
            console.log(await vehicleHandler.setOperation(vehicle, operation._id));

        });

        ioServer.io.emit("pull-operation")
        res.status(200).send(operation)
    } catch (e) {
        console.log(e);

        res.status(500).send(e.message)
    }
})


// READ
router.get('/', async (req: Request, res: Response) => {
    try {
        const operations = await Operation.find().populate('editor', 'name').sort({ 'timestamp': -1 })
        return res.status(200).send(operations)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// READ ONE
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const operation = await Operation.findOne({ _id: id }).populate('editor', 'name')
        return res.status(200).send(operation)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// UPDATE
router.post('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const operation = await Operation.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).send(operation)
    } catch (e) {
        console.log(e);

        res.status(500).send(e.message)
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const operation = await Operation.findById(id)
        await operation.delete()
        res.status(200).send(operation)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

function difference(object: any, base: any) {
    return transform(object, (result: any, value: any, key: any) => {
        if (!isEqual(value, base[key])) {
            result[key] = isObject(value) && isObject(base[key]) ? difference(value, base[key]) : value;
        }
    });
}





export { router as operationRouter }