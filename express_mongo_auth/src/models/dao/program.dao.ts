import mongoose from 'mongoose';
import { DAOUser, lessonModel, programModel } from '../index';
import Lesson, { ILesson } from '../programModels/lesson';
import Program, { IProgram, IWeek } from '../programModels/program';
import { sendEmail } from '../../services';
import { config } from '../../config';

export default class DAOProgram {

    static async createProgram(program: programModel.IProgram, userId: string): Promise<programModel.IProgram | null> {
        const createdProgram = await programModel.default.create(program);
        return createdProgram;
    }

    static async updateProgram(programId: string, program: programModel.IProgram): Promise<programModel.IProgram | null> {
        return await programModel.default.findByIdAndUpdate(programId, program, { new: true });
    }

    static async deleteProgram(programId: string) {
        return await programModel.default.findByIdAndDelete(programId);
    }

    //add a week to the program
    static async addWeekToProgram(programId: string, week: IWeek): Promise<programModel.IProgram | null> {
        return await programModel.default.findByIdAndUpdate(programId, { $push: { weeks: week } }, { new: true }).exec();
    }
    static async getAllLessonsInWeek(programId: string, weekIndex: string): Promise<ILesson[] | null> {
        console.log(programId, weekIndex)
        const program = await programModel.default.findById(programId);
        if (!program) {
            console.log("Program not found");
            return null;
        }

        const week = await Program.findOne({ "weeks._id": weekIndex }, { "weeks.$": 1 }).exec();
        if (!week) {
            console.log("Week not found");
            return null;
        }

        const lessonIds = week.weeks?.[0].lessons?.map((lessonId: any) => lessonId) || [];
        // console.log(lessonIds)

        const lessons = await Lesson.find({
            _id: { $in: lessonIds },
            isDeleted: { $ne: true } // Exclude the deleted lessons
        });
        return lessons;
    }


    static async addLessonToWeek(programId: string, weekIndex: string, lessonId: string): Promise<programModel.IProgram | null> {
        const program = await programModel.default.findById(programId);
        if (!program) {
            console.log("Program not found");
            return null;
        }
        const weekIds: string[] = program.weeks.map((week) => week._id.toString()) || [];
        if (!weekIds.includes(weekIndex)) {
            console.log("Week not found in program");
            return null;
        }
        const weekIndexToUpdate = program.weeks.findIndex((week) => week._id.toString() === weekIndex);
        if (weekIndexToUpdate === -1) {
            console.log("Week not found in program");
            return null;
        }
        const lesson: ILesson | null = await Lesson.findById(lessonId);
        if (!lesson) {
            console.log("Lesson not found");
            return null;
        }
        program.weeks![weekIndexToUpdate].lessons.push(lesson);
        const updatedProgram = await program.save();
        return updatedProgram;
    }






    static async getProgramById(programId: string): Promise<programModel.IProgram | null> {
        return await programModel.default.findById(programId).populate("createdBy", "firstName lastName")
            .populate("weeks.lessons", "title description")
            .exec();

    }

    static async getAllPrograms(): Promise<programModel.IProgram[] | null> {
        return await programModel.default.find().populate("createdBy", "firstName lastName")
            .populate("weeks.lessons"
            )
            .exec();;
    }

    static async getProgramsByUserId(userId: string): Promise<programModel.IProgram[] | null> {
        return await programModel.default.find({ createdBy: new mongoose.Types.ObjectId(userId) }).populate("createdBy", "firstName lastName")
            .populate("weeks.lessons"
            )
            .exec();;
    }

    static async deleteLessonFromProgram(programId: string, weekIndex: string, lessonId: string): Promise<programModel.IProgram | null> {
        console.log(programId,);
        const program = await programModel.default.findById(programId);
        if (!program) {
            console.log("Program not found");
            return null;
        }
        const week = program.weeks?.find((w) => w._id === weekIndex);
        if (!week) {
            console.log("Week not found");
            return null;
        }

        const lessons = await DAOProgram.getAllLessonsInWeek(programId, weekIndex);
        if (!lessons) {
            console.log("Lessons not found");
            return null;
        }

        const lessonIdsInWeek = await Promise.all(lessons.map((lesson) => lesson._id.toString()));
        if (lessonIdsInWeek.includes(lessonId)) {
            console.log("Lesson already exists in this week");
            const lesson = await Lesson.findByIdAndDelete(lessonId);
            console.log(lesson)
            if (!lesson) {
                console.log("Lesson not found");
                return null;
            }
            //delete the lesson from the list
            week.lessons?.splice(lessonIdsInWeek.indexOf(lessonId), 1);
            await program.save();
            return program;
        } else {
            return null;
        }

    }

    static async getAllLessonsFromProgram(programId: string): Promise<any[] | null> {
        return (await programModel.default.findOne({ _id: new mongoose.Types.ObjectId(programId) }).populate("weeks.lessons").exec())?.weeks!;
    }

    //update lesson in a program
    static async updateLesson(programId: string, lessonId: string, lesson: ILesson): Promise<any | null> {
        try {
            const program = await Program.findById(programId);
            if (!program) {
                console.log("Program not found");
                return null;
            }

            // Update program title
            program.title = "New Program Title";

            if (!program.weeks) {
                console.log("Program has no weeks");
                return null;
            }
            console.log(program.weeks)
            const lessonIndex = program.weeks.findIndex((week) =>
                week.lessons.findIndex((lesson: any) => lesson._id === lessonId) == -1
            );

            console.log(lessonIndex);
            if (lessonIndex === -1) {
                console.log("Lesson not found in program");
                return null;
            }

            const weekIndex = program.weeks[lessonIndex]._id;
            console.log("Week Index: ", weekIndex);
            const lessonIds = program.weeks[lessonIndex].lessons.map((l: { toString: () => any; }) => l.toString());
            console.log("Lesson Ids: ", lessonIds);
            console.log(lessonIds.indexOf(lessonId))
            console.log(lessonIndex)
            const updatedWeek = await Program.findOneAndUpdate(
                {
                    programId,
                    "weeks.index": weekIndex,
                    "weeks.lessons._id": lessonId
                },
                {
                    $set: { "weeks.lessons": lesson }
                },
                {
                    new: true,
                    arrayFilters: [
                        { "week._id": weekIndex },
                        { "lesson._id": lessonId }
                    ]
                }
            );


            console.log(updatedWeek)
            if (!updatedWeek) {
                console.log("Update Failed");
                return null;
            }

            return updatedWeek;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    //get lesson by id from program
    static async getLessonById(programId: string, lessonId: string): Promise<ILesson | null> {
        const program = await programModel.default.findById(programId);
        if (!program) {
            console.log("Program not found");
            return null;
        }
        //get the lesson by id if the program exists using populate
        const lesson = await programModel.default.findOne({ _id: new mongoose.Types.ObjectId(programId) }).populate("weeks.lessons").exec();
        if (!lesson) {
            console.log("Lesson not found");
            return null;
        }
        return lesson.id

    }

    // asign a mentor to a program
    static async assignMentorToProgram(programId: string, mentorId: string): Promise<programModel.IProgram | null> {

        const updatedProgram = await Program.findOneAndUpdate(
            { _id: programId },
            { mentor: mentorId },
            { new: true }
        )


        const program = await DAOProgram.getProgramById(programId)
        const user = await DAOUser.getUserById(mentorId)
        sendEmail({
            to: user?.email,
            from: config.emailSender,
            subject: 'user created',
            text: `${user?.firstName} ${user?.lastName} you are assigned to program ${program?.title} `,
            html: undefined
        })

        console.log(updatedProgram);
        return updatedProgram;
    }

    static async addEnrollmentToProgram(programId: string, enrollmentId: string): Promise<programModel.IProgram | null> {
        const updatedProgram = await Program.findOneAndUpdate(
            { _id: programId },
            { $push: { enrollments: enrollmentId } },
            { new: true }
        );
        console.log(updatedProgram);
        return updatedProgram;

    }
}