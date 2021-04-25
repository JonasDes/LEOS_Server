import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { TentSchema } from "./tent.model";

interface Tent {
    tent: Ref<TentSchema>,
    bed: number,
}

class Patient {
    @prop()
    public name: string

    @prop()
    public surname: string

    @prop()
    public birthdate: string

    @prop({ default: { tent: '', bed: '' } })
    public tent: Tent

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
