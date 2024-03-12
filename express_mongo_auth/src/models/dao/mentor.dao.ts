import { mentorModel } from '../index';
export default class DAOMentor {
    static async createMentor(mentor: mentorModel.IMentor): Promise<mentorModel.IMentor | null> {
        return await mentorModel.Mentor.create(mentor);
    }

    static async getMentorById(mentorId: string): Promise<mentorModel.IMentor | null> {
        return await mentorModel.Mentor.findById(mentorId).populate("user");
    }

    static async getMentorByUserId(mentorId: string): Promise<mentorModel.IMentor | null> {
        return await mentorModel.Mentor.findOne({ user: mentorId }).populate("user");
    }
}