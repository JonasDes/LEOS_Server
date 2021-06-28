import { Station, StationSchema } from './'

export class StationController {

    async create(station: StationSchema) {
        station.name_formatted = station.name?.replace(new RegExp(" ", 'g'), "_").toLocaleLowerCase()
        return new Station(station).save()
    }

    async list() {
        return Station.find()
    }

    async list_one(id: string) {
        return Station.findById(id)
    }

    async update(id: string, station: StationSchema) {
        if (station.name) station.name_formatted = station.name?.replace(new RegExp(" ", 'g'), "_").toLocaleLowerCase()
        return Station.findOneAndUpdate({ _id: id }, station, { new: true })
    }

    async delete(id: string) {
        return Station.deleteOne({ _id: id })
    }
}



