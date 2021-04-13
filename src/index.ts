import express from 'express';
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { json } from 'body-parser';
import Divera from './handlers/Divera'
import { apiRouter } from './handlers/ApiHandler'
import cors from 'cors'
import SocketHandler from './handlers/SocketHandler'
import EtbPDF from './handlers/EtbPDF'
import AlarmPDF from './handlers/AlarmPDF'



const app = express();
app.set("port", process.env.PORT || 3000);
const http = require("http").Server(app);
const ioServer = new SocketHandler(http)
const diveraHandler = new Divera('Me21Yl8jhfJie1-oakPzr9wG585yT_IfkrwRKubHX_MciKWACRdgzK11H7dJI4Ur')

export { ioServer, diveraHandler }


// new EtbPDF("602ac22c8bb6c947a06a4106")
// new AlarmPDF("606ba8c98f4aed2298dfcfb0")

const server = http.listen(3000, () => {
    console.log("listening on *:3000");
});

app.use(cookieParser())
app.use(json())
app.use(cors())
app.use('/api', apiRouter);


mongoose.connect('mongodb://localhost:27017/mylst', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connected");

    // console.log("Setting change streams");
    // const thoughtChangeStream = connection.collection('vehicles').watch()
    //
    // thoughtChangeStream.on("change", (change) => {
    //     console.log("TEST")
    //     console.log(change)
    //
    // });
});











