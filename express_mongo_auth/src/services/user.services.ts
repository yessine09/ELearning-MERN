
import jwt from 'jsonwebtoken'
import { config } from '../config'
import configs from '../config/configs'
import { DAORole, resourceModel, roleModel, userModel, clientModel, DAOclient } from '../models'
import { User } from '../models/user'
import DAOUser from '../models/dao/user.dao'
import { AuthTypes, errorTypes } from '../types'
import { hash } from '../utils'
import sendEmail from './sendGrid'
import _ from 'lodash'
import DAOMentor from '../models/dao/mentor.dao'
import { Mentor } from '../models/mentor'



type CreateUserArgs = {
    email: string
    password: string
    firstame: string
    lastName: string
    role: string
}

type GenerateTokenArgs = {
    userId: string
}

export default class UserServices {

    static generateToken = async (args: GenerateTokenArgs) => {
        return jwt.sign(args, configs.jwt.secret)
    }
    static async getUserByEmail(email: string): Promise<User | null> {
        return await DAOUser.getUserByEmail(email)
    }

    static async getUserById(userId: string): Promise<userModel.User | null> {
        const user = await DAOUser.getUserById(userId)
        return user as userModel.User

    }

    static async createAccount(user: userModel.User): Promise<AuthTypes.CreateAccountPayload> {
        const studentRole = await DAORole.getRole({ name: 'user' }) //* get student role
        const allRole = await DAORole.getRole({ name: 'all' }) //* get student role
        const { id: userId } = await DAOUser.createUser({
            ...user,
            password: await hash.hash(user.password),
            roles: [studentRole?.id || '', allRole?.id || ''],
        })
        sendEmail({
            to: user?.email,
            from: config.emailSender,
            subject: 'user created',
            text: `${user?.firstName} ${user?.lastName} your are now a user of the platform as a shaper`,
            html: undefined
        })

        return { userId }
    }

    static async createClientProfile(client: clientModel.IClient): Promise<clientModel.IClient | null> {
        return await DAOclient.createClientProfile(client);
    }

    static async createMentorAccount(user: userModel.User): Promise<AuthTypes.CreateAccountPayload> {
        const studentRole = await DAORole.getRole({ name: 'mentor' }) //* get student role
        const allRole = await DAORole.getRole({ name: 'all' }) //* get student role
        const { id: userId } = await DAOUser.createUser({
            ...user,
            password: await hash.hash(user.password),
            roles: [studentRole?.id || '', allRole?.id || ''],
        })
        await DAOMentor.createMentor(new Mentor(
            {
                user: userId
            }
        ))
        sendEmail({
            to: user?.email,
            from: config.emailSender,
            subject: 'user created',
            text: `${user?.firstName} ${user?.lastName} your are now a user of the platform as a Mentor`,
            html: undefined
        })

        return { userId }
    }

    static async createAdminAccount(user: userModel.User): Promise<AuthTypes.CreateAccountPayload> {
        const studentRole = await DAORole.getRole({ name: 'admin' }) //* get student role
        const allRole = await DAORole.getRole({ name: 'all' }) //* get student role
        const { id: userId } = await DAOUser.createUser({
            ...user,
            password: await hash.hash(user.password),
            roles: [studentRole?.id || '', allRole?.id || ''],
        })
        sendEmail({
            to: user?.email,
            from: config.emailSender,
            subject: 'user created',
            text: `${user?.firstName} ${user?.lastName} your are now a user of the platform as an Admin`,
            html: undefined
        })

        return { userId }
    }

    static async createEntrepriseAccount(user: userModel.User): Promise<AuthTypes.CreateAccountPayload> {
        const studentRole = await DAORole.getRole({ name: 'entreprise' }) //* get student role
        const allRole = await DAORole.getRole({ name: 'all' }) //* get student role
        const { id: userId } = await DAOUser.createUser({
            ...user,
            password: await hash.hash(user.password),
            roles: [studentRole?.id || '', allRole?.id || ''],
        })
        sendEmail({
            to: user?.email,
            from: config.emailSender,
            subject: 'user created',
            text: `${user?.firstName} ${user?.lastName} your are now a user of the platform as a shape partner`,
            html: undefined
        })

        return { userId }
    }

    static async createContentCreatorAccount(user: userModel.User): Promise<AuthTypes.CreateAccountPayload> {
        const studentRole = await DAORole.getRole({ name: 'content_creator' }) //* get student role
        const allRole = await DAORole.getRole({ name: 'all' }) //* get student role
        const { id: userId } = await DAOUser.createUser({
            ...user,
            password: await hash.hash(user.password),
            roles: [studentRole?.id || '', allRole?.id || ''],
        })
        sendEmail({
            to: user?.email,
            from: config.emailSender,
            subject: 'user created',
            text: `${user?.firstName} ${user?.lastName} your are now a user of the platform as a shaper Content Creater`,
            html: undefined
        })

        return { userId }
    }

    static async updateFirstName(userId: string, newFirstName: string): Promise<User> {
        const user = await DAOUser.updateUserById(userId, { firstName: newFirstName })
        return user as User
    }

    static async updateLastName(userId: string, newLastName: string): Promise<User> {
        const user = await DAOUser.updateUserById(userId, { firstName: newLastName })
        return user as User
    }

    static async updatePassword(userId: string, newPassword: string): Promise<User> {
        const user = await DAOUser.updateUserById(userId, { password: await hash.hash(newPassword) })
        sendEmail({
            to: user?.email,
            from: config.emailSender,
            subject: 'password changed',
            text: `${user?.firstName} ${user?.lastName} your password is changed, you are being logged from all the devices`,
            html: undefined
        })

        return user as User
    }

    static async updateEmail(
        userId: string,
        oldEmail: string,
        newEmail: string
    ): Promise<User> {
        const user = await DAOUser.updateUserById(userId, { email: newEmail })
        sendEmail({
            to: newEmail,
            from: config.emailSender,
            subject: 'email changed',
            text: `${user?.firstName} ${user?.lastName} your changed your email to ${newEmail}, you are being logged out from all the devices`,
            html: undefined
        })

        sendEmail({
            to: oldEmail,
            from: config.emailSender,
            subject: 'email changed',
            text: `${user?.firstName} ${user?.lastName} your email is being changed to ${newEmail}, you are being logged out from all the devices`,
            html: undefined
        })

        return user as User
    }

    static async gerRoleById(roleId: string): Promise<roleModel.Role | null> {
        return await DAORole.getRoleById(roleId)
    }
}

