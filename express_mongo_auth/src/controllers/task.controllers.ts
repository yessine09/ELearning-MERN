import { IAttachment } from "../models/projectModels/Task";
import taskServices from "../services/task.services";
import UploadServices from "../services/upload.services";
import { HttpStatus } from "../types";

export default class taskControllers {
    static async addTask(req: any, res: any, next: any) {
        const userid = req.params;
        const task = req.body;
        const payload = await taskServices.addTask(task, userid);
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            data: payload,
        })

    }

    static async getlessonByid(req: any, res: any, next: any) {
        const lessonid = req.params.id;
        const payload = await taskServices.getTaskById(lessonid);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }


    static async getTasksByLesson(req: any, res: any, next: any) {
        const lessonid = req.params.id;
        const payload = await taskServices.getTasksByLesson(lessonid);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    static async getTasksByClient(req: any, res: any, next: any) {
        const userid = req.params.id;
        const payload = await taskServices.getTasksByClient(userid);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    static async getTasksByClientAndStatus(req: any, res: any, next: any) {
        const userid = req.params.id;
        const status = req.params.status;
        const payload = await taskServices.getTasksByClientAndStatus(userid, status);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    static async getTasksByProject(req: any, res: any, next: any) {
        const projectid = req.params.id;
        const payload = await taskServices.getTasksByProject(projectid);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })
    }


    static async addAttachmentToTask(req: any, res: any, next: any) {
        const taskid = req.params.id;
        const { name, fileKey } = await UploadServices.uploadTaskAttachments(req, res);
        const attachment: IAttachment = {
            name,
            fileKey,
        };
        const payload = await taskServices.addAttachment(taskid, attachment);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }


    //update task status
    static async updateTaskStatus(req: any, res: any, next: any) {
        const taskid = req.params.id;
        const status = req.body.status;
        const payload = await taskServices.updateTaskStatus(taskid, status);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    //update task 
    static async updateTask(req: any, res: any, next: any) {
        const taskid = req.params.id;
        const task = req.body;
        const payload = await taskServices.updateTask(taskid, task);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    // add a comment to task
    static async addCommentToTask(req: any, res: any, next: any) {
        const taskid = req.params.id;
        const comment = req.body;
        const payload = await taskServices.addCommentToTask(taskid, comment);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    // get tasks by lesson id and user id 
    static async getTasksByUserAndLesson(req: any, res: any, next: any) {
        const lessonid = req.params.lessonid;
        const userid = req.params.userid;
        const payload = await taskServices.getTasksByUserAndLesson(lessonid, userid);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    // download task attachment 
    static async downloadAttachment(req: any, res: any, next: any) {
        const attachmentid = req.params.fileKey;
        const payload = await taskServices.downloadAttachment(attachmentid);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    // get task by user id , lesson id and status
    static async getTasksByUserAndLessonAndStatus(req: any, res: any, next: any) {
        const lessonid = req.params.lessonid;
        const userid = req.params.userid;
        const status = req.params.status;
        const payload = await taskServices.getTasksByUserAndLessonAndStatus(lessonid, userid, status);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    // add user attachement to task and update task status
    static async addUserAttachmentToTask(req: any, res: any, next: any) {
        const taskid = req.params.id;
        const { name, fileKey } = await UploadServices.uploadTaskAttachments(req, res);
        const attachment: IAttachment = {
            name,
            fileKey,
        };
        const payload = await taskServices.addUserAttachmentToTask(taskid, attachment);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

    // get task by user id and projet id
    static async getTasksByUserAndProject(req: any, res: any, next: any) {
        const projectid = req.params.projectid;
        const userid = req.params.userid;
        const payload = await taskServices.getTasksByUserAndProject(userid, projectid);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload,
        })

    }

}
