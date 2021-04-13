import axios from 'axios'
import io from 'socket.io-client'
import Vehicle from '../models/vehicle.model'
import { ioServer } from '../index'
import vehicleHandler from './VehicleHandler'

class Divera {
    private accesskey: string
    constructor(accesskey: string) {
        this.accesskey = accesskey
        try {
            const ioClient = io("https://ws.divera247.com");

            ioClient.on('connect', async () => {
                const jwtRes = await axios.get("https://divera247.com/api/v2/auth/jwt?accesskey=" + accesskey);
                const jwt = jwtRes.data.data.jwt;
                ioClient.emit('authenticate', { "jwt": jwt })
                console.log("connected to Divera-Websocket")
            })

            ioClient.on('cluster-vehicle', async (data: any) => {
                if (data.vehicle.fmsstatus_id === 10) data.vehicle.fmsstatus_id = 0
                const vehicle = await vehicleHandler.getByDivera(data.vehicle.id)
                if (data.vehicle.fmsstatus_id !== vehicle.fms) {

                    vehicleHandler.updateVehicle(vehicle._id, { fms: data.vehicle.fmsstatus_id })
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    sendAlert() {
        console.log("Ich kann noch keine Alarme versenden");
    }

    async setVehicleFMS(vehicle: any) {
        await axios.post("https://www.divera247.com/api/fms?status_id=" + vehicle.fms + "&vehicle_id=" + vehicle.id + "&accesskey=" + this.accesskey);
    }

    getVehicles() {
        return axios.get("https://www.divera247.com/api/v2/pull/vehicle-status?accesskey=" + this.accesskey).then(response => response.data.data)
    }
}

export default Divera