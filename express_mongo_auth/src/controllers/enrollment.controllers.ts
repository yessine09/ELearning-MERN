import { Response } from 'express'
import { HttpStatus } from '../types';
import { EnrollmentServices } from '../services';
import UploadServices from '../services/upload.services';
import { CustomRequest } from '../middleware/auth.middleware';
export default class EnrollmentController {

    static async createEnrollment(req: CustomRequest, res: Response) {
        const enrollment = await EnrollmentServices.createNewEnrollment(req.body);
        res.status(HttpStatus.CREATED).json({
            httpStatus: HttpStatus.CREATED,
            data: enrollment
        });
    }

    static async getAllEnrollment(req: CustomRequest, res: Response) {
        const enrollments = await EnrollmentServices.getAllEnrollments();
    }

    static async getEnrollmentById(req: CustomRequest, res: Response) {
        const enrollment = await EnrollmentServices.getEnrollmentById(req.params.id);
        res.status(HttpStatus.OK).json({
            httpStatus: HttpStatus.OK,
            data: enrollment
        });
    }

    static async updateEnrollmentById(req: CustomRequest, res: Response) {
        const enrollment = await EnrollmentServices.updateEnrollment(req.params.id, req.body);
        res.status(HttpStatus.OK).json({
            httpStatus: HttpStatus.OK,
            data: enrollment
        });
    }

    static async deleteEnrollmentById(req: CustomRequest, res: Response) {
        const enrollment = await EnrollmentServices.deleteEnrollment(req.params.id);
        res.status(HttpStatus.OK).json({
            httpStatus: HttpStatus.OK,
            data: enrollment
        });
    }

    static async getActiveEnrollmentByShaper(req: CustomRequest, res: Response) {
        const userid = req.params.userId
        const payload = await EnrollmentServices.getShaperActiveEnrollments(userid)
        res.status(HttpStatus.OK).json({
            HttpStatus: HttpStatus.OK,
            data: payload,
        })
    }

    static async getActiveEnrollmentByMentor(req: CustomRequest, res: Response) {
        const userid = req.params.mentorId
        const payload = await EnrollmentServices.getMentorActiveEnrollments(userid)
        res.status(HttpStatus.OK).json({
            HttpStatus: HttpStatus.OK,
            data: payload,
        })
    }

    static async getActiveEnrollmentByUserAndProgram(req: CustomRequest, res: Response) {
        const userid = req.params.userId
        const programid = req.params.programId
        const payload = await EnrollmentServices.getUserActiveEnrollmentByProgram(userid, programid)
        res.status(HttpStatus.OK).json({
            HttpStatus: HttpStatus.OK,
            data: payload,
        })
    }
}
