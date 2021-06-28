import express, { Request, Response, Router } from 'express'
import { StationController } from './station.controller'

export class StationRoute {
    public router: Router
    constructor(controller: StationController) {
        this.router = express.Router()
        this.router.post('/', async (req: Request, res: Response) => {
            try { res.status(200).send(await controller.create(req.body)) } catch (error) { res.status(500).send(error.message) }

        })
        this.router.get('/', async (req: Request, res: Response) => {
            try { res.status(200).send(await controller.list()) } catch (error) { res.status(500).send(error.message) }

        })
        this.router.get('/:id', async (req: Request, res: Response) => {
            const { id } = req.params
            try { res.status(200).send(await controller.list_one(id)) } catch (error) { res.status(500).send(error.message) }

        })
        this.router.post('/:id', async (req: Request, res: Response) => {
            const { id } = req.params
            try { res.status(200).send(await controller.update(id, req.body)) } catch (error) { res.status(500).send(error.message) }

        })
        this.router.delete('/:id', async (req: Request, res: Response) => {
            const { id } = req.params
            try { res.status(200).send(await controller.delete(id)) } catch (error) { res.status(500).send(error.message) }

        })
    }
}
