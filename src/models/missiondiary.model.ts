import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {UserSchema} from "./user.model";
import {MissionSchema} from "./mission.model";

class MissionDiary {
    @prop({required:true})
    public content: string

    @prop()
    private comment: string

    @prop({ref: () => UserSchema, required:false})
    public editor: Ref <UserSchema>

    @prop({ref: () => MissionSchema, required:true})
    public mission: Ref <MissionSchema>

    @prop()
    public entryId: string

    @prop()
    public timestamp: string

    @prop()
    public edit: object[]
}


export { MissionDiary as MissionDiarySchema }
export default getModelForClass(MissionDiary)