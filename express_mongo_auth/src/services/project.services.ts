import mongoose from "mongoose";
import { DAOProject, DAOTask, projectModel, taskModel } from "../models";
import { pick } from "lodash";
import { ITask } from "../models/projectModels/Task";

export default class projectServices {

    static async createProject(project: projectModel.IProject): Promise<projectModel.IProject | null> {
        const newProject = await DAOProject.createNewProject(project);
        return newProject;
    }

    static async updateProjectByStatus(projectId: string, status: string): Promise<projectModel.IProject | null> {
        const project = await DAOProject.updateProjectStatus(projectId, status);
        return project;
    }

    static async getProjectById(projectId: string): Promise<projectModel.IProject | null> {
        const project = await DAOProject.getProjectById(projectId);
        return project;
    }

    static async getAllProjects(): Promise<projectModel.IProject[] | null> {
        const projects = await DAOProject.getAllProjects();
        return projects;
    }

    static async getProjectsByStatus(status: string): Promise<projectModel.IProject[] | null> {
        const projects = await DAOProject.getProjectsByStatus(status);
        return projects;
    }

    static async getProjectsByClient(clientId: string): Promise<projectModel.IProject[] | null> {
        const projects = await DAOProject.getProjectsByClient(clientId);
        return projects;
    }

    static async getProjectsByClientAndStatus(clientId: string, status: string): Promise<projectModel.IProject[] | null> {
        const projects = await DAOProject.getProjectsByClientAndStatus(clientId, status);
        return projects;
    }

    static async deleteProject(projectId: string) {
        await DAOProject.deleteProject(projectId);
    }

    static async getTasksFromProject(projectId: string): Promise<taskModel.ITask[] | null> {
        const tasks = await DAOProject.getTasksFromProject(projectId);
        return tasks;
    }

    static async getTasksByStatus(projectId: string, status: string): Promise<taskModel.ITask[] | null> {
        const tasks = await DAOProject.getTasksFromProjectByStatus(projectId, status);
        return tasks;
    }

    static async addTaskToProject(task: ITask, projectId: string): Promise<taskModel.ITask | null> {
        const newTask = await DAOTask.assignTaskToUser(task, projectId);
        return newTask;
    }

    static async updateTaskStatus(taskid: string, status: string): Promise<taskModel.ITask | null> {
        const task = await DAOTask.updateTaskStatus(taskid, status);
        return task;
    }

    static async addAttachmentToTask(taskId: string, fileUrl: string): Promise<taskModel.ITask | null> {
        const task = await DAOTask.addAttachmentToTask(taskId, fileUrl, fileUrl);
        return task;
    }
}