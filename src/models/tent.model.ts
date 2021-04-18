import { getModelForClass, prop } from "@typegoose/typegoose";

class Tent {

    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public name_formatted: string

    @prop({required: true, default: {street:"Musterstraße 20", postcode:"45355", city:"Musterhausen"} })
    public capacity: number
}

export { Tent as TentSchema }
export default getModelForClass(Tent)