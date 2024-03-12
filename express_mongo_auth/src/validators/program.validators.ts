import Joi from 'joi';

const lesson = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    documents: Joi.array().items(
        Joi.string()
    ),
    content: Joi.string().required(),
    video: Joi.string(),
    duration: Joi.number(),
    references: Joi.array().items(),
    keywords: Joi.array().items(
        Joi.string()
    ),
    challenges: Joi.array().items(Joi.string()),


})

export default class ProgramValidators {
    static createProgram = {
        body: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            status: Joi.string(),
            createdBy: Joi.string().required(),
            weeks: Joi.array().items(Joi.object().keys({
                start: Joi.string(),
                end: Joi.string(),
                lessons: Joi.array().items(lesson),
            })).required()
        }).unknown(),
    };
    static updateProgram = {
        body: Joi.object().keys({
            title: Joi.string(),
            description: Joi.string(),
            status: Joi.string(),
            weeks: Joi.array().items(Joi.object().keys({
                start: Joi.string(),
                end: Joi.string(),
                lessons: Joi.array().items(lesson),
            }))
        }).unknown(),
    };

    static addLessonToProgram = {
        body: Joi.object().keys({
            week: Joi.string().required(),
            lesson: Joi.string().required()
        }).unknown(),
    };

    static updateLesson = {
        body: Joi.object().keys({
            title: Joi.string(),
            description: Joi.string(),
            documents: Joi.array().items(
                Joi.string()
            ),
            content: Joi.string(),
            video: Joi.string(),
            duration: Joi.number(),
            references: Joi.array().items(),
            keywords: Joi.array().items(
                Joi.string()
            ),
            challenges: Joi.array().items(Joi.string()),
        }).unknown(),
    }

    // add a week 
    static addWeekToProgram = {
        body: Joi.object().keys({
            start: Joi.string().required(),
            end: Joi.string().required(),
            lessons: Joi.array().items(lesson),
        }).unknown(),
    }

    static addNewLesson = {
        body: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            documents: Joi.array().items(
                Joi.string()
            ),
            content: Joi.string().required(),
            video: Joi.string(),
            duration: Joi.number(),
            references: Joi.array().items(),
            keywords: Joi.array().items(
                Joi.string()
            ),
            challenges: Joi.array().items(Joi.string()),

        }).unknown(),
    }

    static assignMentor = {
        body: Joi.object()
            .keys({
                mentorId: Joi.string().required(),
            })
            .unknown(),
    }
}

