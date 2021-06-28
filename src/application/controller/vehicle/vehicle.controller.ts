import { Request, Response } from 'express'
import { SocketService, DiveraService } from '../../../application/'
import { VehicleSchema, Vehicle } from './'

export class VehicleController {
    constructor(
        protected socket: SocketService, protected divera: DiveraService
    ) { }

    async create(vehicle: VehicleSchema) {
        return new Vehicle(vehicle).save()
    }

    async list() {
        return Vehicle.find()
    }

    async list_one(id: string) {
        return Vehicle.findById(id)
    }

    async update(id: string, _vehicle: VehicleSchema, fromLst: boolean) {
        const vehicle: VehicleSchema = await Vehicle.findById(id)

        if ((vehicle.fms || vehicle.fms === 0) && vehicle.fms !== _vehicle.fms) {
            switch (vehicle.fms) {
                case 0:
                    this.socket.sendEmergency(vehicle)
                    break;
                case 5:
                    // @TODO sprechWHandler.newSprechW(vehicle)
                    break;
                case 9:
                    this.socket.sendSprechWPrio(vehicle)
                    break;
                default:
                    // @TODO: if (vehicle.fms == 2 || vehicle.fms == 1)  vehicle.removeOperation(vehicle)
                    if (vehicle.divera_id) this.divera.setVehicleFMS(vehicle)
                    break;
            }
            return Vehicle.findOneAndUpdate({ _id: id }, _vehicle, { new: true })
        } else throw new Error("Same FMS")

    }

    async delete(id: string) {
        return Vehicle.deleteOne({ _id: id })
    }
}





