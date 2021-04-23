import Vehicle from '../models/vehicle.model'
import { diveraHandler, ioServer, missionDiaryHandler } from '../index'

const vehicleHandler = {

    getVehicles: async () => {
        return await Vehicle.find().populate('station').populate('type').populate('Operation')
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

    setOperation: async (vehicleID: string, operation: string) => {
        return Vehicle.findOneAndUpdate({ _id: vehicleID }, { operation }, { new: true }) // @TODO: Check if Operation is Set
    },


    updateVehicle: async (vehicleID: any, vehicleData: any, islst: boolean) => {
        const vehicle = await Vehicle.findOne({ _id: vehicleID })
        if ((vehicleData?.fms || vehicleData?.fms === 0) && vehicleData?.fms.toString() !== vehicle.fms.toString()) {
            switch (vehicleData.fms) {
                case 0:
                    ioServer.sendEmergency(vehicle)
                    break;
                case 5:
                    ioServer.sendSprechW(vehicle)
                    missionDiaryHandler.setSprechW({ name: vehicle.name, fms_new: vehicle.fms })
                    break;
                case 9:
                    ioServer.sendSprechWPrio(vehicle)
                    // @TODO: Add missionDiaryHandler for PRIO
                    break;
                default:
                    const result = await Vehicle.findOneAndUpdate({ _id: vehicleID }, vehicleData, { new: true })
                    if (vehicle.divera_id) await diveraHandler.setVehicleFMS({ fms: vehicleData.fms, id: vehicle.divera_id })
                    missionDiaryHandler.changeVehicleStatus({ name: vehicle.name, fms_old: vehicle.fms, fms_new: vehicleData?.fms, islst })
                    ioServer.sendPullFMS()
                    return true
            }
        } else {
            return Vehicle.findOneAndUpdate({ _id: vehicleID }, vehicleData, { new: true })
        }

    },
}

export default vehicleHandler

