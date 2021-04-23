import mongoose from 'mongoose'

class DatabaseHandler {
    connection: mongoose.Connection
    constructor() {
        mongoose.connect('mongodb+srv://leos:LTH39F7FfG7Asrx5@cluster0.8eor1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        this.connection = mongoose.connection;
        this.connection.once("open", () => {
            console.log("MongoDB database connected");
        });
    }
}

export default DatabaseHandler
