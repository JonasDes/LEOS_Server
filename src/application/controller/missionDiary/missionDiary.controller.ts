import { LogTypes, MissionDiary, MissionDiarySchema } from "./missiondiary.model";

export class MissionDiaryController {
    constructor() {

    }

    async addEntry(entry: MissionDiarySchema) {
        if (!entry.type) entry.type = LogTypes.REPORT
        if (!entry.type.id) entry.type = Object.values(LogTypes).find(e => e.id === entry.type as unknown as string);

        entry.mission = '6076199b876b1b00293c9358' // @TODO: Add Mission property
        entry.entryId = await MissionDiary.countDocuments({ mission: entry.mission }) + 1
        entry.timestamp = Date.now()
        let missionDiary = new MissionDiary(entry)
        return await missionDiary.save()

    }
}