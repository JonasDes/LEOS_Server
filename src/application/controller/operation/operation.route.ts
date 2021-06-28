import express, { Request, Response, Router } from 'express'
import { OperationController } from './';

export class OperationRoute {
    public router: Router
    constructor(controller: OperationController) {
        this.router = express.Router()
        this.router.post('/', async (req: Request, res: Response) => {
            try {
                res.status(200).send(await controller.createOperation(req.body))
            } catch (error) {
                res.status(500).send(error.message)
            }

        })
    }
}
