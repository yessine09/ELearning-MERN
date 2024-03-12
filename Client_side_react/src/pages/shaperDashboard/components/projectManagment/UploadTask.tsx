import { Button, Card } from '@material-tailwind/react'
import { useEffect, useState } from 'react';
import { getTaskById } from '../../../../api/tasks';
import { toAbsoluteUrl } from '../../../../helpers/AssetHelpers';
import { toast } from 'react-toastify';
import { uploadTask } from '../../../../api/uploadServices';
import { useStack } from '../../../../contexts/Stack';
import { FileUpload } from './FileUpload';
import { ConfirmationDialog } from './ConfirmModel';

type CustomModalProps = {
    HideModal: () => void;
    taskid: string;
};

export default function UploadTask({ HideModal, taskid }: CustomModalProps) {
    const [task, setTask] = useState<any>({});
    const [file, setFile] = useState(null);
    const stack = useStack();

    useEffect(() => {
        const fetchTask = async () => {
            const task = await getTaskById(taskid);
            setTask(task);

        }
        fetchTask();
        console.log(task);
    }, [taskid])

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadClick = async () => {
        if (selectedFile) {
            setIsLoading(true); // set loading to true
            if (isLoading === true) { stack.push(<FileUpload />) }
            const result = await uploadTask({ file: selectedFile }, taskid);
            stack.pop();
            setIsLoading(false); // set loading to false after upload completes
            if (result.status === "File Uploaded Successfully") {
                setUploadStatus(result.msg);
            } else {
                setUploadStatus(result.msg);
            }
        } else {
            setUploadStatus("Please select a file to upload");
        }
    };
    return (
        <Card className='fixed top-[27%] left-[24%] z-30 rounded-3xl shadow-2xl flex h-[73%] w-[71%] flex-col p-6 bg-white'>
            <div className='absolute right-7' onClick={HideModal}><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                <g id="Groupe_710" data-name="Groupe 710" transform="translate(-1274.883 -634.978)">
                    <circle id="Ellipse_64" data-name="Ellipse 64" cx="13.5" cy="13.5" r="13.5" transform="translate(1274.883 634.978)" fill="#189ab4" />
                    <g id="x" transform="translate(1284.351 644.446)">
                        <line id="Ligne_26" data-name="Ligne 26" x1="8" y2="8" transform="translate(-0.469 -0.469)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
                        <line id="Ligne_27" data-name="Ligne 27" x2="8" y2="8" transform="translate(-0.469 -0.469)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
                    </g>
                </g>
            </svg></div>
            <div className='flex items-center mt-4 ml-9 '>
                <Button className='bg-[#f6db86]'>
                    <div className="flex items-center justify-between w-full ">
                        <img src='/assets/icons/ploading.svg' className='w-4 h-4' />
                        <span className="lowercase text-darkBlue">In Progress </span>
                    </div>
                </Button>
                <div className='flex ml-[5%]'>
                    <div style={{ color: '#fe5744', fontSize: '14px', marginLeft: '15px', fontWeight: '400', fontFamily: 'Segoe UI' }}>
                        Deadline
                    </div>
                    <div style={{ color: '#fe5744', fontSize: '16px', marginLeft: '17px', fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                        {new Date(task.dueDate).toLocaleString('en-US', { day: 'numeric', month: 'long' })}
                    </div>
                    <div style={{ color: '#a4bbc5', fontSize: '14px', marginLeft: '75px', fontWeight: '400', fontFamily: 'Segoe UI' }}>
                        Created At
                    </div>
                    <div style={{ color: '#05445E', fontSize: '16px', marginLeft: '20px', fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                        {new Date(task.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                    </div>
                </div>
            </div>
            <div className=' mt-[2%] mx-[5%] text-darkBlue text-2xl font-font font-[600]'>
                {task.title}
            </div>
            <div className='mt-[2%] mx-[5%] text-darkBlue text-md font-font'>
                {task.description}
            </div>
            <div className='mt-[2%] ml-[3%] rounded-3xl shadow-md h-[62%] w-[55%] bg-gray-300'
                onDrop={(e) => {
                    e.preventDefault();
                    const droppedFile = e.dataTransfer.files[0];
                    setFile(droppedFile);
                }}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className='mt-[5%] mx-[5%] flex justify-between'>
                    <span className=' text-darkBlue text-md font-[600] font-font'> Upload Your Work Here !</span>
                    <img src={toAbsoluteUrl('/assets/icons/pyeux1.svg')} />
                </div>
                <div className='flex items-center'>
                    <div>
                        <label htmlFor="file-upload" className=" ">
                            <div className="flex m-[5%] items-center w-32 justify-center flex-1 h-[45px] px-5 pt-1 pb-1 border rounded-lg border-[#189ab4]">
                                <div className="flex space-x-2 items-center justify-end flex-1 h-5">
                                    <p className="text-base font-font font-[600] text-[#189ab4]">Select a file</p>
                                </div>
                            </div>
                        </label>
                    </div>

                    <input type="file" id="file-upload" className="hidden" onChange={handleFileInputChange} />
                    <div className='flex m-[5%] items-center w-fit justify-center flex-1 h-[45px] px-1 pt-1 pb-1 border rounded-lg border-[#189ab4]'>
                        <img src={toAbsoluteUrl('assets/icons/download.svg')} alt="upload" />
                        <button onClick={() => stack.push(<ConfirmationDialog HideModal={() => stack.pop()} submitTasks={handleUploadClick} />)} className="text-base font-font font-[600] text-[#189ab4]"> Upload</button>
                    </div>

                </div>



            </div>

        </Card >

    )
}