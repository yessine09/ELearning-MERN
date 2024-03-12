import { Router } from 'express'
import AuthControllers from '../controllers/auth'
import { AdminMiddlewares, UserMiddlewares, validate } from '../middleware'
import AuthMiddlewares from '../middleware/auth.middleware'
import RoleValidators from '../validators/role.validators'
import RoleControllers from '../controllers/role.controllers'
import catchAsync from '../utils/catchAsync'
import authValidators from '../validators/auth.validator'

const router = Router()
const authRouter = Router()

authRouter.get('/roleauthorization/:roleId', [
    validate(RoleValidators.getRole),
    catchAsync(RoleControllers.getRole),
]
)

authRouter.post('/register', [
    validate(authValidators.createAccount),
    UserMiddlewares.checkUserDoesNotExist,
    catchAsync(AuthControllers.createAccount),
])

authRouter.post('/profile/create', [
    catchAsync(AuthControllers.createClientProfile),
])

authRouter.post('/login', [
    validate(authValidators.login),
    UserMiddlewares.checkUserExistingByEmail,
    AuthMiddlewares.checkPasswordIsValid,
    catchAsync(AuthControllers.login),
])

authRouter.post('/logout', [
    AuthMiddlewares.auth,
    UserMiddlewares.checkUserExist,
    catchAsync(AuthControllers.logout),
])

authRouter.post('/refresh_token', [
    AuthMiddlewares.checkRefreshToken,
    UserMiddlewares.checkUserExist,
    catchAsync(AuthControllers.refreshToken),
])

authRouter.post('/verify_email', [
    AuthMiddlewares.auth,
    UserMiddlewares.checkUserExist,
    catchAsync(AuthControllers.verifyEmail),
])

authRouter.post('/confirm_email', [
    AuthMiddlewares.auth,
    validate(authValidators.confirmEmail),
    UserMiddlewares.checkUserExist,
    catchAsync(AuthControllers.confirmEmail),
])

authRouter.post('/forget_passwordByfn', [
    validate(authValidators.forgetPasswordByFn),
    catchAsync(AuthControllers.forgetPasswordByFn),
])
authRouter.post('/forget_passwordByEmail', [
    validate(authValidators.forgetPasswordByEmail),
    UserMiddlewares.checkUserNotExistByEmail,
    catchAsync(AuthControllers.forgetPasswordByEmail),
])
authRouter.post('/verify_code', [
    validate(authValidators.confirmCode),
    UserMiddlewares.verifyCode,
    catchAsync(AuthControllers.verifyCode),
])

authRouter.post('/reset_Password', [
    validate(authValidators.resetPassword),
    UserMiddlewares.checkUserExistingByEmail,
    catchAsync(AuthControllers.resetPassword),
])

// fetch user by id
authRouter.get('/getuser/:userId', [
    catchAsync(AuthControllers.getuserById),
])

export default router.use('/auth', authRouter)
