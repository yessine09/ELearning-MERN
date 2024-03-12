import { DAOEnrollment, DAOProgram } from "../models";
import { enrollmentModel, programModel } from "../models/index";
import { ProfileTypes } from "../types";

export default class enrollmentServices {

    static async createNewEnrollment(enrollment: enrollmentModel.IEnrollment): Promise<enrollmentModel.IEnrollment | null> {
        const newEnrollment = await DAOEnrollment.createEnrollment(enrollment);
        await DAOProgram.addEnrollmentToProgram(enrollment.program.toString(), newEnrollment?._id);
        return newEnrollment;
    }

    static async getEnrollmentById(id: string): Promise<enrollmentModel.IEnrollment | null> {
        return await DAOEnrollment.getEnrollmentById(id);
    }

    static async getEnrollmentByClientId(clientId: string): Promise<enrollmentModel.IEnrollment[] | null> {
        return await DAOEnrollment.getEnrollmentsByClientId(clientId);
    }

    static async getEnrollmentByMentorId(mentorId: string): Promise<enrollmentModel.IEnrollment[] | null> {
        return await DAOEnrollment.getEnrollmentsByMentorId(mentorId);
    }

    static async getEnrollmentByPartnerId(partnerId: string): Promise<enrollmentModel.IEnrollment[] | null> {
        return await DAOEnrollment.getEnrollmentsByPartnerId(partnerId);
    }

    static async getEnrollmentsByProgramid(programId: string): Promise<enrollmentModel.IEnrollment[] | null> {
        return await DAOEnrollment.getEnrollmentsByProgramId(programId);
    }

    static async getAllEnrollments(): Promise<enrollmentModel.IEnrollment[] | null> {
        return await DAOEnrollment.getAllEnrollments();
    }

    static async updateEnrollment(enrollmentId: string, enrollment: enrollmentModel.IEnrollment): Promise<enrollmentModel.IEnrollment | null> {
        return await DAOEnrollment.updateEnrollment(enrollmentId, enrollment);
    }

    static async deleteEnrollment(enrollmentId: string): Promise<enrollmentModel.IEnrollment | null> {
        return await DAOEnrollment.deleteEnrollment(enrollmentId);
    }

    static async addMentorToEnrollment(mentorId: string, enrollmentId: string): Promise<enrollmentModel.IEnrollment | null> {
        return await DAOEnrollment.addMentorToEnrollment(mentorId, enrollmentId);
    }

    static async addPartnerToEnrollment(partnerId: string, enrollmentId: string): Promise<enrollmentModel.IEnrollment | null> {
        return await DAOEnrollment.addPartnerToEnrollment(partnerId, enrollmentId);
    }

    static async updateStatusOfEnrollment(enrollmentId: string, status: string): Promise<enrollmentModel.IEnrollment | null> {
        return await DAOEnrollment.updateStatusOfEnrollment(enrollmentId, status);
    }

    static async getShaperActiveEnrollments(shaperId: string): Promise<enrollmentModel.IEnrollment[] | null> {
        return await DAOEnrollment.getActiveEnrollmentsByShaper(shaperId);
    }

    static async getMentorActiveEnrollments(mentorId: string): Promise<enrollmentModel.IEnrollment[] | null> {
        return await DAOEnrollment.getActiveEnrollmentsByMentor(mentorId);
    }

    static async getUserActiveEnrollmentByProgram(userId: string, programId: string): Promise<enrollmentModel.IEnrollment | null> {
        return await DAOEnrollment.getActiveEnrollmentByUserAndProgram(userId, programId);
    }
}