import express, { Request, Response, Router } from 'express'
import { MissionDiaryController } from './';

export class MissionDiaryRoute {
    public router: Router
    constructor(controller: MissionDiaryController) {
        this.router = express.Router()
        this.router.post('/', async (req: Request, res: Response) => {
            try { res.status(200).send(await controller.addEntry(req.body)) } catch (error) { res.status(500).send(error.message) }

        })
        this.router.post('/:id', async (req: Request, res: Response) => {
            const { id } = req.params
            try { res.status(200).send(await controller.editEntry(id, req.body)) } catch (error) { res.status(500).send(error.message) }

        })
    }
}
