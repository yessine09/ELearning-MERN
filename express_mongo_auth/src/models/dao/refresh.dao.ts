import { AuthTypes } from '../../types'
import refreshModel, { Refresh } from '../refresh.model'


export default class DAORefresh {
  static async getRefreshToken(token: string): Promise<Refresh | null> {
    return await refreshModel.findOne({ token })
  }

  static async createRefresh(
    token: AuthTypes.RefreshToken,
    owner: string
  ): Promise<Refresh> {
    return await refreshModel.create({ ...token, owner })
  }

  static async deleteToken(token: string): Promise<Refresh | null> {
    return await refreshModel.findOneAndDelete({ token })
  }

  static async updateRefreshToken(
    oldToken: string,
    newToken: AuthTypes.RefreshToken
  ): Promise<Refresh | null> {
    return await refreshModel.findOneAndUpdate({ token: oldToken }, newToken)
  }

  static async clearTokens(query: any): Promise<void> {
    await refreshModel.deleteMany(query)
  }
}
