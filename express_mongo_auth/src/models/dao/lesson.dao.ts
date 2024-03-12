import { lessonModel } from '..';
import Lesson, { ILesson } from '../programModels/lesson';

export default class DAOLesson {
    static async createLesson(lesson: lessonModel.ILesson): Promise<lessonModel.ILesson | null> {
        const createdLesson = await lessonModel.default.create(lesson);
        return createdLesson;
    }

    // get all lessons from the database


    static async getAllLessons(): Promise<ILesson[]> {
        const lessons: ILesson[] = await Lesson.find();
        return lessons;
    }


    static async createManyLessons(lessons: lessonModel.ILesson[]): Promise<lessonModel.ILesson[] | null> {
        const createdLessons = await lessonModel.default.insertMany(lessons);
        return createdLessons;
    }

    static async updateLesson(lessonId: string, lesson: lessonModel.ILesson): Promise<lessonModel.ILesson | null> {
        const updatedLesson = await lessonModel.default.findByIdAndUpdate(lessonId, lesson, { new: true });
        return updatedLesson;
    }
}