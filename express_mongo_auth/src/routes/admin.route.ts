import { Router } from 'express'
import { catchAsync } from '../utils'
import { RoleMiddlewares, UserMiddlewares, validate } from '../middleware'
import AdminControllers from '../controllers/admin.controllers'
import roleRoute from './role.route'
import resourceRoute from './resource.route'
import AuthMiddlewares from '../middleware/auth.middleware'
import adminValidators from '../validators/admin.validators'

const router = Router()
const adminRoute = Router()

adminRoute.post('/createUser', [
  UserMiddlewares.checkPermissions('users', { write: true }),
  validate(adminValidators.createUser),
  UserMiddlewares.checkUserDoesNotExist,
  catchAsync(AdminControllers.createUserAccount),
])

adminRoute.post('/createMentor', [
  UserMiddlewares.checkPermissions('users', { write: true }),
  validate(adminValidators.createUser),
  UserMiddlewares.checkUserDoesNotExist,
  catchAsync(AdminControllers.createMentorAccount),
])

adminRoute.post('/createEntreprise', [
  UserMiddlewares.checkPermissions('users', { write: true }),
  validate(adminValidators.createUser),
  UserMiddlewares.checkUserDoesNotExist,
  catchAsync(AdminControllers.createEntrepriseAccount),
])


adminRoute.post('/createAdmin', [
  UserMiddlewares.checkPermissions('users', { write: true }),
  validate(adminValidators.createUser),
  UserMiddlewares.checkUserDoesNotExist,
  catchAsync(AdminControllers.createAdminAccount),
])

adminRoute.post('/createContentCreator', [
  UserMiddlewares.checkPermissions('users', { write: true }),
  validate(adminValidators.createUser),
  UserMiddlewares.checkUserDoesNotExist,
  catchAsync(AdminControllers.createContentCreatorAccount),
])

adminRoute.get('/getallusers', [
  UserMiddlewares.checkPermissions('users', { read: true }),
  catchAsync(AdminControllers.getAllUsers),
])

// fetch user by id
adminRoute.get('/getuser/:id', [
  UserMiddlewares.checkPermissions('users', { read: true }),
  UserMiddlewares.checkUserExist,
  catchAsync(AdminControllers.getUserById),
])


adminRoute.put('/updateuser/:id', [
  UserMiddlewares.checkPermissions('users', { update: true }),
  UserMiddlewares.checkUserExist,
  validate(adminValidators.updateUser),
  catchAsync(AdminControllers.updateUser),
])


adminRoute.delete('/deleteuser/:id', [
  UserMiddlewares.checkPermissions('users', { delete: true }),
  UserMiddlewares.checkUserExist,
  catchAsync(AdminControllers.deleteUser),
])

// asign a mentor to a program
adminRoute.post('/programs/:id/mentors/:mentorId', [
  UserMiddlewares.checkPermissions('users', { delete: true }),
  UserMiddlewares.checkUserExist,
  catchAsync(AdminControllers.assignMentorToProgram)
])


adminRoute.use('/', roleRoute)

adminRoute.use('/', resourceRoute)

export default router.use('/api', [
  AuthMiddlewares.auth,
  UserMiddlewares.checkUserExist,
  UserMiddlewares.checkRole('admin')
], adminRoute)
