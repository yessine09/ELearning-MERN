import Cookies from 'js-cookie'
import instance from '../utils/axios'
import { AxiosError } from 'axios'

export interface IJobOffer {
    position: string;
    company: {
        _id: string;
        name: string;
        description: string;
        logo: string;
        image: string;
        dateOfCreation: string;
        sector: string;
        activity: string[];
        licence: string;
        user: string;
        links: any[]; // You can replace `any[]` with the specific type for the `links` property
        staff: any[]; // You can replace `any[]` with the specific type for the `staff` property
        id: string;
    };
    location: string;
    description: string;
    salary: number;
    keywords: string[];
    requirements: string[];
    skills: string[];
    bonusSkills: string[];
    recruitmentProcess: string;
    status: string;
    score: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}


export const getMatchingJobOffers = async (userId: string): Promise<IJobOffer[]> => {
    try {
        const response = await instance.get(`/joboffer/match/${userId}`);
        const matchingJobOffers = response.data.data.matchedJobOffers.map(
            (matchingJobOffer: any) => matchingJobOffer.jobOffer
        );
        // console.log(matchingJobOffers);
        return matchingJobOffers;
    } catch (error) {
        const responseError = error as AxiosError;
        const response = responseError.response?.data as any;
        return response;
    }
};

export const getJobOfferById = async (jobOfferId: string) => {
    try {
        const response = await instance.get(`/joboffer/list/${jobOfferId}`);
        const jobOffer = response.data.data;
        return jobOffer;
    } catch (error) {
        const responseError = error as AxiosError;
        const response = responseError.response?.data as any;
        return response;
    }
};
export type JobApplication = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    resume: File;
    coverLetter: string;
    jobOfferId: string;
    applicantId: string;
    status: string;
};
type JobApplicationResult =
    | { status: 'job application created Successfully'; msg: string }
    | { status: 'failed to submit your job application'; msg: string };

export const handlejobApplication = async (args: JobApplication): Promise<JobApplicationResult> => {
    try {
        const formData = new FormData();
        formData.append('resume', args.resume);

        const response = await instance.post(`/jobapplication/create/`, args, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response);
        return { status: 'job application created Successfully', msg: response.data.message };
    } catch (error) {
        const responseError = error as AxiosError;
        const response = responseError.response?.data as any;
        return { status: 'failed to submit your job application', msg: response.data.message };
    }
};







