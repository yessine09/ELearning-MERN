import { Router } from 'express'
import { catchAsync } from '../utils'
import EnrollmentController from '../controllers/enrollment.controllers'
import AuthMiddlewares from '../middleware/auth.middleware'

const router = Router()
const enrollmentRoute = Router()

enrollmentRoute.post('/create', [
    //UserMiddlewares.checkPermissions('users', { write: true }),
    catchAsync(EnrollmentController.createEnrollment),
])

enrollmentRoute.get('/:userId', [
    catchAsync(EnrollmentController.getActiveEnrollmentByShaper)
])

// get enrollment by mentor 
enrollmentRoute.get('/mentor/:mentorId', [
    catchAsync(EnrollmentController.getActiveEnrollmentByMentor)
])

//get enrollment by userid and program id 
enrollmentRoute.get('/:userId/program/:programId', [
    catchAsync(EnrollmentController.getActiveEnrollmentByUserAndProgram)
])



export default router.use('/enrollment', [
    // AuthMiddlewares.auth,
    //UserMiddlewares.checkUserExist,
    //UserMiddlewares.checkRole('admin')
], enrollmentRoute)
