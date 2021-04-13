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


export { Mission as MissionSchema }
export default getModelForClass(Mission)