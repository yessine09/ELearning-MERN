import { taskModel } from '../index';
import { IAttachment, IComment } from '../projectModels/Task';


export default class DAOTask {

    //create and assig task to user
    static async assignTaskToUser(task: taskModel.ITask, projectId: string): Promise<taskModel.ITask | null> {
        const newTask = await taskModel.Task.create(task);
        return newTask;
    }

    // get task by id
    static async getTaskById(taskid: string): Promise<any> {
        const task = await taskModel.Task.findById(taskid).exec();
        return task;
    }

    // get tasks by lesson id
    static async getTasksByLesson(lessonid: string): Promise<any> {
        const result = await taskModel.Task.find({ lesson: lessonid });
        return result;
    }

    // get tasks by client id
    static async getTasksByClient(userid: string): Promise<any> {
        const result = await taskModel.Task.find({ assignedTo: userid });
        return result;
    }

    // get tasks by client id and status
    static async getTasksByClientAndStatus(userid: string, status: string): Promise<any> {
        const result = await taskModel.Task.find({ assignedTo: userid, status: status });
        return result;
    }

    static async updateTaskStatus(taskId: string, status: string): Promise<taskModel.ITask | null> {
        const task = await taskModel.Task.findOneAndUpdate(
            { _id: taskId }, {
            $set: { status: status }
        }, {
            new: true
        }
        )
        return task;
    }

    static async addAttachmentToTask(taskId: string, nameDocument: string, url: string): Promise<taskModel.ITask | null> {
        return (await taskModel.Task.findByIdAndUpdate({
            _id: taskId
        }, {
            $push: {
                attachments: {
                    name: nameDocument,
                    url: url
                }
            }
        }, {
            new: true
        }))
    }

    static async getTasksByProjectAndFilterStatus(projectId: string, status: string): Promise<taskModel.ITask[] | null> {
        const tasks = await taskModel.Task.find({
            project: projectId,
            status: status
        });
        return tasks;
    }

    static async addCommentToTask(taskId: string, comment: IComment): Promise<taskModel.ITask | null> {
        return (await taskModel.Task.findByIdAndUpdate({
            _id: taskId
        }, {
            $push: {
                comments: {
                    sender: comment.sender,
                    content: comment.content,
                    date: new Date(),
                }
            },
        }, {
            new: true
        }).exec());
    }

    static async getTasksByProject(projectId: string): Promise<taskModel.ITask[] | null> {
        const tasks = await taskModel.Task.find({
            project: projectId
        });
        return tasks;
    }

    // add attachment to task by task id
    static async addAttachment(taskid: string, attachment: IAttachment): Promise<any> {
        const result = await taskModel.Task.findByIdAndUpdate({ _id: taskid }, { $push: { attachments: attachment } }).exec();
        return result;
    }

    // update task by task id
    static async updateTask(taskid: string, task: any): Promise<any> {
        const result = await taskModel.Task.findByIdAndUpdate({ _id: taskid }, { $set: task }).exec();
        return result;
    }

    // get task by lesson id and user id
    static async getTasksByUserAndLesson(lessonid: string, userid: string): Promise<any> {
        const result = await taskModel.Task.find({ lesson: lessonid, assignedTo: userid });
        return result;
    }

    // download Attachment by fileKey
    static async downloadAttachment(fileKey: string): Promise<any> {
        const result = await taskModel.Task.find({ "attachments.fileKey": fileKey });
        return result;
    }

    // get task by user id lesson id and status
    static async getTasksByUserAndLessonAndStatus(lessonid: string, userid: string, status: string): Promise<any> {
        const result = await taskModel.Task.find({ lesson: lessonid, assignedTo: userid, status: status });
        return result;
    }

    // add user  attachment to task and update task status to In Progress

    static async addUserAttachmentToTaskAndChangeStatus(taskid: string, attachment: IAttachment): Promise<any> {
        const result = await taskModel.Task.findByIdAndUpdate({ _id: taskid }, { $push: { userAttachments: attachment }, $set: { status: "In Progress" } }).exec();
        return result;
    }

    static async getTasksByUserAndProject(userid: string, projectid: string): Promise<any> {
        const result = await taskModel.Task.find({ assignedTo: userid, project: projectid });
        return result;
    }

}