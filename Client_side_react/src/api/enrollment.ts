import { AxiosError } from 'axios'
import instance from '../utils/axios'


export interface Program {
    title: string;
    description: string;
    createdBy: string;
    status: string;
    enrollments: string[];
    weeks: {
        _id: string;
        lessons: string[];
    }[];
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    mentor: string;
    id: string;
}

export interface Enrollment {
    client: string;
    mentor: string | null;
    program: Program;
    status: string;
    installments: number[];
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}

interface args {
    userId: string;
}
export const getShaperById = async (userId: string): Promise<args> => {
    try {
        const response = await instance.get(`/auth/getuser/${userId}`)
        const shaper = response.data.data
        return shaper
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}


export const getshaperprograms = async (userId: string) => {
    try {
        const response = await instance.get(`/enrollment/${userId}`)
        const programs = response.data.data.map((enrollment: { program: any; }) => enrollment.program);
        return programs
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

export const getprogramweeks = async (userId: string): Promise<Program> => {
    try {
        const response = await instance.get(`/enrollment/${userId}`)
        const weeks = response.data.data.map((enrollment: { program: any; }) => enrollment.program.weeks);
        return weeks
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

export const getenrollmentStartDate = async (userId: string, programId: string) => {
    try {
        const response = await instance.get(`/enrollment/${userId}/program/${programId}`)
        const startDate = response.data.data.startDate
        console.log("startDate", startDate)
        return startDate
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}


export const getlessonperweek = async (weekIndex: number, programId: string): Promise<Program> => {

    try {
        const response = await instance.get(`/program/list/${programId}/${weekIndex}`)
        const lessons = response.data.data.map((enrollment: { lesson: any; }) => enrollment);
        return lessons
    }
    catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }

}

export const getprogrambyid = async (programId: string): Promise<Program> => {
    try {
        const response = await instance.get(`/program/list/${programId}`)
        const program = response.data.data
        console.log(program)
        return program
    }
    catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }

}

export const getprogrambymentor = async (mentorId: string): Promise<Program> => {
    try {
        const response = await instance.get(`/enrollment/mentor/${mentorId}`)
        const program = response.data.data.map((enrollment: { program: any; }) => enrollment.program);
        return program
    }
    catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }

}

export const getLessonsByProgram = async (programId: string): Promise<any> => {
    try {
        const response = await instance.get(`/program/list/${programId}/lessons`)
        const program = response.data.data.map((enrollment: { lesson: any; }) => enrollment);
        console.log(program)
        return program
    }
    catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

// get lesson by id
export const getLessonById = async (lessonId: string): Promise<any> => {
    try {
        const response = await instance.get(`/program/list/lessons/${lessonId}`)
        const lesson = response.data.data
        console.log(lesson)
        return lesson
    }
    catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}



