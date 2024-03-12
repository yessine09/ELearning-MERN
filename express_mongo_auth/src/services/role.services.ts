import { sendEmail } from "."
import { config } from "../config"
import { DAORole, DAOUser, resourceModel, roleModel, userModel } from "../models"
import ResourceServices from "./resource.services"


export default class RoleServices {
  static async createRole(name: string): Promise<roleModel.Role> {
    const role = await DAORole.createRole({ name })
    return role as roleModel.Role
  }

  static async grantRole(
    userId: string,
    roleId: string,
    roleName: string
  ): Promise<userModel.User | null> {
    const user = await DAOUser.updateUserById(userId, { $push: { roles: roleId } })

    sendEmail({
      to: user?.email,
      from: config.emailSender,
      subject: 'role granted',
      text: `${user?.firstName} ${user?.lastName} your are granted the ${roleName} role`,
      html: undefined
    })

    return user
  }

  static async revokeRole(
    userId: string,
    roleId: string,
    roleName: string
  ): Promise<userModel.User | null> {
    const user = await DAOUser.updateUserById(userId, { $pull: { roles: roleId } })

    sendEmail({
      to: user?.email,
      from: config.emailSender,
      subject: 'role revoked',
      text: `${user?.firstName} ${user?.lastName} your are no longer an ${roleName}`,
      html: undefined
    })

    return user
  }

  static async getRoles(rolesIds: string[]): Promise<roleModel.Role[]> {
    const roles: roleModel.Role[] = []
    for (const roleId of rolesIds) {
      roles.push(await this.getRole(roleId))
    }
    return roles
  }

  static async listRoles(): Promise<roleModel.Role[]> {
    const roles: roleModel.Role[] = []
    for (const role of await DAORole.getRoles()) {
      roles.push(role)
    }

    return roles
  }

  static async getRole(roleId: string): Promise<roleModel.Role> {
    const role = (await DAORole.getRoleById(roleId)) as roleModel.Role
    return role
  }

  static async getAllUsersByRoleId(roleId: string): Promise<userModel.User[]> {
    const role = await DAORole.getRoleById(roleId);
    if (!role) {
      return [];
    }
    const users = await userModel.default.find({ roles: { $in: [role.id] } });
    return users;
  }

  static async getUsersByRoleAndUserId(userId: string, roleId: string): Promise<userModel.User[]> {
    const role = await DAORole.getRoleById(roleId);
    if (!role) {
      return [];
    }
    const users = await userModel.default.find({ roles: { $in: [role.id] }, _id: { $ne: userId } });
    return users;
  }

}
