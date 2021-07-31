import { Vehicle } from '../application/controller/'
//import { socketService, missionDiaryHandler } from '../index'
import sprechWHandler from './SprechWHandler'

const vehicleHandler = {

    getVehicles: async () => {
        return await Vehicle.find().populate('station').populate('type').populate('operation')
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
        const vehicle = Vehicle.findOneAndUpdate({ _id: vehicleID }, { operation }, { new: true })
        //socketService.sendPullFMS()
        return vehicle // @TODO: Check if Operation is Set
    },

    removeOperation: async (vehicleID: string) => {
        const operation: any = null
        return Vehicle.findOneAndUpdate({ _id: vehicleID }, { operation }, { new: true }) // @TODO: Check if Operation is Set
    },



    updateVehicle: async (vehicleID: any, vehicleData: any, islst: boolean) => {
        const vehicle = await Vehicle.findOne({ _id: vehicleID })
        if ((vehicleData?.fms || vehicleData?.fms === 0) && vehicleData?.fms.toString() !== vehicle.fms.toString()) {
            switch (vehicleData.fms) {
                case 0:
                    //socketService.sendEmergency(vehicle)
                    break;
                case 5:
                    sprechWHandler.newSprechW(vehicle)
                    break;
                case 9:
                    //socketService.sendSprechWPrio(vehicle)
                    // @TODO: Add missionDiaryHandler for PRIO
                    break;
                default:
                    if (vehicleData.fms == 2 || vehicleData.fms == 1) vehicleHandler.removeOperation(vehicle)
                    const result = await Vehicle.findOneAndUpdate({ _id: vehicleID }, vehicleData, { new: true })
                    //if (vehicle.divera_id) await diveraHandler.setVehicleFMS({ fms: vehicleData.fms, id: vehicle.divera_id })
                    //missionDiaryHandler.changeFMS({ name: vehicle.name, fms_old: vehicle.fms, fms_new: vehicleData?.fms, islst })
                    //socketService.sendPullFMS()
                    return true
            }
        } else {
            return Vehicle.findOneAndUpdate({ _id: vehicleID }, vehicleData, { new: true })
        }

    },
}

export default vehicleHandler

