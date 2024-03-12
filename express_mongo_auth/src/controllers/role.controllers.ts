import express, { NextFunction } from 'express'
import { RoleServices } from '../services'
import { HttpStatus } from '../types'


export default class RoleControllers {
  static async createRole(req: express.Request, res: express.Response) {
    const { name } = req.body
    const { id: roleId } = await RoleServices.createRole(name)
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: { roleId },
    })
  }

  static async grantRole(req: express.Request, res: express.Response) {
    const {
      userId,
      roleId,
      role: { name: roleName },
    } = req.body
    await RoleServices.grantRole(userId, roleId, roleName)
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: { msg: 'role granted successfully', userId, roleId },
    })
  }

  static async revokeRole(req: express.Request, res: express.Response) {
    const {
      userId,
      roleId,
      role: { name: roleName },
    } = req.body
    await RoleServices.revokeRole(userId, roleId, roleName)
    return res.status(HttpStatus.NO_CONTENT)
  }

  static async listRoles(req: express.Request, res: express.Response) {
    const roles = await RoleServices.listRoles()
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: { roles },
    })
  }

  static async getRole(req: express.Request, res: express.Response) {
    const role = await RoleServices.getRole(req.params.roleId)
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: { role },
    })
  }

  static async getRoles(req: express.Request, res: express.Response) {
    const roles = await RoleServices.getRoles(req.body.rolesIds)
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: { roles },
    })
  }


  static async getUsersByRole(req: express.Request, res: express.Response) {
    const users = await RoleServices.getAllUsersByRoleId(req.params.roleId)
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: { users },
    })
  }

  static async getUsersByRoleAndUserId(req: express.Request, res: express.Response, next: NextFunction) {
    try {
      const { roleId, userId } = req.params;
      const users = await RoleServices.getUsersByRoleAndUserId(userId, roleId);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: { users },
      })
    } catch (error) {
      next(error);
    }
  }
}
