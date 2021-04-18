import MissionDiary from '../models/missiondiary.model'

const missionDiaryHandler = {
    getUsers: async () => {
        return MissionDiary.find().populate('role').select('name')
    },

    changeVehicleStatus: async (vehicle: any) => {
        const timestamp = Date.now()
        const content = "Statuswechsel: " + vehicle.name + " " + vehicle.fms_old + " → " + vehicle.fms_new + " [" + (vehicle.islst ? 'LST → FZG' : 'FZG → LST') + "]"
        const missionDiary = new MissionDiary({ "editor": "607c06f8be7a635b98d85ad5", "mission": "6076199b876b1b00293c9358", timestamp, content })
        await missionDiary.save()
    },

    setSprechW: async (vehicle: any) => {
        const timestamp = Date.now()
        const content = "Sprechwunsch: " + vehicle.name + " (" + vehicle.fms_new + ")"
        const missionDiary = new MissionDiary({ "editor": "607c06f8be7a635b98d85ad5", "mission": "6076199b876b1b00293c9358", timestamp, content })
        await missionDiary.save()
    }
}

export default missionDiaryHandler

