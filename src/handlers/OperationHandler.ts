import Operation, { OperationSchema } from '../models/operation.model'
import { diveraHandler, ioServer, missionDiaryHandler } from '../index'
import diff from 'recursive-diff'
import axios from 'axios'
import vehicleHandler from './VehicleHandler'


const operationHandler = {

    getOperations: async () => {
        return Operation.find().populate('editor', 'name').sort({ 'timestamp': -1 })
    },

    getOperation: async (id: string) => {
        return Operation.findOne({ _id: id }).populate('editor', 'name')
    },

    deleteOperation: async (id: string) => {
        const operation = await Operation.findById(id)
        return operation.delete()
    },

    newOperation: async (newData: OperationSchema) => {

        let searchStringAddress = "";
        for (const [key, value] of Object.entries(newData?.address)) {
            searchStringAddress += value + "+"
        }
        let searchStringAddressDestination = "";
        for (const [key, value] of Object.entries(newData?.addressDestination)) {
            searchStringAddressDestination += value + "+"
        }
        const addressCoordinates = await axios.get("https://nominatim.openstreetmap.org/search?q=" + encodeURI(searchStringAddress) + "&format=json&polygon=1&addressdetails=1")
        const addressDestinationCoordinates = await axios.get("https://nominatim.openstreetmap.org/search?q=" + encodeURI(searchStringAddressDestination) + "&format=json&polygon=1&addressdetails=1")
        newData.address.postcode = addressCoordinates.data[0]?.address.postcode
        newData.address.street = addressCoordinates.data[0]?.address.road
        newData.address.number = addressCoordinates.data[0]?.address.house_number
        newData.addressDestination.postcode = addressDestinationCoordinates.data[0]?.address.postcode
        newData.addressDestination.street = addressDestinationCoordinates.data[0]?.address.road
        newData.addressDestination.number = addressDestinationCoordinates.data[0]?.address.house_number
        newData.mission = "602ac22c8bb6c947a06a4106" as any
        newData.timestamp = Date.now()
        newData.entryId = await Operation.countDocuments({ mission: newData.mission }) + 1

        const oldOP = {
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
        const newOP = {
            keyword: newData?.keyword,
            address: newData?.address,
            vehicles: newData?.vehicles,
            message: newData?.message,
            addressDestination: newData?.addressDestination,
            priority: newData.priority
        }
        const delta = diff.getDiff(oldOP, newOP);
        const changes: any = []
        delta.forEach(element => {
            console.log(element);

            if (!(element.path[0] === 'vehicles' && element.op === 'update')) changes.push(element)
        });

        newData.edit = []
        if (changes.length !== 0) {
            newData.edit.push({ timestamp: Date.now(), changes })
        }

        const operation = new Operation(newData)

        newData?.vehicles?.forEach(async (vehicle: any) => {
            vehicleHandler.updateVehicle(vehicle, { "lat": addressCoordinates.data[0].lat, "lng": addressCoordinates.data[0].lon }, true)
            await vehicleHandler.setOperation(vehicle, operation._id)

        });
        ioServer.sendPullOperation()
        return operation.save()
    },


    updateOperation: async (id: string, newData: OperationSchema) => {
        const oldData = await Operation.findById(id)


        const oldOP = {
            keyword: oldData.keyword,
            address: oldData.address,
            vehicles: oldData.vehicles,
            message: oldData.message,
            addressDestination: oldData.addressDestination,
            priority: oldData.priority
        }


        const newOP = {
            keyword: newData.keyword,
            address: newData.address,
            vehicles: newData.vehicles,
            message: newData.message,
            addressDestination: newData.addressDestination,
            priority: newData.priority
        }
        const delta = diff.getDiff(oldOP, newOP);
        const changes: any = []
        delta.forEach(element => {
            if (!(element.path[0] === 'vehicles' && element.op === 'update')) changes.push(element)

        });

        if (changes.length !== 0) {
            oldData.edit.push({ timestamp: Date.now(), changes })
            Object.assign(newData.edit, oldData.edit)
        }


        newData?.vehicles?.forEach(async (vehicle: any) => {
            vehicleHandler.updateVehicle(vehicle, {}, true)
            await vehicleHandler.setOperation(vehicle, id)

        });
        ioServer.sendPullOperation()
        return Operation.findOneAndUpdate({ _id: id }, newData, { new: true })
    },
}


export default operationHandler


