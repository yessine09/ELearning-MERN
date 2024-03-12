import { Schema } from 'mongoose';
import { enrollmentModel } from '../index';
import { IEnrollment } from '../programModels/enrollment';

export default class DAOEnrollment {

    static async createEnrollment(enrollment: IEnrollment): Promise<IEnrollment | null> {
        return await enrollmentModel.default.create(enrollment);
    }

    static async getEnrollmentById(id: string): Promise<IEnrollment | null> {
        return await enrollmentModel.default.findById(id);
    }

    static async getEnrollmentsByProgramId(programId: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({ program: new Schema.Types.ObjectId(programId) }).populate("client").populate("mentor").populate("partner").exec();
    }

    static async getEnrollmentsByClientId(clientId: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({ client: new Schema.Types.ObjectId(clientId) }).populate("program").populate("mentor").populate("partner").exec();
    }

    static async getEnrollmentsByMentorId(mentorId: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({ mentor: new Schema.Types.ObjectId(mentorId) }).populate("program").populate("client").populate("partner").exec();
    }

    static async getEnrollmentsByPartnerId(partnerId: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({ partner: new Schema.Types.ObjectId(partnerId) }).populate("program").populate("client").populate("mentor").exec();
    }

    static async getEnrollmentsByStatus(status: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({ status }).populate("program").populate("client").populate("mentor").populate("partner").exec();
    }

    static async getEnrollmentsByProgramAndStatus(programId: string, status: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({ program: new Schema.Types.ObjectId(programId), status }).populate("program").populate("client").populate("mentor").populate("partner").exec();
    }

    static async getEnrollmentsByProgramAndClientId(programId: string, clientId: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({ program: new Schema.Types.ObjectId(programId), client: new Schema.Types.ObjectId(clientId) }).populate("program").populate("client").populate("mentor").populate("partner").exec();
    }

    static async getEnrollmentsByProgramAndMentorId(programId: string, mentorId: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({ program: new Schema.Types.ObjectId(programId), mentor: new Schema.Types.ObjectId(mentorId) }).populate("program").populate("client").populate("mentor").populate("partner").exec();
    }

    static async getActiveEnrollmentsByProgramAndMentorId(programId: string, mentorId: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({ program: new Schema.Types.ObjectId(programId), mentor: new Schema.Types.ObjectId(mentorId), status: "active" }).populate("program").populate("client").populate("mentor").populate("partner").exec();
    }

    static async getEnrollmentsByProgramAndPartnerId(programId: string, partnerId: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({ program: new Schema.Types.ObjectId(programId), partner: new Schema.Types.ObjectId(partnerId) }).populate("program").populate("client").populate("mentor").populate("partner").exec();
    }

    static async getAllEnrollments(): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find().populate("program").populate("client").populate("mentor").populate("partner").exec();
    }

    static async updateEnrollment(id: string, enrollment: IEnrollment): Promise<IEnrollment | null> {
        return await enrollmentModel.default.findByIdAndUpdate(id, enrollment, { new: true });
    }

    static async deleteEnrollment(id: string): Promise<IEnrollment | null> {
        return await enrollmentModel.default.findByIdAndDelete(id);
    }

    static async addMentorToEnrollment(enrollmentId: string, mentorId: string): Promise<IEnrollment | null> {
        return await enrollmentModel.default.findByIdAndUpdate(enrollmentId, { $set: { mentor: new Schema.Types.ObjectId(mentorId) } }, { new: true });
    }

    static async addPartnerToEnrollment(enrollmentId: string, partnerId: string): Promise<IEnrollment | null> {
        return await enrollmentModel.default.findByIdAndUpdate(enrollmentId, { $set: { partner: new Schema.Types.ObjectId(partnerId) } }, { new: true });
    }

    static async updateStatusOfEnrollment(enrollmentId: string, status: string): Promise<IEnrollment | null> {
        return await enrollmentModel.default.findByIdAndUpdate(enrollmentId, { $set: { status } }, { new: true });
    }

    static async getActiveEnrollmentsByShaper(shaperId: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({
            client: shaperId,
            status: "active"
        }).populate("program").populate("mentor").exec();
    };

    static async getActiveEnrollmentsByMentor(mentorId: string): Promise<IEnrollment[] | null> {
        return await enrollmentModel.default.find({
            mentor: mentorId,
            status: "active"
        }).populate("program").populate("client").exec();
    };

    static async getActiveEnrollmentByUserAndProgram(userId: string, programId: string): Promise<IEnrollment | null> {
        return await enrollmentModel.default.findOne({
            client: userId,
            program: programId,
            status: "active"
        }).populate("program").populate("mentor").exec();
    }
}
