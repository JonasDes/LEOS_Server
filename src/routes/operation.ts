import express, { Request, Response } from 'express'
import Station from '../models/station.model'
import Operation from '../models/operation.model'
import Vehicle from "../models/vehicle.model";
import { ioServer } from '../index'
import axios from 'axios'
import vehicleHandler from '../handlers/VehicleHandler';
import { transform, isEqual, isObject } from 'lodash';
import diff from 'recursive-diff'


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

        let oldOP = {
            keyword: "",
            vehicles: "",
            message: "",
            address: {
                street: "",
                number: "",
                object: "",
                postcode: "",
                city: "",
            },
            addressDestination: {
                street: "",
                number: "",
                object: "",
                postcode: "",
                city: "",
            },
            priority: ""
        }
        let newOP = {
            keyword: req.body.keyword,
            address: req.body.address,
            vehicles: req.body.vehicles,
            message: req.body.message,
            addressDestination: req.body.addressDestination,
            priority: req.body.priority
        }
        const delta = diff.getDiff(oldOP, newOP);
        let changes: any = []
        delta.forEach(element => {
            console.log(element.path[0]);

            if (!(element.path[0] == 'vehicles' && element.op == 'update')) changes.push(element)

        });

        req.body.edit = []
        if (changes.length !== 0) {
            req.body.edit.push({ timestamp: Date.now(), changes })
        }

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
        let oldOperation = await Operation.findOne({ _id: id })

        let oldOP = {
            keyword: oldOperation.keyword,
            address: oldOperation.address,
            vehicles: oldOperation.vehicles,
            message: oldOperation.message,
            addressDestination: oldOperation.addressDestination,
            priority: oldOperation.priority
        }
        let newOP = {
            keyword: req.body.keyword,
            address: req.body.address,
            vehicles: req.body.vehicles,
            message: req.body.message,
            addressDestination: req.body.addressDestination,
            priority: req.body.priority
        }
        const delta = diff.getDiff(oldOP, newOP);
        let changes: any = []
        delta.forEach(element => {


            if (!(element.path[0] == 'vehicles' && element.op == 'update')) changes.push(element)

        });


        if (changes.length !== 0) {
            oldOperation.edit.push({ timestamp: Date.now(), changes })
            Object.assign(req.body.edit, oldOperation.edit)
        }
        const operation = await Operation.findOneAndUpdate({ _id: id }, req.body, { new: true })
        ioServer.io.emit("pull-operation")
        res.status(200).send(operation)
    } catch (e) {



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



export { router as operationRouter }