import { DAOEnrollment, DAOMentor, DAOProgram } from "../models";
import { mentorModel } from "../models/index";

export default class mentorServices {

    static async getMentorById(mentorId: string): Promise<mentorModel.IMentor | null> {
        return await DAOMentor.getMentorById(mentorId);
    }

    static async getMentorByUserId(mentorId: string): Promise<mentorModel.IMentor | null> {
        return await DAOMentor.getMentorByUserId(mentorId);
    }

    static async getActiveShapersToMyProgram(mentorId: string, programId: string) {
        const program = await DAOProgram.getProgramById(programId);
        const enrollments = await DAOEnrollment.getActiveEnrollmentsByProgramAndMentorId(programId, mentorId);
        const shapers = enrollments?.map((element) => element.client);
        return {
            program: program,
            shapers: shapers
        }
    }
}