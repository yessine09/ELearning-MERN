import { AxiosError } from 'axios'
import instance from '../utils/axios'
export interface ITask {
    title: string
    description: string
    lesson: string
    project: string
    status: string
    createdBy: string
    assignedTo: string
    dueDate: string
    createdAt: string
    updatedAt: string
    _id: string
}

//asign task to shaper
export const createNewTask = async (task: ITask): Promise<any> => {
    try {
        const response = await instance.post(`/tasks/add`, task)
        const newTask = response.data.data
        return newTask
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}


// get all weeks by program
export const getAllWeeksFromProgram = async (projectId: string): Promise<any> => {
    try {
        const response = await instance.get(`/program/list/${projectId}/weeks`)
        const tasks = response.data.data
        console.log(tasks)
        return tasks
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }
}

//get all tasks by shaper
export const getTasksByClient = async (userId: string): Promise<any> => {
    try {
        const response = await instance.get(`/tasks/shapers/${userId}`)
        const tasks = response.data.data
        console.log(tasks)
        return tasks
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

export const getTasksByClientAndProject = async (userId: string, projectId: string): Promise<any> => {
    try {
        const response = await instance.get(`/tasks/shapers/${userId}/project/${projectId}`)
        const tasks = response.data.data
        console.log(tasks)
        return tasks
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }
}

//get all tasks by shaper and status
export const getTasksByClientAndStatus = async (userId: string, status: string): Promise<any> => {
    try {
        const response = await instance.get(`/tasks/shapers/${userId}/status/${status}`)
        const tasks = response.data.data
        return tasks
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

//get task by id
export const getTaskById = async (taskId: string): Promise<any> => {
    try {
        const response = await instance.get(`/tasks/${taskId}`)
        const task = response.data.data
        return task
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}
//update task
export const updateTask = async (taskId: string, task: any): Promise<any> => {
    try {
        const response = await instance.put(`/tasks/${taskId}`, task)
        const updatedTask = response.data.data
        return updatedTask
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

// get all tasks in a lesson
export const getTasksByLesson = async (lessonId: string): Promise<any> => {
    try {
        const response = await instance.get(`/tasks/list/${lessonId}`)
        const tasks = response.data.data
        return tasks
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

// get all tasks in a project
export const getTasksFromProject = async (projectId: string): Promise<any> => {
    try {
        const response = await instance.get(`/task/project/${projectId}`)
        const tasks = response.data.data
        return tasks
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

// add attachment to task
export const addAttachmentToTask = async (taskId: string, attachment: any): Promise<any> => {

    const formData = new FormData()
    formData.append('attachment', attachment)

    try {
        const response = await instance.post(`/task/${taskId}/attachment`, formData)
        const task = response.data.data
        return task
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }
}

// delete attachment from task
export const deleteAttachmentFromTask = async (taskId: string, attachmentId: string): Promise<any> => {
    try {
        const response = await instance.delete(`/task/${taskId}/attachment/${attachmentId}`)
        const task = response.data.data
        return task
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }
}

// add comment to task
export const addCommentToTask = async (taskId: string, comment: any): Promise<any> => {
    try {
        const response = await instance.post(`/task/${taskId}/comment`, comment)
        const task = response.data.data
        return task
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }
}

// delete comment from task
export const deleteCommentFromTask = async (taskId: string, commentId: string): Promise<any> => {
    try {
        const response = await instance.delete(`/task/${taskId}/comment/${commentId}`)
        const task = response.data.data
        return task
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }
}

// add task to project
export const addTaskToProject = async (taskId: string, projectId: string): Promise<any> => {
    try {
        const response = await instance.post(`/task/${taskId}/project/${projectId}`)
        const task = response.data.data
        return task
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }
}

// delete task from project
export const deleteTaskFromProject = async (taskId: string, projectId: string): Promise<any> => {
    try {
        const response = await instance.delete(`/task/${taskId}/project/${projectId}`)
        const task = response.data.data
        return task
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }
}



// delete task from lesson
export const deleteTaskFromLesson = async (taskId: string, lessonId: string): Promise<any> => {

    try {
        const response = await instance.delete(`/task/${taskId}/lesson/${lessonId}`)
        const task = response.data.data
        return task
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }
}

// update task status
export const updateTaskStatus = async (taskId: string, status: string): Promise<any> => {
    try {
        const response = await instance.put(`/task/${taskId}/status/${status}`)
        const task = response.data.data
        return task
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }
}

export const gettasksByLessonandUser = async (taskId: string, userId: string): Promise<any> => {
    try {
        const response = await instance.get(`/tasks/shapers/${taskId}/lesson/${userId}`)
        const task = response.data.data
        console.log(task)
        return task
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }



}

// get task by user id and lesson id and status
export const getTaskByUserAndLessonAndStatus = async (userId: string, lessonId: string, status: string): Promise<any> => {
    try {
        const response = await instance.get(`/tasks/shapers/${userId}/lesson/${lessonId}/status/${status}`)
        const task = response.data.data
        console.log(task)
        return task
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return response
    }
}

// get lessons by week id 
export const getLessonsByWeek = async (weekId: string, programId: string): Promise<any> => {
    try {
        const response = await instance.get(`/program/list/${programId}/week/${weekId}`)
        const lessons = response.data.data
        console.log(lessons)
        return lessons
    }
    catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}

export const getTasksByProgramAndStatus = async (programId: string, status: string): Promise<any> => {
    try {
        const response = await instance.get(`/tasks/program/${programId}/status/${status}`)
        const tasks = response.data.data
        console.log(tasks)
        return tasks
    }
    catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        return response
    }
}