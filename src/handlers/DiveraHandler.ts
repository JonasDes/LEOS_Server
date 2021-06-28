import axios from 'axios'
import io from 'socket.io-client'
import { OperationSchema } from '../application/controller/operation/operation.model'
import vehicleHandler from './VehicleHandler'
import { Vehicle, VehicleSchema } from '../application/controller/'

class DiveraHandler {
    private accesskey: string = process.env.DIVERA
    private baseurl: string = "https://divera247.com/api/"
    public ioClient: SocketIOClient.Socket
    constructor() {
        try {
            this.ioClient = io("https://ws.divera247.com");

            // ON CONNECT
            this.ioClient.on('connect', async () => {
                const jwtRes = await axios.get(this.baseurl + "v2/auth/jwt?accesskey=" + this.accesskey);
                const jwt = jwtRes.data.data.jwt;
                this.ioClient.emit('authenticate', { "jwt": jwt })
                console.log("connected to Divera-Websocket")
            })

            // ON DISCONNECT
            this.ioClient.on('disconnect', () => {
                console.log("disconnected from Divera-Websocket")
            })

            // ON RECONNECTING
            this.ioClient.on('reconnecting', () => {
                // console.log("Try to reconnect to Divera-Websocket...")
            })

            this.ioClient.on('cluster-vehicle', async (data: any) => {
                if (data.vehicle.fmsstatus_id === 10) data.vehicle.fmsstatus_id = 0
                const vehicle = await vehicleHandler.getByDivera(data.vehicle.id)
                if (data.vehicle.fmsstatus_id !== vehicle.fms) {
                    vehicleHandler.updateVehicle(vehicle._id, { fms: data.vehicle.fmsstatus_id.toString() }, false)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    async sendAlert(operation: OperationSchema) {
        const rawVehicles: VehicleSchema[] = await Vehicle.find()

        let vehicles: string[] = []

        operation.vehicles.forEach(vehicle => {
            vehicles.push(rawVehicles.find((x: any) => x._id.toString() == vehicle).divera_id);

        })
        vehicles = vehicles.filter(el => {
            return el != undefined;
        });

        return await axios.post(this.baseurl + "alarm" + "?&accesskey=" + this.accesskey, { title: operation.keyword, text: operation.message, vehicle_ids: vehicles })

    }


    async setVehicleFMS(vehicle: any) {
        try {
            return await axios.post(this.baseurl + "fms?status_id=" + vehicle.fms + "&vehicle_id=" + vehicle.id + "&accesskey=" + this.accesskey);
        } catch (e) {
            console.error(e);
            return false
        }
    }

    getVehicles() {
        try {
            return axios.get(this.baseurl + "v2/pull/vehicle-status?accesskey=" + this.accesskey).then(response => response.data.data)
        } catch (e) {
            console.error(e);
            return false
        }

    }
}

export default DiveraHandler