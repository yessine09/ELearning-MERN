
import { MdClose } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useStack } from "../../contexts/Stack";
import { removeUser } from "../../api/crud";


type CustomModalProps = {
    HideModal: () => void;
    id: string;
    firstName: string;
};
export default function DeleteModel({
    HideModal,
    id,
    firstName,
}: CustomModalProps) {
    console.log("id", id)
    const stack = useStack();
    const queryClient = useQueryClient();
    const useDeleteMutation = () => {
        return useMutation((id: any) => removeUser(id))
    }
    const { mutate } = useDeleteMutation()
    const handleDelete = () => {
        console.log(id)
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries('users')
                toast.success('User deleted successfully', {
                    theme: 'light',
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
                toast.error("Failed to delete User", {
                    position: "top-right",
                    theme: "light",
                    style: {
                        backgroundColor: "#D40776",
                        color: "white",
                        width: "450px",
                    }
                })
            }
        });
    };
    return (
        <div>
            <div className=" fixed top-0 left-0 z-10 flex h-full w-full flex-col  items-center justify-center bg-white/50">
                <div className="top-1/3 left-1/3 flex flex-col items-center justify-center bg-darkBlueBg">
                    <div className="flex">
                        {/* <img src={toAbsoluteUrl('')} alt="deleteUser" width={120} height={120} /> */}
                        <div onClick={HideModal}>
                            <MdClose className="mt-4 translate-x-36 cursor-pointer text-darkBlue " />
                        </div>
                    </div>
                    <p className="w-3/4 text-center text-6xl font-medium text-lightBlue">
                        {`Do You really want to delete  ${firstName} ?`}
                    </p>
                    <button
                        type="submit"
                        className="m-[20px] rounded-[3px] bg-pink py-[10px] px-[40px]  text-darkBlue"
                    >
                        <span className="text-darkBlue" onClick={handleDelete}>
                            confirm the deletion
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}