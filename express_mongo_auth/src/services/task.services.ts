import { DAOTask } from "../models";
import { IAttachment, IComment } from "../models/projectModels/Task";

export default class taskServices {
    static async addTask(task: any, projectid: string): Promise<any> {
        const result = await DAOTask.assignTaskToUser(task, projectid);
        return result;
    }

    static async getTaskById(taskid: string): Promise<any> {
        const result = await DAOTask.getTaskById(taskid);
        return result;
    }

    // get taks by lesson id
    static async getTasksByLesson(lessonid: string): Promise<any> {
        const result = await DAOTask.getTasksByLesson(lessonid);
        return result;
    }

    // get tasks by client id
    static async getTasksByClient(userid: string): Promise<any> {
        const result = await DAOTask.getTasksByClient(userid);
        return result;
    }

    // get tasks by client id and status
    static async getTasksByClientAndStatus(userid: string, status: string): Promise<any> {
        const result = await DAOTask.getTasksByClientAndStatus(userid, status);
        return result;
    }

    // get tasks from project by project id
    static async getTasksByProject(projectid: string): Promise<any> {
        const result = await DAOTask.getTasksByProject(projectid);
        return result;
    }

    // add attachment to task by task id
    static async addAttachment(taskid: string, attachment: IAttachment): Promise<any> {
        const result = await DAOTask.addAttachment(taskid, attachment);
        return result;

    }

    //download attachment by attchment id
    static async downloadAttachment(attachmentid: string): Promise<any> {
        const result = await DAOTask.downloadAttachment(attachmentid);
        return result;
    }

    //update task status by task id
    static async updateTaskStatus(taskid: string, status: string): Promise<any> {
        const result = await DAOTask.updateTaskStatus(taskid, status);
        return result;
    }

    // update task by task id
    static async updateTask(taskid: string, task: any): Promise<any> {
        const result = await DAOTask.updateTask(taskid, task);
        return result;
    }

    // add a comment to a task
    static async addCommentToTask(taskid: string, comment: IComment): Promise<any> {
        const result = await DAOTask.addCommentToTask(taskid, comment);
        return result;
    }

    // get tasks by userId and lesson id
    static async getTasksByUserAndLesson(userid: string, lessonid: string): Promise<any> {
        const result = await DAOTask.getTasksByUserAndLesson(userid, lessonid);
        return result;
    }

    // get tasks by userId and lesson id and status
    static async getTasksByUserAndLessonAndStatus(userid: string, lessonid: string, status: string): Promise<any> {
        const result = await DAOTask.getTasksByUserAndLessonAndStatus(userid, lessonid, status);
        return result;
    }

    // add attachment to task by task id from the user
    static async addUserAttachmentToTask(taskid: string, attachment: IAttachment): Promise<any> {
        const result = await DAOTask.addUserAttachmentToTaskAndChangeStatus(taskid, attachment);
        return result;
    }

    static async getTasksByUserAndProject(userid: string, projectid: string): Promise<any> {
        const result = await DAOTask.getTasksByUserAndProject(userid, projectid);
        return result;
    }
}