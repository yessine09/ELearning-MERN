import { AxiosError } from 'axios'
import instance from '../utils/axios'

// reate new project
export const createNewProject = async (project: any): Promise<any> => {
    try {
        const response = await instance.post(`/project/create`, project)
        const newProject = response.data.data
        return newProject
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}
// get all projects
export const getAllProjects = async (): Promise<any> => {
    try {
        const response = await instance.get(`/project/list`)
        const projects = response.data.data
        return projects
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}
// get projects by userid
export const getProjectsByClient = async (userId: string): Promise<any> => {
    try {
        const response = await instance.get(`/project/shapers/${userId}`)
        const projects = response.data.data
        return projects
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

// get all projects by status and userid
export const getProjectsByClientAndStatus = async (userId: string, status: string): Promise<any> => {
    try {
        const response = await instance.get(`/project/shapers/${userId}/status/${status}`)
        const projects = response.data.data
        return projects
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

// get project by id
export const getProjectById = async (projectId: string): Promise<any> => {
    try {
        const response = await instance.get(`/project/${projectId}`)
        const project = response.data.data
        return project
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

// get leesons from projet from weeks
export const getLessonsByProgram = async (programId: string): Promise<any> => {
    try {
        const response = await instance.get(`/program/list/${programId}/lessons`)
        const program = response.data.data.map((lesson: any) => lesson.lessons);
        console.log(program)
        return program
    }
    catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

export const getLessonsByProgramAndWeek = async (programId: string, week: string): Promise<any> => {
    try {
        const response = await instance.get(`/program/list/${programId}/week/${week}`)
        const program = response.data.data
        return program
    }
    catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}


