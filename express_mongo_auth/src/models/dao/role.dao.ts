import roleModel, { Role } from "../role.model"

export default class DAORole {
  static async getRoleById(roleId: string): Promise<Role | null> {
    return await roleModel.findById(roleId)
  }

  static async getRole(query: any): Promise<Role | null> {
    return await roleModel.findOne(query)
  }

  static async getRoles(): Promise<Role[]> {
    return await roleModel.find()
  }

  static async createRole(data: any): Promise<Role | null> {
    return await roleModel.create(data)
  }

  static async updateRoleById(roleId: string, data: any): Promise<Role | null> {
    return await roleModel.findByIdAndUpdate(roleId, data)
  }
}
