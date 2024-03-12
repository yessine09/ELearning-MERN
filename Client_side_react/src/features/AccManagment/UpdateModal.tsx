import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { MdClose } from "react-icons/md";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { updateUser } from "../../api/crud";
import { useStack } from "../../contexts/Stack";
import User from "../../models/User";
import { getUserById } from "../../api/crudServices";

type CustomModalProps = {
    HideModal: () => void;
    userId: string;
};

const useUpdateMutation = (userId: string) => {
    return useMutation((values: any) => updateUser(userId, values));
};

export default function UpdateModel({
    HideModal,
    userId
}: CustomModalProps) {
    const stack = useStack();
    const queryClient = useQueryClient();
    const [userState, setUserState] = useState<User | null>(null);
    const [role, setRole] = useState<string>("");
    const { data: userQuery } = useQuery(
        ['user', userId],
        async () => {
            let user = await getUserById(userId);
            return user.data;
        }
    );

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            firstName: userQuery?.firstName ?? "",
            lastName: userQuery?.lastName ?? "",
            email: userQuery?.email ?? "",
            password: userQuery?.password ?? "",
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            mutate(values, {
                onSuccess: (data) => {
                    setUserState(data);
                    queryClient.invalidateQueries("users");
                    toast.success("Modification réussite", {
                        theme: "colored",
                        position: "top-right",
                        style: {
                            backgroundColor: "#07A283",
                            color: "white",
                            width: "450px",
                        },
                    });
                    stack.pop();
                },
                onError: () => {
                    toast.error("Erreur lors de la modification", {
                        theme: "colored",
                        position: "top-right",
                        style: {
                            backgroundColor: "#D40776",
                            color: "white",
                            width: "450px",
                        },
                    });
                },
            });
        },
    });

    const { mutate } = useUpdateMutation(userId);

    useEffect(() => {
        setUserState(userQuery);
    }, [userQuery]);
    return (
        <div>
            <div className="fixed top-0 left-0 z-10  flex h-full w-full flex-col  items-center justify-center bg-darkBlueBg/50">
                <div className="top-1/3 left-1/3 flex h-[65%] w-1/3 flex-col items-center justify-center bg-darkBlue px-20">
                    <form onSubmit={handleSubmit}>
                        <div className="flex  w-full flex-col items-center justify-center space-y-5 ">
                            <div className="flex">
                                <div onClick={HideModal}>
                                    <MdClose className="mt-4 translate-x-28  cursor-pointer text-white " />
                                </div>
                            </div>
                            <p className="w-3/4 text-center text-6xl font-medium text-lightBlue">
                                Modifier un {role}
                            </p>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Nom et prénom"
                                value={values.firstName}
                                onChange={handleChange}
                                className=" relative  w-full   rounded-[3px]	border-[1px] border-[#D3D3D3]  text-[13px]"
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Nom et prénom"
                                value={values.lastName}
                                onChange={handleChange}
                                className=" relative  w-full   rounded-[3px]	border-[1px] border-[#D3D3D3]  text-[13px]"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Mot de passe"
                                value={values.email}
                                onChange={handleChange}
                                className=" relative  w-full   rounded-[3px]	border-[1px] border-[#D3D3D3]  text-[13px]"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                value={values.password}
                                onChange={handleChange}
                                className=" relative  w-full   rounded-[3px]	border-[1px] border-[#D3D3D3]  text-[13px]"
                            />

                            <button
                                type="submit"
                                className="m-[20px] rounded-[3px] bg-pink py-[10px] px-[40px]  text-white"
                            >
                                <span
                                    className="text-white "
                                    onClick={() => {
                                        console.log(values);
                                    }}
                                >
                                    Confirmer la modification
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
