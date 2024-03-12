import { AxiosError } from "axios";
import instance from "../utils/axios";
export interface CustomData {
    clientId: string;
    softSkills: {
        data: {
            skill: string;
        }[];
    };
    skillsets: {
        data: {
            skill: string;
            level: string;
            isSoftSkill: boolean;
        }[];
    };
    links: {
        data: {
            title: string;
            url: string;
        }[];
    };
    studies: {
        data: {
            local: string;
            specialty: string;
            degree: string;
            startDate: Date;
            endDate: Date;
            establishment: string;
            student: boolean;
        }[];
    };
    professional_experience: {
        data: {
            period: string;
            company: string;
            job: string;
            local: string;
        }[];
    };
}

type ProfileResult =
    | { status: 'profile created'; userId: string }
    | { status: 'profile not created'; msg: string; payload: { email: string } }

export const profiling = async (args: CustomData): Promise<ProfileResult> => {
    try {
        const response = await instance.post('/profiling/save', args)
        const { userId } = response.data.data
        return { status: 'profile created', userId }
    } catch (error) {
        const responseError = error as AxiosError
        const response = responseError.response?.data as any
        console.log(response)
        return {
            status: 'profile not created',
            msg: response.error.msg as string,
            payload: { email: response.email },
        }
    }
}
