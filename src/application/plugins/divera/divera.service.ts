import { DiveraOptions } from "./";
import { LoggerService } from "../../../infrastructure";
import io from 'socket.io-client'
import axios from 'axios'
import express, { Router, Request, Response } from "express";
import { DiveraRoute } from "./divera.route";
import { OperationSchema, Vehicle, VehicleSchema } from "../../controller";


export class DiveraService {
    socket: SocketIOClient.Socket
    route: Router
    constructor(
        protected readonly options: DiveraOptions,
        protected readonly logger: LoggerService
    ) {

        this.route = new DiveraRoute(this).router

        this.socket = io(options.socket.url, { ...options.socket })
        this.socket.on('connect', async () => {
            logger.info('Divera | Socket connected succesfully')
            const userJWT = await axios.get(`${this.options.baseurl}v2/auth/jwt?accesskey=${this.options.accesskey}`);
            this.socket.emit('authenticate', { jwt: userJWT.data.data.jwt })
        })

        this.socket.on('init', () => {
            logger.info('Divera | Initialized socket, successfully authenticated')
        })

        this.socket.on('subscribed', () => {
            logger.info('Divera | Subscribed to socket')
        })

        this.socket.on('connect_error', (error: Error) => {
            logger.error('Divera | Error connecting to socket', { error })
        })

        this.socket.on('connect_timeout', () => {
            logger.error('Divera | Connection to socket timed out')
        })

        this.socket.on('disconnect', () => {
            logger.info('Divera | Connection to websocket lost')
        })

        this.socket.on('reconnecting', (attempt: number) => {
            logger.info(`Divera | Attempt number ${attempt} to reconnect socket`)
        })

        this.socket.on('reconnect_error', (error: Error) => {
            logger.error('Divera | Failed to reconnect to socket', { error })
        })

        this.socket.on('reconnect', () => {
            logger.info('Divera | Successfully reconnected to socket')
        })

        this.socket.on('cluster-vehicle', async (data: any) => {
            /*
            if (data.vehicle.fmsstatus_id === 10) data.vehicle.fmsstatus_id = 0
            //const vehicle = await vehicleHandler.getByDivera(data.vehicle.id)
            if (data.vehicle.fmsstatus_id !== vehicle.fms) {
                //  vehicleHandler.updateVehicle(vehicle._id, { fms: data.vehicle.fmsstatus_id.toString() }, false)
            }
            */
        })

    }



    async setVehicleFMS(vehicle: any) {
        try {
            return await axios.post(`${this.options.baseurl}fms?status_id=${vehicle.fms}&vehicle_id=${vehicle.id}&accesskey=${this.options.accesskey}`);
        } catch (e) {
            this.logger.error('Divera | ' + e);
        }
    }

    async sendAlert(operation: OperationSchema) {
        const rawVehicles: VehicleSchema[] = await Vehicle.find()

        let vehicles: string[] = []

        operation.vehicles.forEach(vehicleId => {
            vehicles.push(rawVehicles.find((x: any) => x._id.toString() === vehicleId.toString()).divera_id);

        })
        vehicles = vehicles.filter(el => {
            return el != undefined;
        });

        return await axios.post(this.options.baseurl + "alarm" + "?&accesskey=" + this.options.accesskey, { title: operation.keyword, text: operation.message, vehicle_ids: vehicles })

    }


    getVehicles() {
        try {
            return axios.get(`${this.options.baseurl}v2/pull/vehicle-status?accesskey=${this.options.accesskey}`).then(response => response.data.data)
        } catch (e) {
            this.logger.error('Divera | ' + e);
            return false
        }
    }

}