import express, { Router, Request, Response } from "express";
import { DiveraService } from "./divera.service";

export class DiveraRoute {
    router: Router
    constructor(protected divera: DiveraService) {
        this.router = express.Router()
        this.router.get('/vehicle', async (req: Request, res: Response) => {
            try {
                res.status(200).send(await divera.getVehicles())
            } catch (e) {
                res.status(500).send(e.message)
            }
        })
    }
}




