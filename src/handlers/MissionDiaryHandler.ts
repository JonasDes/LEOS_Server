import { MissionDiary, LogTypes, MissionDiarySchema } from '../application/controller/'

class MissionDiaryHandler {

    static async changeFMS(vehicle: any) {
        const entry = {
            editor: "607c06f8be7a635b98d85ad5",
            content: vehicle.name + " " + vehicle.fms_old + " → " + vehicle.fms_new + " [" + (vehicle.islst ? 'LST → FZG' : 'FZG → LST') + "]",
            type: LogTypes.FMS
        }
        this.addEntry(entry as MissionDiarySchema)
    }

    static async sprechW(vehicle: any) {
        const entry = {
            editor: "607c06f8be7a635b98d85ad5",
            content: vehicle.name + " (" + vehicle.fms + ")",
            type: LogTypes.SPRECHW
        }
        this.addEntry(entry as MissionDiarySchema)
    }


    static async resolveSprechW(data: any) {

    }

    static async addEntry(entry: MissionDiarySchema) {
        console.log(entry.type);

        if (!entry.type) entry.type = LogTypes.REPORT
        if (!entry.type.id) entry.type = Object.values(LogTypes).find(e => e.id === entry.type as unknown as string);


        entry.mission = '6076199b876b1b00293c9358' // @TODO: Add Mission property
        entry.entryId = await MissionDiary.countDocuments({ mission: entry.mission }) + 1
        entry.timestamp = Date.now()
        let missionDiary = new MissionDiary(entry)
        return await missionDiary.save()

    }

    static async editEntry(id: string, entry: MissionDiarySchema) {
        let oldEntry: MissionDiarySchema = await MissionDiary.findOne({ _id: id })
        if (!oldEntry) return false
        console.log(oldEntry);

        oldEntry.edit.push({ timestamp: oldEntry?.timestamp, data: { content: oldEntry.content, comment: oldEntry?.comment, editor: oldEntry?.editor } })
        oldEntry.timestamp = Date.now()
        oldEntry.content = entry.content || oldEntry.content
        oldEntry.comment = entry.comment || oldEntry.comment
        oldEntry.editor = entry.editor || oldEntry.editor
        return await MissionDiary.findOneAndUpdate({ _id: id }, oldEntry, { new: true })
    }


}

export default MissionDiaryHandler
