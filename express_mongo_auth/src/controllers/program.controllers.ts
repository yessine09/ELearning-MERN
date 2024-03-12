import express from 'express'
import { HttpStatus } from '../types';
import { MentorServices, ProgramServices } from '../services';
import UploadServices from '../services/upload.services';
import { CustomRequest } from '../middleware/auth.middleware';
export default class ProgramController {
    //crerate new program
    static async createNewProgram(req: CustomRequest, res: express.Response) {
        req.body.createdBy = req.userId;
        const payload = await ProgramServices.createProgram(req.body, req.body.weeks, req.userId)
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            data: payload,
        })
    }
    // Update program
    static async updateProgram(req: CustomRequest, res: express.Response) {
        let programId = req.params.id;
        let program = req.body;
        const payload = await ProgramServices.updateProgram(programId, program)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }
    //delete program
    static async deleteProgram(req: CustomRequest, res: express.Response) {
        const payload = await ProgramServices.deleteProgram(req.params.id)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }
    //get program by id
    static async getProgramById(req: CustomRequest, res: express.Response) {
        const payload = await ProgramServices.getProgramById(req.params.id);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }
    //get all programs
    static async getAllPrograms(req: CustomRequest, res: express.Response) {
        const payload = await ProgramServices.getAllPrograms();
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }
    // add a week to a program
    static async addWeekToProgram(req: CustomRequest, res: express.Response) {
        let programId = req.params.id
        let week = req.body
        const payload = await ProgramServices.addWeekToProgram(programId, week)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }


    // add a lesson to a specific week of a given program
    static async addLessonsToProgram(req: CustomRequest, res: express.Response) {
        let weekId = req.params.weekid
        let programId = req.params.programid
        let lesson = req.body.lessonid
        const payload = await ProgramServices.addLessonsToProgram(programId, weekId, lesson)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }
    // get  All lesson from a program 
    static async getAllLessonsFromProgram(req: CustomRequest, res: express.Response) {
        const payload = await ProgramServices.getAllLessonsFromProgram(req.params.id)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }

    static async getAllLessonsInWeek(req: CustomRequest, res: express.Response) {
        const payload = await ProgramServices.getAllLessonsInWeek(req.params.id, req.params.week)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }

    // get all lessons
    static async getAllLessons(req: CustomRequest, res: express.Response) {
        const payload = await ProgramServices.getAllLessons()
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }

    // update a lesson
    static async updateLesson(req: CustomRequest, res: express.Response
    ) {
        const { lessonId } = req.params
        let lesson = req.body
        const payload = await ProgramServices.updatelesson(lessonId, lesson)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }

    static async updateLessonInProgram(req: CustomRequest, res: express.Response) {
        const { lessonId } = req.params
        let lesson = req.body
        const payload = await ProgramServices.updateLesson(lessonId, lesson)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    // create a new lesson
    static async createLesson(req: CustomRequest, res: express.Response) {
        const payload = await ProgramServices.createNewLesson(req.body)
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            data: payload,
        })
    }

    // delete a lesson from a week
    static async deleteLessonFromWeek(req: CustomRequest, res: express.Response) {
        const payload = await ProgramServices.deleteLessonFromWeek(req.params.id, req.params.week, req.params.lessonId)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }

    // asign a mentor to a program
    static async assignMentorToProgram(req: CustomRequest, res: express.Response) {
        console.log('assigning mentor to program')
        const payload = await ProgramServices.asignMentorToProgram(req.params.id, req.params.mentorId)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }

    // upload lesson attachment
    static async uploadLessonAttachment(req: CustomRequest, res: express.Response) {
        const payload = await UploadServices.uploadLessonsAttachments(req, res)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }

    // get lesson attachment
    static async downloadLessonAttachment(req: CustomRequest, res: express.Response) {
        const payload = await UploadServices.downloadLessonsAttachment(req, res)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }

    //get Active shapers by mentorId and programId
    static async getActiveShapersByProgramAndMentor(req: CustomRequest, res: express.Response) {
        const payload = await MentorServices.getActiveShapersToMyProgram(req.userId, req.params.programId)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    //get a lesson by id
    static async getLessonById(req: CustomRequest, res: express.Response) {
        const payload = await ProgramServices.getLessonById(req.params.id)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }
}
