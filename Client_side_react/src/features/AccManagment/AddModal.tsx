import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { MdClose } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useStack } from "../../contexts/Stack";
import { addAdminAccount, addContentCreatorAccount, addEntrepriseAccount, addMentorAccount, addUserAccount } from "../../api/crud";
import { toAbsoluteUrl } from "../../helpers/AssetHelpers";


type CustomModalProps = {
    HideModal: () => void;
    selectedOption: any;
};

export default function AddModel({
    HideModal,
    selectedOption,
}: CustomModalProps) {
    const stack = useStack();
    const queryClient = useQueryClient();
    const [role, setRole] = useState<string>("");
    useEffect(() => {
        switch (selectedOption) {
            case "user":
                setRole("user");
                break;
            case "mentor":
                setRole("mentor");
                break;
            case "Content Creator":
                setRole("contentCreator");
                break;
            case "entreprise":
                setRole("entreprise");
                break;
            case "admin":
                setRole("admin");
                console.log("admin");
                break;
            default:
                setRole("");
        }
    }, [selectedOption]);

    const useAddMutation = (selectedOption: any) => {
        return useMutation(
            (values: any) => {
                switch (selectedOption) {
                    case "user":
                        return addUserAccount(values);
                    case "mentor":
                        return addMentorAccount(values);
                    case "contentCreator":
                        return addContentCreatorAccount(values);
                    case "entreprise":
                        return addEntrepriseAccount(values);
                    case "admin":
                        return addAdminAccount(values);
                    default:
                        throw new Error("Invalid option selected.");
                }
            }
        );
    };

    const { mutate } = useAddMutation(selectedOption)
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            mutate(values, {
                onSuccess: () => {
                    queryClient.invalidateQueries('users')
                    toast.success('Ajout avec succès', {
                        theme: 'colored',
                        position: 'top-right',
                        style: {
                            backgroundColor: "#07A283",
                            color: "white",
                            width: "450px",
                        }
                    })
                    stack.pop();
                },
                onError: () => {
                    toast.error("Erreur lors de l'ajout", {
                        position: "top-right",
                        theme: "colored",
                        style: {
                            backgroundColor: "#D40776",
                            color: "white",
                            width: "450px",
                        }
                    })
                }
            },)
            console.log(role);
        }
    });

    return (
        <div>
            <div className="fixed top-0 left-0 z-10  flex h-full w-full flex-col  items-center justify-center bg-white">
                <div className="top-1/3 left-1/3 flex h-[70%] w-2/5 flex-col items-center  justify-center bg-darkBlueBg">
                    <form
                        onSubmit={handleSubmit}
                        className="flex  w-[65%] flex-col items-center justify-center space-y-5 "
                    >
                        <div className="flex items-center justify-center ">
                            <img src={toAbsoluteUrl('/assets/icons/plus.png')} alt="+icon" style={{ height: '20px', width: '20px' }} />
                            <div onClick={HideModal}>
                                <MdClose className="mt-4 translate-x-28  cursor-pointer text-darkBlue " />
                            </div>
                        </div>
                        <p className="w-3/4 text-center text-6xl font-medium text-lightBlue ">
                            Ajouter un {role}
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
                        {/* {console.log(values.fullName)} */}

                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            className=" relative w-full rounded-[3px]	border-[1px] border-[#D3D3D3]  text-[13px]"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={values.password}
                            onChange={handleChange}
                            className=" relative  w-full rounded-[3px]	border-[1px] border-[#D3D3D3] text-[13px]"
                        />
                        <button
                            type="submit"
                            className="rounded-[3px] bg-pink px-[40px]   py-[10px] text-white"
                        >
                            <span
                                className="text-white"
                                onClick={() => {
                                    console.log(values);
                                }}
                            >
                                Ajouter
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}