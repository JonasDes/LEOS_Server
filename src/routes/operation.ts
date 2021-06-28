import express, { Request, Response } from 'express'
import { OperationSchema } from '../application/controller/operation'
import operationHandler from '../handlers/OperationHandler'
import { checkRole } from '../application/api/auth'

const router = express.Router()

// CREATE
router.post('/', async (req: Request, res: Response) => {
    try {
        const operation = await operationHandler.newOperation(req.body)
        res.status(200).send(operation)
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message)
    }
})


// READ
router.get('/', async (req: Request, res: Response) => {
    try {
        const operations: OperationSchema = await operationHandler.getOperations()
        return res.status(200).send(operations)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// READ ONE
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const operation = await operationHandler.getOperation(id)
        return res.status(200).send(operation)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


// UPDATE
router.post('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const operation: OperationSchema = await operationHandler.updateOperation(id, req.body)
        res.status(200).send(operation)
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message)
    }
})

router.delete('/:id', checkRole.isAdmin, async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const operation = await operationHandler.deleteOperation(id)
        res.status(200).send(operation)
    } catch (e) {
        res.status(500).send(e.message)
    }
})



export { router as operationRouter }