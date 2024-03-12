import Joi from 'joi';

const softSkillsSchema = Joi.object().keys({
    skill: Joi.string().required(),
});

const skillsetSchema = Joi.object().keys({
    skill: Joi.string().required(),
    level: Joi.string().valid('Beginner', 'Advanced', 'Medium').required(),
    isSoftSkill: Joi.boolean().required(),
});

const academicTrainingSchema = Joi.object().keys({
    local: Joi.string().required(),
    specialty: Joi.string().required(),
    degree: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    establishment: Joi.string().required(),
    student: Joi.boolean().required(),
});

const professionalExperienceSchema = Joi.object().keys({
    index: Joi.number().required(),
    company: Joi.string().required(),
    job: Joi.string().required(),
    local: Joi.string().required(),
    period: Joi.string().required(),
});

export default class ProfileValidators {
    static createAccount = {
        body: Joi.object().keys({
            clientId: Joi.string().required(),
            softSkills: Joi.object({
                data: Joi.array().items(softSkillsSchema).required(),
            }).required(),
            skillsets: Joi.object({
                data: Joi.array().items(skillsetSchema).required(),
            }).required(),
            studies: Joi.object({
                data: Joi.array().items(academicTrainingSchema).required(),
            }).required(),
            professional_experience: Joi.object({
                data: Joi.array().items(professionalExperienceSchema).required(),
            }).required(),
        }).unknown(),
    };
    static updateProfile = {
        body: Joi.object().keys({
            clientId: Joi.string().required(),
            softSkills: Joi.object({
                data: Joi.array().items(softSkillsSchema).required(),
            }),
            skillsets: Joi.object({
                data: Joi.array().items(skillsetSchema).required(),
            }),
            studies: Joi.object({
                data: Joi.array().items(academicTrainingSchema).required(),
            }),
            professional_experience: Joi.object({
                data: Joi.array().items(professionalExperienceSchema).required(),
            }),
        }).unknown(),
    };
    static updateBasicInfo = {
        body: Joi.object().keys({
            phone : Joi.string(),
            date_of_birth : Joi.date(),
            gender : Joi.string(),
            profession : Joi.string()
        }).unknown(),
    };
    static checkProfile = {
        body: Joi.object().keys({
            clientId: Joi.string().required(),
        }).unknown(),
    };

}

