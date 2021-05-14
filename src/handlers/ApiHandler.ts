import express from 'express'
import { stationRouter } from '../routes/station'
import { vehicleRouter } from '../routes/vehicle'
import { vehicleTypeRouter } from '../routes/vehicleType'
import { userRoleRouter } from '../routes/userRole'
import { userRouter } from '../routes/user'
import { keywordRouter } from '../routes/keyword'
import { missionRouter } from '../routes/mission'
import { missionDiaryRouter } from '../routes/missionDiary'
import { operationRouter } from '../routes/operation'
import { diveraRouter } from '../routes/divera'
import { tentRouter } from '../routes/tent'
import { patientRouter } from '../routes/patient'
import { authRouter, checkAuth } from '../routes/auth'
import { sprechWRouter } from '../routes/sprechw'

const router = express.Router()

/*****************
* ROUTES W/ AUTH *
******************/
router.use('/auth', authRouter)

router.use('/', checkAuth)

/*****************
* ROUTES W AUTH *
******************/
router.use('/station', stationRouter);
router.use('/vehicle', vehicleRouter)
router.use('/vehicleType', vehicleTypeRouter)
router.use('/userRole', userRoleRouter)
router.use('/user', userRouter)
router.use('/keyword', keywordRouter)
router.use('/mission', missionRouter)
router.use('/missionDiary', missionDiaryRouter)
router.use('/operation', operationRouter)
router.use('/divera', diveraRouter)
router.use('/tent', tentRouter)
router.use('/patient', patientRouter)
router.use('/sprechw', sprechWRouter)


export { router as apiRouter }