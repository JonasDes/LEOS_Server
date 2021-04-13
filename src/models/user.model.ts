import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {UserRoleSchema} from "./userrole.model";
import {VehicleTypeSchema} from "./vehicletype.model";

class User {
    @prop({required:true})
    public name: string

    @prop({required:true})
    private password: string

    @prop({required:true})
    public accesskey: string

    @prop({ref: () => UserRoleSchema, required:true})
    public role: Ref <UserRoleSchema>
}

export { User as UserSchema }
export default getModelForClass(User)
