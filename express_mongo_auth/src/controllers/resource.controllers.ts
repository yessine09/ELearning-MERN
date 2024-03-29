import express from 'express'
import { ResourceServices } from '../services'
import { HttpStatus } from '../types'


export default class ResourceControllers {
  static async createResource(req: express.Request, res: express.Response) {
    const { name, permissions } = req.body
    const data = { name, permissions }
    const { id: resourceId } = await ResourceServices.createResource(data)
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: { resourceId },
    })
  }

  static async assignResource(req: express.Request, res: express.Response) {
    const { roleId, resourceId } = req.body
    await ResourceServices.assignResource(roleId, resourceId)
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: { roleId, resourceId },
    })
  }

  static async listResources(req: express.Request, res: express.Response) {
    const resources = await ResourceServices.listResources()
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: { resources },
    })
  }

  static async getResource(req: express.Request, res: express.Response) {
    const resource = await ResourceServices.getResource(req.params.resourceId)
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: { resource },
    })
  }
}
