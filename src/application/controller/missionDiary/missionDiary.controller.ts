import { VehicleSchema } from "../";
import { LogTypes, MissionDiary, MissionDiarySchema } from "./missiondiary.model";

export class MissionDiaryController {
    constructor() { }

    async addEntry(entry: MissionDiarySchema) {
        if (!entry.type) entry.type = LogTypes.REPORT
        if (!entry.type.id) entry.type = Object.values(LogTypes).find(e => e.id === entry.type as unknown as string);

        entry.mission = '6076199b876b1b00293c9358' // @TODO: Add Mission property
        entry.entryId = await MissionDiary.countDocuments({ mission: entry.mission }) + 1
        entry.timestamp = Date.now()
        let missionDiary = new MissionDiary(entry)
        return await missionDiary.save()
    }

    async editEntry(id: string, entry: MissionDiarySchema) {
        let oldEntry: MissionDiarySchema = await MissionDiary.findOne({ _id: id })
        if (!oldEntry) return false
        oldEntry.edit.push({ timestamp: oldEntry?.timestamp, data: { content: oldEntry.content, comment: oldEntry?.comment, editor: oldEntry?.editor } })
        oldEntry.timestamp = Date.now()
        oldEntry.content = entry.content || oldEntry.content
        oldEntry.comment = entry.comment || oldEntry.comment
        oldEntry.editor = entry.editor || oldEntry.editor
        return await MissionDiary.findOneAndUpdate({ _id: id }, oldEntry, { new: true })
    }

    async sprechW(vehicle: VehicleSchema) {
        const entry = {
            editor: "607c06f8be7a635b98d85ad5", // @TODO: Implements Systemuser /w ID
            content: `${vehicle.name} (${vehicle.fms})`,
            type: LogTypes.SPRECHW
        }
        this.addEntry(entry as MissionDiarySchema)
    }


    async changeFMS(change: any) {
        const entry = {
            editor: "607c06f8be7a635b98d85ad5", // @TODO: Implements Systemuser /w ID
            content: `${change.name} ${change.fms_old} → ${change.fms_new} [${(change.islst ? 'LST → FZG' : 'FZG → LST')}]`,
            type: LogTypes.FMS
        }
        this.addEntry(entry as MissionDiarySchema)
    }

}