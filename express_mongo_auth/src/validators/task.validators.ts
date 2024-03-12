import Joi from 'joi';
const task = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
    assignedTo: Joi.string().required()
});
export class TaskValidators {
    static createTask = {
        body: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            dueDate: Joi.date().required(),
            lesson: Joi.string().required(),
            project: Joi.string().required(),
            status: Joi.string().valid('Open', 'InProgress', 'Review', 'Closed').default('Open'),
            assignedTo: Joi.string().allow(null).optional(),
            comments: Joi.array().items(
                Joi.object({
                    sender: Joi.string().required(),
                    content: Joi.string().required(),
                    date: Joi.date().required(),
                })
            ),
            attachments: Joi.array().items(
                Joi.object({
                    name: Joi.string().required(),
                    fileKey: Joi.string().required(),
                })
            ),
            userAttachments: Joi.array().items(
                Joi.object({
                    name: Joi.string().required(),
                    fileKey: Joi.string().required(),
                })
            ),
        }).unknown(),
    };

    static updateTask = {
        body: Joi.object().keys({
            title: Joi.string(),
            description: Joi.string(),
            dueDate: Joi.date(),
            assignedTo: Joi.string()
        }).unknown(),
    };
}
