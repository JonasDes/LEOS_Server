import { VehicleType, VehicleTypeSchema } from "./vehicleType.model"


export class VehicleTypeController {

    async create(station: VehicleTypeSchema) {
        return new VehicleType(station).save()
    }

    async list() {
        return VehicleType.find()
    }

    async list_one(id: string) {
        return VehicleType.findById(id)
    }

    async update(id: string, station: VehicleTypeSchema) {
        return VehicleType.findOneAndUpdate({ _id: id }, station, { new: true })
    }

    async delete(id: string) {
        return VehicleType.deleteOne({ _id: id })
    }
}



