
import { User, UserSchema } from "./";


export class UserController {

    async create(user: UserSchema) {
        user.accesskey = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(36).substring(2, 15)).toUpperCase();
        return new User(user).save()
    }

    async list() {
        return User.find()
    }

    async list_one(id: string) {
        return User.findById(id)
    }

    async update(id: string, user: UserSchema) {
        return User.findOneAndUpdate({ _id: id }, user, { new: true })
    }

    async delete(id: string) {
        return User.deleteOne({ _id: id })
    }
}

