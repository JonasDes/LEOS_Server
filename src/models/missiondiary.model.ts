import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { UserSchema } from "./user.model";
import { MissionSchema } from "./mission.model";


interface editModel {
    timestamp: number,
    data: {
        content: string
        comment: string
        editor: Ref<UserSchema> | string
    }
}

interface logTypeModel {
    id: string,
    name: string
}

const LogTypes = {
    FMS: {
        id: 'fms',
        name: 'Statuswechsel'
    } as logTypeModel,
    OPERATION: {
        id: 'operation',
        name: 'Einsatz'
    } as logTypeModel,
    SPRECHW: {
        id: 'sprechw',
        name: 'Sprechwunsch'
    } as logTypeModel,
    REPORT: {
        id: 'report',
        name: 'Meldung'
    } as logTypeModel,
    COMMAND: {
        id: 'command',
        name: 'Befehl'
    } as logTypeModel,
    FEEDBACK: {
        id: 'feedback',
        name: 'Rückmeldung'
    } as logTypeModel,
}

class MissionDiary {
    @prop({ required: true })
    public content: string

    @prop()
    public comment: string

    @prop({ ref: () => UserSchema, required: true })
    public editor: Ref<UserSchema> | string

    @prop({ ref: () => MissionSchema, required: true })
    public mission: Ref<MissionSchema> | string

    @prop({ required: true })
    public entryId: number

    @prop()
    public type: logTypeModel

    @prop({ required: true })
    public timestamp: number

    @prop()
    public edit: editModel[]
}


export { MissionDiary as MissionDiarySchema, LogTypes, logTypeModel }
export default getModelForClass(MissionDiary)