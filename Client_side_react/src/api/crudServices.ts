import Cookies from 'js-cookie'
import instance from '../utils/axios'

type basicInfoArgs = {
  phone: string
  gender: string
  profession: string
}

//get all roles from backend using axios
export const getAllRoles = async () => {
  try {
    const { data } = await instance.get(`/api/roles/`, {
      headers: {
        'x-target-role': 'admin',
        'x-resource': 'users',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

// get role by id from backend using axios
export const getRoleById = async (roleid: string) => {
  try {
    const { data } = await instance.get(`/api/roles/${roleid}`, {
      headers: {
        'x-target-role': 'admin',
        'x-resource': 'users',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

//get user by role from backend using axios
export const getUserByRole = async (roleid: string, userId: string) => {
  try {
    const { data } = await instance.get(
      `/api/users/getusersbyroleidanduserid/${roleid}/${userId}`,
      {
        headers: {
          'x-target-role': 'admin',
          'x-resource': 'users',
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
      },
    )
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

//get all user by role from backend using axios
export const getAllUsersByRole = async (roleid: string) => {
  try {
    const { data } = await instance.get(`/api/roles/getusersbyroleid/${roleid}`, {
      headers: {
        'x-target-role': 'admin',
        'x-resource': 'users',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

// get user by id from backend using axios
export const getUserById = async (userid: string) => {
  try {
    const { data } = await instance.get(`/api/getuser/${userid}`, {
      headers: {
        'x-target-role': 'admin',
        'x-resource': 'users',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getuserInfoById = async (userid: string) => {
  try {
    const { data } = await instance.get(`/profiling/info/${userid}`)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateBasicInfo = async (args: basicInfoArgs) => {
  try {
    const { data } = await instance.post(`/profiling/update_basic_info/`, args, {
      headers: {
        'x-target-role': 'admin',
        'x-resource': 'users',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getProfileInfoById = async (clientId: string) => {
  try {
    const { data } = await instance.get(`/profiling/info/${clientId}`)
    console.log()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllUsers = async () => {
  try {
    const { data } = await instance.get(`/api/getallusers/`, {
      headers: {
        'x-target-role': 'admin',
        'x-resource': 'users',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
