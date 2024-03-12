import express from 'express'
import { HttpStatus } from '../types'
import { ProjectServices } from '../services'
import UploadServices from '../services/upload.services'
import { CustomRequest } from '../middleware/auth.middleware'
export default class ProjectController {
  static async createNewProject(req: CustomRequest, res: express.Response) {
    const payload = await ProjectServices.createProject(req.body)
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: payload,
    })
  }

  static async getAllProjects(req: CustomRequest, res: express.Response) {
    const payload = await ProjectServices.getAllProjects()
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: payload,
    })
  }

  static async getProjectById(req: CustomRequest, res: express.Response) {
    const clientid = req.params.id
    const payload = await ProjectServices.getProjectById(clientid)
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: payload,
    })
  }

  static async getProjectsByStatus(req: CustomRequest, res: express.Response) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: await ProjectServices.getProjectsByStatus(req.params.status),
    })
  }

  static async getProjectsByClient(req: CustomRequest, res: express.Response) {
    const userid = req.params.id
    const payload = await ProjectServices.getProjectsByClient(userid)
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: payload,
    })
  }

  static async getProjectsByClientAndStatus(req: CustomRequest, res: express.Response) {
    const userid = req.params.id
    const status = req.params.status
    const payload = await ProjectServices.getProjectsByClientAndStatus(userid, status)
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: payload,
    })
  }

  static async updateProjectStatus(req: CustomRequest, res: express.Response) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: await ProjectServices.updateProjectByStatus(req.body.projectId, req.body.status),
    })
  }

  static async deleteProject(req: CustomRequest, res: express.Response) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: await ProjectServices.deleteProject(req.body.projectId),
    })
  }

  static async getTasksByProject(req: CustomRequest, res: express.Response) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: await ProjectServices.getTasksFromProject(req.params.projectId),
    })
  }

  static async getTasksByProjectAndStatus(req: CustomRequest, res: express.Response) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: await ProjectServices.getProjectsByClientAndStatus(
        req.params.projectId,
        req.params.status
      ),
    })
  }

  static async addTaskToProject(req: CustomRequest, res: express.Response) {
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: await ProjectServices.addTaskToProject(req.body.task, req.body.projectId),
    })
  }

  static async updateTaskStatus(req: CustomRequest, res: express.Response) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: await ProjectServices.updateTaskStatus(req.body.taskId, req.body.status),
    })
  }

  // static async uploadFileToTask(req: CustomRequest, res: express.Response) {

  //     const fileUrl = await UploadServices.uploadTaskAttachments(req, res);
  //     await ProjectServices.addAttachmentToTask(req.params.taskid, fileUrl.key);
  //     return res.status(HttpStatus.OK).json({
  //         status: HttpStatus.OK,
  //         data: fileUrl
  //     })
  // }
}
