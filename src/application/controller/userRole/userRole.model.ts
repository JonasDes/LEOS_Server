import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

class UserRole {
    @prop({ required: true })
    public name: string
}

const model = getModelForClass(UserRole)

export { UserRole as UserRoleSchema, model as UserRole }
