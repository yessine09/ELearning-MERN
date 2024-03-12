import { Router, Response } from 'express'
import { validate } from '../middleware'
import { catchAsync } from '../utils'
import ProgramValidators from '../validators/program.validators'
import ProgramControllers from '../controllers/program.controllers'
import multer from 'multer';
import { multerConfig } from '../config/multerConfig';
const uploadAttachment = multer(multerConfig);
const router = Router()
const programRouter = Router()

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

//create new program
programRouter.post('/create', [
    validate(ProgramValidators.createProgram),
    catchAsync(ProgramControllers.createNewProgram),
])

//get a program by id
programRouter.get('/list/:id', [
    catchAsync(ProgramControllers.getProgramById),
])

//get all programs
programRouter.get('/list', [
    catchAsync(ProgramControllers.getAllPrograms),
])

//update a program
programRouter.put('/list/:id', [
    validate(ProgramValidators.updateProgram),
    catchAsync(ProgramControllers.updateProgram)
])


//delete a program
programRouter.delete('/list/:id', [
    catchAsync(ProgramControllers.deleteProgram),
])

//add a lesson to a specific week of a given program
programRouter.post('/:programid/weeks/:weekid', [
    // validate(ProgramValidators.addLessonToProgram),
    catchAsync(ProgramControllers.addLessonsToProgram)
])

// add a new lesson
programRouter.post('/list/lessons', [
    validate(ProgramValidators.addNewLesson),
    catchAsync(ProgramControllers.createLesson)
])

//add a week in a program
programRouter.put('/list/:id/weeks/add', [
    validate(ProgramValidators.addWeekToProgram),
    catchAsync(ProgramControllers.addWeekToProgram)
])


//get all lessons of a given program
programRouter.get('/list/:id/lessons',
    catchAsync(ProgramControllers.getAllLessonsFromProgram)
);

//get all weeks in a given program

// get all lessons in a week of a given program
programRouter.get('/list/:id/week/:week', [
    catchAsync(ProgramControllers.getAllLessonsInWeek)
])

// update a lesson in a program
programRouter.put('/list/lessons/:lessonId', [
    validate(ProgramValidators.updateLesson),
    catchAsync(ProgramControllers.updateLessonInProgram)
])

// delete a lesson from a program
programRouter.delete('/list/:id/weeks/:week/lessons/:lessonId', [
    catchAsync(ProgramControllers.deleteLessonFromWeek)
])

/// upload task attachments
programRouter.post('/list/lessons/upload/:lessonId', [
    uploadAttachment.single('attachment'),
    catchAsync(ProgramControllers.uploadLessonAttachment)
])

// download task attachments
programRouter.get('/list/lessons/download/:fileKey', [
    catchAsync(ProgramControllers.downloadLessonAttachment)
])

// Get the active shapers of a mentor on a specified program
programRouter.get('/mentor/list/:programId', [
    catchAsync(ProgramControllers.getActiveShapersByProgramAndMentor)
])

// get a lesson by id 
programRouter.get('/list/lessons/:id', [
    catchAsync(ProgramControllers.getLessonById)
])



//TODO : add an authorization check to all routes
export default router.use('/program',
    // AuthMiddlewares.auth,
    programRouter)


