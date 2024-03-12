import { Router } from "express";
import AuthMiddlewares from "../middleware/auth.middleware";
import { catchAsync } from "../utils";
import { validate } from "../middleware";
import { TaskValidators } from "../validators/task.validators";
import taskControllers from "../controllers/task.controllers";
import multer from 'multer';
import { multerConfig } from '../config/multerConfig';
import UploadServices from "../services/upload.services";
const uploadAttachment = multer(multerConfig);
const router = Router()
const taskRouter = Router()

//asign task to user
taskRouter.post('/add/:userid', [
    validate(TaskValidators.createTask),
    catchAsync(taskControllers.addTask)
])

//get task by id 
taskRouter.get('/:id', [
    catchAsync(taskControllers.getlessonByid)
])


// get tasks by lesson id
taskRouter.get('/list/:id', [
    catchAsync(taskControllers.getTasksByLesson)
])

// get tasks by client id
taskRouter.get('/shapers/:id', [
    catchAsync(taskControllers.getTasksByClient)
])

// get tasks by client id and status
taskRouter.get('/shapers/:id/status/:status', [
    catchAsync(taskControllers.getTasksByClientAndStatus)
])

// get tasks from project by project id
taskRouter.get('/project/:id', [
    catchAsync(taskControllers.getTasksByProject)
])

// add attachment to task by task id from the mentor
taskRouter.put('/add/attachment/:id', [
    uploadAttachment.single('attachment'),
    catchAsync(taskControllers.addAttachmentToTask)
])

// add attachment to task by task id from the user and change status to In Progress  
taskRouter.put('/add/user/attachment/:id', [
    uploadAttachment.single('attachment'),
    catchAsync(taskControllers.addUserAttachmentToTask)
])

//download attachments
taskRouter.get('/attachment/:fileKey', [
    catchAsync(UploadServices.downloadTaskAttachment),
    catchAsync(taskControllers.downloadAttachment)
])

// update task status
taskRouter.put('/update/status/:id', [
    catchAsync(taskControllers.updateTaskStatus)
])

// update task
taskRouter.put('/update/:id', [
    catchAsync(taskControllers.updateTask)
])

// add a comment to a task
taskRouter.put('/add/comment/:id', [
    catchAsync(taskControllers.addCommentToTask)
])

// get tasks by userId and lesson id 
taskRouter.get('/shapers/:userid/lesson/:lessonid', [
    catchAsync(taskControllers.getTasksByUserAndLesson)
])
// get tasks by userId and lesson id and status
taskRouter.get('/shapers/:userid/lesson/:lessonid/status/:status', [
    catchAsync(taskControllers.getTasksByUserAndLessonAndStatus)
])

// get tasks by userId and project id
taskRouter.get('/shapers/:userid/project/:projectid', [
    catchAsync(taskControllers.getTasksByUserAndProject)
])


export default router.use('/tasks',
    // AuthMiddlewares.auth,
    taskRouter)
