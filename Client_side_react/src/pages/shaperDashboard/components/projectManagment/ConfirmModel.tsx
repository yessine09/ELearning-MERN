import { Button } from "@material-tailwind/react";

type CustomModalProps = {
    HideModal: () => void;
    submitTasks: () => void;
};
export const ConfirmationDialog = ({
    HideModal,
    submitTasks
}: CustomModalProps) => {
    return (
        <>
            <div className="fixed top-[50%] left-[40%] z-30 rounded-3xl shadow-2xl flex h-[20%] w-[20%] flex-col p-6 bg-white">
                <div className="modal-content">
                    <div className="modal-actions">

                        <h1 className="text-darkBlue text-md font-[600] text-center font-font">Are you sure you want to upload this task?</h1>
                        <div className="flex items-center justify-between">
                            <Button className="bg-[#f6db86]" onClick={submitTasks}>Yes</Button>
                            <Button className="bg-fancyBlue" onClick={HideModal} >No</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
