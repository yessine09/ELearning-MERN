import mongoose, { Types } from "mongoose";
import { DAOProgram, DAOLesson, lessonModel } from "../models";
import { ILesson } from "../models/programModels/lesson";
import { IProgram, IWeek } from "../models/programModels/program";
import { pick } from "lodash";

export default class programServices {
    //how to create a new program
    static async createProgram(program: IProgram, weeks: any[], userId: string) {
        const weeksResult: { lessons: string[] | null; }[] = [];

        for (let i = 0; i < weeks.length; i++) {
            if (weeks[i].lessons.length > 0) {
                const result = await DAOLesson.createManyLessons(weeks[i].lessons);
                weeksResult.push({
                    lessons: result!.map((element) => element.id)
                });
            }
        }

        const newProgram: IProgram | any = {
            ...pick(program, ["title", "description", "status"]),
            createdBy: new mongoose.Types.ObjectId(userId),
            weeks: weeksResult.map((weekResult, index) => ({
                index: index + 1,
                start: new Date(Date.now() + index * 7 * 24 * 60 * 60 * 1000), // adjust the start of the week
                end: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000), // adjust the end of the week
                lessons: (weekResult.lessons as string[] | ILesson[])
            }))
        };
        const result = await DAOProgram.createProgram(newProgram, userId);
        return { programId: result?.id };
    }

    //update a program info

    static async updateProgram(programId: string, program: IProgram): Promise<IProgram | null> {
        const result = await DAOProgram.updateProgram(programId, program);
        return result;
    }

    //delete a program

    static async deleteProgram(programId: string): Promise<IProgram | null> {
        const result = await DAOProgram.deleteProgram(programId);
        return result;
    }

    //get a program by Id
    static async getProgramById(programId: string): Promise<IProgram | null> {
        const result = await DAOProgram.getProgramById(programId);
        return result;
    }

    //get all programs
    static async getAllPrograms(): Promise<Array<IProgram> | null> {
        const result = await DAOProgram.getAllPrograms();
        return result;
    }

    //add lessons to a specific week in a program
    static async addLessonsToProgram(programId: string, week: string, lesson: string): Promise<IProgram | null> {
        const result = await DAOProgram.addLessonToWeek(programId, week, lesson);
        return result;
    }

    //add week to a program
    static async addWeekToProgram(programId: string, week: IWeek): Promise<IProgram | null> {
        const result = await DAOProgram.addWeekToProgram(programId, week);
        return result;
    }


    //delete lesson from a specific week in a program
    static async deleteLessonFromWeek(programId: string, week: string, lesson: string): Promise<IProgram | null> {
        const result = await DAOProgram.deleteLessonFromProgram(programId, week, lesson);
        return result;
    }

    //get all lessons in a program
    static async getAllLessonsFromProgram(programId: string): Promise<any[] | null> {
        const result = await DAOProgram.getAllLessonsFromProgram(programId);
        return result;
    }

    // update a lesson 
    static async updatelesson(lessonId: string, lesson: ILesson): Promise<ILesson | null> {
        const result = await DAOLesson.updateLesson(lessonId, lesson);
        return result;
    }

    //get all lessons in a week
    static async getAllLessonsInWeek(programId: string, weekId: string): Promise<ILesson[] | null> {
        const result = await DAOProgram.getAllLessonsInWeek(programId, weekId);
        return result;
    }

    //get all lessons 
    static async getAllLessons(): Promise<ILesson[] | null> {
        const result = await DAOLesson.getAllLessons();
        return result;
    }

    //update a lesson in a week from a program
    static async updateLesson(lessonId: string, lesson: ILesson): Promise<lessonModel.ILesson | null> {
        // Remove trailing newline character from lessonId
        lessonId = lessonId.replace(/\n$/, "");
        const updatedLesson = await lessonModel.default.findByIdAndUpdate(lessonId, lesson, { new: true });
        return updatedLesson;
    }

    // create new lesson 
    static async createNewLesson(lesson: ILesson): Promise<lessonModel.ILesson | null> {
        const createdLesson = await lessonModel.default.create(lesson);
        return createdLesson;
    }

    // asign a mentor to a program 
    static async asignMentorToProgram(programId: string, mentorId: string): Promise<IProgram | null> {
        const result = await DAOProgram.assignMentorToProgram(programId, mentorId);
        return result;
    }

    // get a lesson by id
    static async getLessonById(lessonId: string): Promise<lessonModel.ILesson | null> {
        const result = await lessonModel.default.findById(lessonId);
        return result;
    }

}
