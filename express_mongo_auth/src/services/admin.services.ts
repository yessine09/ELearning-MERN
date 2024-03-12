import { DAOProgram, DAOUser, userModel } from '../models';
import { config } from '../config';
import { hash } from '../utils';
import { sendEmail } from '.';
export default class AdminServices {

  static async getAllUsers(): Promise<userModel.User[]> {
    const users = await DAOUser.getAllUsers()
    return users as userModel.User[]
  }

  static async getUserById(userId: string): Promise<userModel.User | null> {
    const user = await DAOUser.getUserById(userId)
    return user as userModel.User

  }

  static async updateUser(userId: string, data: any): Promise<userModel.User | null> {
    if (data.password) {
      const hashedPwd = await hash.hash(data.password);
      data.password = hashedPwd;
    }
    const user = await DAOUser.updateUserById(userId, data)
    return user as userModel.User
  }
  static async deleteUser(userId: string): Promise<userModel.User | null> {
    const deletedUser = await DAOUser.deleteUser(userId);
    return deletedUser as userModel.User;
  }


}
