import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {StationSchema} from "./station.model"

class UserRole {
    @prop({required:true})
    public name: string
}


export { UserRole as UserRoleSchema }
export default getModelForClass(UserRole)