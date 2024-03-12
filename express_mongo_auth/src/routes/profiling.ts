import { Router } from 'express'
import { validate } from '../middleware'
import { catchAsync } from '../utils'
import ProfileValidators from '../validators/profiling.validator'
import ProfilingController from '../controllers/profiling'
import multer from 'multer';
import { multerConfig } from '../config/multerConfig';
import UploadServices from '../services/upload.services';
import AuthMiddlewares from '../middleware/auth.middleware'
const uploadAvatar = multer(multerConfig);
const router = Router()
const profilingRouter = Router()

profilingRouter.post('/save', [
    validate(ProfileValidators.createAccount),
    catchAsync(ProfilingController.createProfile),
])

profilingRouter.post('/update', [
    validate(ProfileValidators.updateProfile),
    catchAsync(ProfilingController.updateProfile)
])

profilingRouter.post('/update_basic_info',[
    validate(ProfileValidators.updateBasicInfo),
    catchAsync(ProfilingController.updateBasicInfo)
])

//check if user have profile already
profilingRouter.get('/check/:userId', [
    catchAsync(ProfilingController.checkProfile)
])

profilingRouter.post('/upload/avatar', [
    uploadAvatar.single("avatar"),
    catchAsync(ProfilingController.updateAvatar)
])

profilingRouter.get("/info/:userId", [
    catchAsync(ProfilingController.getClientInfo)
])


profilingRouter.get('/avatar/:fileKey', UploadServices.downloadClientAvatar)


export default router.use('/profiling', AuthMiddlewares.auth, profilingRouter)