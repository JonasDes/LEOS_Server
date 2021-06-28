import {getModelForClass, prop, Ref} from "@typegoose/typegoose";

class Mission {
    @prop({required:true})
    public name: string

    @prop()
    private client: string

    @prop()
    public desc: string

    @prop()
    public operationsManager: string
}

const model = getModelForClass(Mission)

export { Mission as MissionSchema, model as Mission }