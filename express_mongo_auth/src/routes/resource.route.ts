import { Router } from 'express'
import { ResourceMiddlewares, RoleMiddlewares, UserMiddlewares, validate } from '../middleware'
import { catchAsync } from '../utils'
import ResourceValidators from '../validators/resource.validators'
import ResourceControllers from '../controllers/resource.controllers'

const router = Router()
const resourceRoute = Router()



resourceRoute.get('/', [
  UserMiddlewares.checkPermissions('resources', { read: true }),
  catchAsync(ResourceControllers.listResources),
])

resourceRoute.get('/:resourceId', [
  UserMiddlewares.checkPermissions('resources', { read: true }),
  validate(ResourceValidators.getResource),
  catchAsync(ResourceControllers.getResource),
])

resourceRoute.post('/', [
  UserMiddlewares.checkPermissions('resources', { write: true }),
  validate(ResourceValidators.createResource),
  ResourceMiddlewares.checkResourceDoesNotExist,
  catchAsync(ResourceControllers.createResource),
])

resourceRoute.post('/assignResource', [
  UserMiddlewares.checkPermissions('roles', { update: true }),
  validate(ResourceValidators.assignResource),
  RoleMiddlewares.checkRoleExist,
  ResourceMiddlewares.checkResourceExist,
  catchAsync(ResourceControllers.assignResource),
])

export default router.use('/resources', resourceRoute)