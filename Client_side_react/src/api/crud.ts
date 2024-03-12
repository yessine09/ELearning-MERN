import Cookies from "js-cookie";
import instance from "../utils/axios";

type userArgs = {
    firstName: string
    lastName: string
    email: string;
    password: string;
}



export const addUserAccount = async (args: userArgs) => {
    try {
        const { data } = await instance.post("/api/createUser", args, {
            headers: {
                'x-target-role': 'admin',
                'x-resource': 'users',
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
            }
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const addMentorAccount = async (args: userArgs) => {
    try {
        const { data } = await instance.post("/api/createMentor", args, {
            headers: {
                'x-target-role': 'admin',
                'x-resource': 'users',
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
            }
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const addAdminAccount = async (args: userArgs) => {
    try {
        const { data } = await instance.post("/api/createAdmin", args, {
            headers: {
                'x-target-role': 'admin',
                'x-resource': 'users',
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
            }
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const addEntrepriseAccount = async (args: userArgs) => {
    try {
        const { data } = await instance.post("/api/createEntreprise", args, {
            headers: {
                'x-target-role': 'admin',
                'x-resource': 'users',
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
            }
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const addContentCreatorAccount = async (args: userArgs) => {
    try {
        const { data } = await instance.post("/api/createContentCreator", args, {
            headers: {
                'x-target-role': 'admin',
                'x-resource': 'users',
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
            }
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

type UserUpdateArgs = {
    firstName: string
    lastName: string
    email: string
    password: string
};

export const updateUser = async (
    _id: any,
    args: UserUpdateArgs
): Promise<any> => {
    try {
        const { data } = await instance.put(`/api/updateuser/${_id}`, args, {
            headers: {
                'x-target-role': 'admin',
                'x-resource': 'users',
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
            },
        });
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
    }
};


export const removeUser = async (_id: any) => {

    const { data } = await instance.delete(`/api/deleteuser/${_id}`, {
        headers: {
            'x-target-role': 'admin',
            'x-resource': 'users',
            'Authorization': `Bearer ${Cookies.get('access_token')}`,
        }
    });
    return data;
};
