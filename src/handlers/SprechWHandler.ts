import SprechW, { SprechWSchema } from '../models/sprechw.model'
import { diveraHandler, ioServer, missionDiaryHandler } from '../index'

const sprechWHandler = {

    getSprechWs: async () => {
        return await SprechW.find().populate('vehicle')
    },

    newSprechW: async (data: any) => {
        try {
            missionDiaryHandler.sprechW({ name: data.name, fms: data.fms })
            const entry: SprechWSchema = {
                timestamp: Date.now(),
                vehicle: data._id
            }
            const sprechW = new SprechW(entry)
            ioServer.sendSprechW(data)
            return sprechW.save()
        } catch (error) {
            return { "success:": false, "message": error.message }
        }

    },

    resolveSprechW: async (data: any) => {
        try {
            const sprechw = await SprechW.find({ _id: data.id })
            missionDiaryHandler.resolveSprechW(data)
            sprechw.delete()
        } catch (error) {
            return { "success:": false, "message": error.message }
        }

    }

}

export default sprechWHandler

