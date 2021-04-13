import Vehicle from '../models/vehicle.model'
import { diveraHandler, ioServer } from '../index'

const vehicleHandler = {

    getVehicles: async () => {
        return Vehicle.find().populate('station').populate('type')
    },

    createVehicle: async (vehicleData: any) => {
        try {
            const vehicle = new Vehicle(vehicleData)
            return vehicle.save()
        } catch (error) {
            return { "success:": false, "message": error.message }
        }

    },

    getByDivera: async (diveraId: any) => {
        return Vehicle.findOne({ divera_id: diveraId })
    },

    getById: async (id: any) => {
        return Vehicle.findOne({ _id: id })
    },

    deleteVehicle: async (vehicleID: any) => {
        const vehicle = await Vehicle.findById(vehicleID)
        return vehicle.delete()
    },

    updateVehicle: async (vehicleID: any, vehicleData: any) => {

        const vehicle = await Vehicle.findOne({ _id: vehicleID })
        if ((vehicleData?.fms || vehicleData?.fms === 0) && vehicleData?.fms !== vehicle.fms) {
            switch (vehicleData.fms) {
                case 0:
                    ioServer.io.emit("NOTFALL", vehicle)
                    break;
                case 5:
                    ioServer.io.emit("sprechw", vehicle, "1", true)
                    break;
                case 9:

                    break;
                default:
                    if (vehicle.divera_id) diveraHandler.setVehicleFMS({ fms: vehicleData.fms, id: vehicle.divera_id })
                    ioServer.io.emit("pull-fms")
                    return Vehicle.findOneAndUpdate({ _id: vehicleID }, vehicleData, { new: true })
            }

        } else {
            // ioServer.io.emit("pull-fms")
            return Vehicle.findOneAndUpdate({ _id: vehicleID }, vehicleData, { new: true })
        }

    },
}

export default vehicleHandler

