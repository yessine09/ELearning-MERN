import { AxiosError } from 'axios'
import instance from '../utils/axios'
import Cookies from 'js-cookie'


type RegisterArgs = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

type RegisterResult =
  | { status: 'user created'; userId: string }
  | { status: 'user not created'; msg: string; payload: { email: string } }

export const register = async (args: RegisterArgs): Promise<RegisterResult> => {
  try {
    const response = await instance.post('/auth/register', args)
    const { userId } = response.data.data
    return { status: 'user created', userId }
  } catch (error) {
    const responseError = error as AxiosError
    const response = responseError.response?.data as any
    console.log(response)
    return {
      status: 'user not created',
      msg: response.error.msg as string,
      payload: { email: response.email },
    }
  }
}

type LoginArgs = {
  email: string
  password: string
}

type LoginResult =
  | { status: 'user logged'; token: string }
  | { status: 'user not logged'; msg: string }

export const logUser = async (args: LoginArgs): Promise<LoginResult> => {
  try {
    const response = await instance.post('/auth/login', args)
    const { token } = response.data.data
    if (!token) {
      return { status: 'user not logged', msg: 'Token not found' }
    }
    return { status: 'user logged', token }
  } catch (error) {
    const responseError = error as AxiosError
    const response = responseError.response?.data as any
    return {
      status: 'user not logged',
      msg: response.error.msg as string,
    }
  }
}

export const getRoleName = async (roleId: string): Promise<string> => {
  try {
    const response = await instance.get(`/roleauthorization/${roleId}`);
    const { role } = response.data.data;
    return role;
  } catch (error) {
    const responseError = error as AxiosError;
    const response = responseError.response?.data as any;
    return '';
  }
};

type checkProfile = {
  status: 'profile created' | 'profile not created'
  msg: string
}

export const checkprofile = async (userId: string): Promise<checkProfile> => {
  try {
    const response = await instance.get(`/profiling/check/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        }
      }
    );
    const { isCompleted } = response.data.data;

    if (isCompleted === true) {
      return { status: 'profile created', msg: 'Profile created' };
    }
    return { status: 'profile not created', msg: 'Profile not created' };
  } catch (error) {
    const responseError = error as AxiosError;
    const response = responseError.response?.data as any;
    return { status: 'profile not created', msg: response.error.msg as string };
  }
};


type verifyCodeArgs = {
  contact: string;
}
type ResetPasswordResult =
  | { status: 'user reset password'; msg: string }
  | { status: 'user not reset password'; msg: string }

export const fetchResetPasswordByEmail = async (args: verifyCodeArgs): Promise<ResetPasswordResult> => {
  try {
    const response = await instance.post('/auth/forget_passwordByEmail', args)
    const { msg } = response.data
    console.log(response)
    return { status: 'user reset password', msg }
  } catch (error) {
    const responseError = error as AxiosError
    const response = responseError.response?.data as any
    return {
      status: 'user not reset password',
      msg: response.error.msg as string,
    }
  }
}


export const fetchResetPasswordByFn = async (args: verifyCodeArgs): Promise<ResetPasswordResult> => {
  try {
    const response = await instance.post('/auth/forget_passwordByfn', args)
    const { msg } = response.data
    return { status: 'user reset password', msg }
  } catch (error) {
    const responseError = error as AxiosError
    const response = responseError.response?.data as any
    return {
      status: 'user not reset password',
      msg: response.error.msg as string,
    }
  }
}


type VerifCodeArgs = {
  code: string;
}
type VerifCodeResult =
  | { status: 'code verified'; msg: string }
  | { status: 'code not verified'; msg: string }


export const VerifyCodeArgs = async (args: VerifCodeArgs): Promise<VerifCodeResult> => {
  try {
    const response = await instance.post('/auth/verify_code', args)
    const { msg } = response.data
    return { status: 'code verified', msg }
  } catch (error) {
    const responseError = error as AxiosError
    const response = responseError.response?.data as any
    return {
      status: 'code not verified',
      msg: response.error.msg as string,
    }
  }
}

type ResetPasswordArgs = {
  password: string;
  email: string;
}

export const fetchResetPasswordByCode = async (args: ResetPasswordArgs): Promise<ResetPasswordResult> => {
  try {
    const response = await instance.post('/auth/reset_password', args)
    const { msg } = response.data
    return { status: 'user reset password', msg }
  } catch (error) {
    const responseError = error as AxiosError
    const response = responseError.response?.data as any
    return {
      status: 'user not reset password',
      msg: response.error.msg as string,
    }
  }
}