import { AxiosError } from 'axios'
import instance from '../utils/axios'

export const getmentorassignments = async (userId: string): Promise<any> => {
    try {
        const response = await instance.get(`/program/assignment/${userId}`)
        const mentorassignments = response.data.data.map((assignment: { program: any }) => assignment.program)
        console.log(mentorassignments)
        return mentorassignments
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

export const getusersbyprogram = async (programid: string): Promise<any> => {
    try {
        const response = await instance.get(`/enrollment/program/${programid}`)
        const mentorstudents = response.data.data.map((program: { client: any }) => program.client)
        console.log(mentorstudents)
        return mentorstudents
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}