import { projectModel, taskModel } from '../index';
import { Schema } from 'mongoose';
import Project, { IProject } from '../projectModels/project';

export default class DAOProject {

    static async createNewProject(project: projectModel.IProject): Promise<IProject | null> {
        const newProject = await Project.create(project)
        return newProject;
    }
    static async getProjectById(id: string): Promise<IProject | null> {
        const project = await Project.findById({ _id: id }).populate("tasks").populate("mentor").populate("program").exec();
        return project;
    }

    static async getAllProjects(): Promise<IProject[] | null> {
        const projects = await Project.find().populate("tasks").populate("mentor").populate("program").exec();
        return projects;
    }

    static async getProjectsByStatus(status: string): Promise<IProject[] | null> {
        const projects = await Project.find({ status: status });
        return projects;
    }

    static async getProjectsByClient(clientId: string): Promise<IProject[] | null> {
        const projects = await Project.find({ user: clientId }).populate("tasks").populate("program").exec();
        return projects;
    }

    static async getProjectsByClientAndStatus(clientId: string, status: string): Promise<IProject[] | null> {
        const projects = await Project.find({ user: clientId, status: status }).populate("tasks").populate("program").exec();
        return projects;
    }

    static async getTasksFromProject(projectId: string): Promise<taskModel.ITask[] | null> {
        const project = await Project.findById(new Schema.Types.ObjectId(projectId)).populate("tasks").exec();
        return (project!.tasks as taskModel.ITask[]);
    }

    static async getTasksFromProjectByStatus(projectId: string, status: string): Promise<taskModel.ITask[] | null> {
        const project = await Project.findOne(new Schema.Types.ObjectId(projectId)).populate({
            path: "tasks",
            match: { "tasks.status": status }
        }).exec();
        return (project!.tasks as taskModel.ITask[]);
    }

    static async updateProjectStatus(projectId: string, status: string): Promise<projectModel.IProject | null> {
        const project = await Project.findOneAndUpdate(
            {
                _id: new Schema.Types.ObjectId(projectId)
            }, {
            $set: {
                status: status
            }
        }, {
            new: true
        })
        return project;
    }

    static async deleteProject(projectId: string) {
        const project = await Project.findOneAndRemove({
            _id: new Schema.Types.ObjectId(projectId)
        })
        return project;
    }


}