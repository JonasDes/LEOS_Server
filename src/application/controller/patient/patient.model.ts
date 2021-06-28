import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { TentSchema } from "../";

interface Tent {
    tent: Ref<TentSchema> | string,
    bed: number,
}

class Patient {
    @prop({ default: '' })
    public name: string

    @prop({ default: '' })
    public surname: string

    @prop()
    public birthdate: string

    @prop({ default: { tent: '', bed: '' } })
    public tent: Tent

    @prop({ default: '' })
    public birthplace: string

    @prop({ default: '' })
    public sex: string

    @prop({ default: 0 })
    public triage: number

    @prop({ default: '' })
    public origin: string

    @prop({ default: '' })
    public msg: string


}

const model = getModelForClass(Patient)

export { Patient as PatientSchema, model as Patient }

