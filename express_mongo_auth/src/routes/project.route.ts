import { Router } from 'express'
import { validate } from '../middleware'
import { catchAsync } from '../utils'
import ProjectController from '../controllers/project.controller'
import multer from 'multer';
import { multerConfig } from '../config/multerConfig';
import UploadServices from '../services/upload.services';
import AuthMiddlewares from '../middleware/auth.middleware'
import ProjectValidators from '../validators/project.validators'
const uploadAttachment = multer(multerConfig);
const router = Router()
const ProjectRouter = Router()
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

//create new projet
ProjectRouter.post('/create', [
    validate(ProjectValidators.createProject),
    catchAsync(ProjectController.createNewProject)
])

//get all projects
ProjectRouter.get('/list', [
    catchAsync(ProjectController.getAllProjects)
])

// get project by id
ProjectRouter.get('/:id', [
    catchAsync(ProjectController.getProjectsByClient)
])

// get a projet by client
ProjectRouter.get('/shapers/:id', [
    catchAsync(ProjectController.getProjectsByClient)
])

// get a projet by client and status
ProjectRouter.get('/shapers/:id/status/:status', [
    catchAsync(ProjectController.getProjectsByClientAndStatus)
])

//get tasks by project
ProjectRouter.get('/tasks/:projectId', [
    catchAsync(ProjectController.getTasksByProject)
])

ProjectRouter.get('/tasks/:projectId/:status', [
    catchAsync(ProjectController.getTasksByProjectAndStatus)
])

// ProjectRouter.post('/tasks/:taskId/upload', [
//     uploadAttachment.single('attachment'),
//     catchAsync(ProjectController.uploadFileToTask)

// ])


export default router.use('/project',
    // AuthMiddlewares.auth,
    ProjectRouter)