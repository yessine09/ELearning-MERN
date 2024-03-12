import { AxiosError } from 'axios'
import instance from '../utils/axios'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { Buffer } from 'buffer'
type UploadTaskArgs = {
  file: File
}

type UploadResult =
  | { status: 'File Uploaded Successfully'; msg: string }
  | { status: 'Failed To upload file'; msg: string }

export const uploadAvatar = async (args: UploadTaskArgs): Promise<String> => {
  try {
    const formData = new FormData()
    formData.append('avatar', args.file)
    const response = await instance.post(`profiling/upload/avatar`, formData, {
      headers: {
        'x-target-role': 'admin',
        'x-resource': 'users',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
    })
    const { data } = response.data
    if (!data) {
      return 'Failed To upload file'
    }
    console.log(data)
    toast.success('File Uploaded Successfully')
    return data.avatarKey
  } catch (error) {
    const responseError = error as AxiosError
    const response = responseError.response?.data as any
    return 'Failed To upload file'
  }
}

export const uploadTask = async (args: UploadTaskArgs, taskId: string): Promise<UploadResult> => {
  try {
    const formData = new FormData()
    formData.append('attachment', args.file)
    const response = await instance.put(`tasks/add/user/attachment/${taskId}`, formData)
    const { data } = response.data
    if (!data) {
      return { status: 'Failed To upload file', msg: 'Failed To upload file' }
    }
    toast.success('File Uploaded Successfully')
    return { status: 'File Uploaded Successfully', msg: 'File Uploaded Successfully' }
  } catch (error) {
    const responseError = error as AxiosError
    const response = responseError.response?.data as any
    return {
      status: 'Failed To upload file',
      msg: response.error.msg as string,
    }
  }
}

// download course attachment
export const downloadCourseAttachment = async (fileKey: string) => {
  try {
    const response = await instance.get(`program/list/lessons/download/${fileKey}`, {
      responseType: 'blob',
    })

    // Create a temporary URL object to handle the file download
    const url = window.URL.createObjectURL(new Blob([response.data]))

    // Create a temporary anchor element to trigger the file download
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileKey) // Set the filename for the downloaded file
    document.body.appendChild(link)

    // Simulate a click event on the anchor element to start the file download
    link.click()

    // Remove the temporary anchor element and revoke the temporary URL
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    return { status: 'success' }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to download file',
    }
  }
}

export const downloadAvatar = async (fileKey: string) => {
  const response = await instance.get(`profiling/avatar/${fileKey}`, {
    headers: {
      'x-target-role': 'admin',
      'x-resource': 'users',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
    responseType: 'arraybuffer',
  })
  const blob = new Blob([response.data], { type: response.headers['content-type'] })
  const imageUrl = URL.createObjectURL(blob)
  /*const base64Image = Buffer.from(response.data).toString('base64')

  console.log(base64Image)*/
  return {
    status: 'success',
    imageUrl: imageUrl,
  }
}
