import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { UserRoleSchema } from "../userRole";

class User {
    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public password: string

    @prop({ required: true })
    public accesskey: string

    @prop({ ref: UserRoleSchema, required: true })
    public role: Ref<UserRoleSchema>
}

const model = getModelForClass(User)

export { User as UserSchema, model as User }

