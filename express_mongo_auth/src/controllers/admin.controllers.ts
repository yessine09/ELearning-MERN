import express from 'express'
import { AuthTypes, HttpStatus } from '../types'
import { AdminServices, ProgramServices, UserServices, sendEmail } from '../services'
import { DAORole, DAOUser, userModel } from '../models'
import { hash } from '../utils'
import { config } from '../config'



export default class AdminControllers {

  static async createUserAccount(req: express.Request, res: express.Response) {
    const payload = await UserServices.createAccount(req.body)
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: payload,
    })

  }

  static async createMentorAccount(req: express.Request, res: express.Response) {
    const payload = await UserServices.createMentorAccount(req.body)
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: payload,
    })
  }

  //create entreprise account
  static async createEntrepriseAccount(req: express.Request, res: express.Response) {
    const payload = await UserServices.createEntrepriseAccount(req.body)
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: payload,
    })
  }

  //create admin account
  static async createAdminAccount(req: express.Request, res: express.Response) {
    const payload = await UserServices.createAdminAccount(req.body)
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: payload,
    })
  }

  // create a content creator account
  static async createContentCreatorAccount(req: express.Request, res: express.Response) {
    const payload = await UserServices.createContentCreatorAccount(req.body)
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: payload,
    })
  }


  static async getAllUsers(req: express.Request, res: express.Response) {
    const users = await AdminServices.getAllUsers()
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: { msg: 'users fetched successfully', users },
    })
  }

  static async getUserById(req: express.Request, res: express.Response) {
    const user = await AdminServices.getUserById(req.params.id)
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: { msg: 'user fetched successfully', user },
    })
  }

  static async updateUser(req: express.Request, res: express.Response) {
    const { id } = req.params
    const { firstName, lastName, email, password, roles } = req.body
    const data = { firstName, lastName, email, password, roles }
    const user = await AdminServices.updateUser(id, data)
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: { msg: 'user updated successfully', user },
    })
  }

  static async deleteUser(req: express.Request, res: express.Response) {
    const { id } = req.params
    const user = await AdminServices.deleteUser(id)
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: { msg: 'user deleted successfully', user },
    })
  }

  static async assignMentorToProgram(req: express.Request, res: express.Response) {
    console.log('assigning mentor to program')
    const payload = await ProgramServices.asignMentorToProgram(req.params.id, req.params.mentorId)
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: payload,
    })
  }

}
