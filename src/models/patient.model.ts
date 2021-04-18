import {getModelForClass, prop, Ref} from "@typegoose/typegoose";

class Patient {
    @prop()
    public name: string

    @prop()
    public surname: string

    @prop()
    public birthdate: string

    @prop()
    public birthplace: string

    @prop()
    public sex: string

    @prop()
    public triage: string

    @prop()
    public origin: string

    @prop()
    public msg: string


}

export { Patient as PatientSchema }
export default getModelForClass(Patient)
