import { getModelForClass, prop } from "@typegoose/typegoose";

class Tent {

    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public name_formatted: string

    @prop({ required: true })
    public capacity: number
}

const model = getModelForClass(Tent)

export { Tent as TentSchema, model as Tent }
