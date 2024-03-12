import express, { Router } from 'express'
import { CommonRouteConfig } from '../common'
import { AdminMiddlewares, RoleMiddlewares, UserMiddlewares, validate } from '../middleware'
import { catchAsync } from '../utils'
import RoleControllers from '../controllers/role.controllers'
import RoleValidators from '../validators/role.validators'
import AdminControllers from '../controllers/admin.controllers'

const router = Router()
const roleRoute = Router()


roleRoute.get('/', [
  UserMiddlewares.checkPermissions('roles', { read: true }),
  catchAsync(RoleControllers.listRoles),
])

roleRoute.get('/:roleId', [
  UserMiddlewares.checkPermissions('roles', { read: true }),
  validate(RoleValidators.getRole),
  catchAsync(RoleControllers.getRole),
])

roleRoute.post('/', [
  UserMiddlewares.checkPermissions('roles', { write: true }),
  validate(RoleValidators.createRole),
  RoleMiddlewares.checkRoleDoesNotExist,
  catchAsync(RoleControllers.createRole),
])

roleRoute.post('/grantRole', [
  UserMiddlewares.checkPermissions('users', { update: true }),
  validate(RoleValidators.grantRole),
  AdminMiddlewares.checkUserExist,
  RoleMiddlewares.checkRoleExist,
  catchAsync(RoleControllers.grantRole),
])

roleRoute.delete('/revokeRole', [
  UserMiddlewares.checkPermissions('users', { update: true }),
  validate(RoleValidators.revokeRole),
  AdminMiddlewares.checkUserExist,
  RoleMiddlewares.checkRoleExist,
  catchAsync(RoleControllers.revokeRole),
])


roleRoute.get('/getusersbyroleid/:roleId', [
  UserMiddlewares.checkPermissions('roles', { read: true }),
  validate(RoleValidators.getUsersByRole),
  catchAsync(RoleControllers.getUsersByRole),
])

roleRoute.get('/getusersbyroleidanduserid/:roleId/:userId', [
  UserMiddlewares.checkPermissions('roles', { read: true }),
  validate(RoleValidators.getUsersByRoleandUserId),
  catchAsync(RoleControllers.getUsersByRoleAndUserId),
])

export default router.use('/roles', roleRoute)
