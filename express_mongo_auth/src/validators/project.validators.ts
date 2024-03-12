import Joi from 'joi';

const comment = Joi.object().keys({
    sender: Joi.string().required(),
    content: Joi.string().required()
})

const attachment = Joi.object().keys({
    name: Joi.string(),
    url: Joi.string().required,
})

const task = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    lesson: Joi.string().required(),
    project: Joi.string().required(),
    status: Joi.string().required(),
    comment: Joi.array().items(comment),
    attachments: Joi.array().items(attachment)
})

export default class ProjectValidators {
    static createProject = {
        body: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            mentor: Joi.string().required(),
            user: Joi.string().required(),
            program: Joi.string().required(),
            status: Joi.string().required(),
            tasks: Joi.array().items(task)
        }).unknown(),
    };

    static getProjectByStatus = {
        body: Joi.object().keys({
            status: Joi.string().required(),
            projectId: Joi.string().required()
        })
    };

    static addTaskToProject = {
        body: Joi.object().keys({
            task: task.required(),
            projectId: Joi.string().required()
        })
    }
}

