import User from '../models/user.model'

const userHandler = {
    getUsers: async () => {
        return User.find({ name: { $ne: 'SYSTEM' } }).populate('role').select('name')
    },

    createUser: async (userData: any) => {
        userData.accesskey = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(36).substring(2, 15)).toUpperCase();
        const user = new User(userData)
        return user.save()
    },

    getById: async (id: any) => {
        return User.findOne({ _id: id })
    },

    deleteUser: async (userID: any) => {
        const user = await User.findById(userID)
        return user.delete()
    },

    updateUser: async (vehicleID: any, vehicleData: any) => {
        return User.findOneAndUpdate({ _id: vehicleID }, vehicleData, { new: true })
    }
}

export default userHandler

