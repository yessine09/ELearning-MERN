  import mongoose from 'mongoose'
  import { userModel } from '../index'


  export default class DAOUser {
    static async getUserByEmail(email: string): Promise<userModel.User | null> {
      return await userModel.default.findOne({ email: email })
    }

    static async getUserById(userId: string): Promise<userModel.User | null> {
      return await userModel.default.findById(userId)
    }



    static async createUser(user: userModel.User): Promise<userModel.User> {
      const createdUser = await userModel.default.create(user)
      createdUser.id = createdUser._id.toString()
      return createdUser
    }

    static async updateUser(query: any, update: any): Promise<userModel.User | null> {
      return await userModel.default.findOneAndUpdate(query, update)
    }

    static async updateUserById(userId: string, update: any): Promise<userModel.User | null> {
      return await userModel.default.findByIdAndUpdate(userId, update)
    }

    static async deleteUser(userId: string): Promise<userModel.User | null> {
      const result = await userModel.default.deleteOne({ _id: userId })
      return result.deletedCount ? ({ id: userId } as userModel.User) : null
    }

    static async getAllUsers(): Promise<userModel.User[]> {
      return await userModel.default.find()
    }

    static async getUserByRole(role: string) {
      const users = await userModel.default.find({ role: role })
      return users as userModel.User[]
    }
  }
