import { getModelForClass, prop } from "@typegoose/typegoose";

class Station {

    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public name_formatted: string

    @prop({ required: true, default: { street: "Musterstraße 20", postcode: "45355", city: "Musterhausen" } })
    public address: object
}

const model = getModelForClass(Station)

export { Station as StationSchema, model as Station}
