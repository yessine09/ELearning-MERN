import React, { useState } from 'react'
import MentorSideBar from '../mentorSideBar'
import { Link } from 'react-router-dom'
import { Button, Card } from '@material-tailwind/react'
import AssingneeComponent from './AssigneeComponent'
import Calendar from './Calendar'
import AutomaticDate from './AutomaticDate'
import { useStack } from '../../../contexts/Stack'
import { ConfirmationDialog } from '../../shaperDashboard/components/projectManagment/ConfirmModel'
import { toAbsoluteUrl } from '../../../helpers/AssetHelpers'
import Commentaire from '../tasksManagment/Commentaire'

type CustomModalProps = {
    HideModal: () => void;
};
export default function AddTaskComponent({ HideModal }: CustomModalProps) {

    const stack = useStack();
    // const [clicked, setClicked] = useState(false);
    return (
        < div className="fixed top-[15%] left-[24%] z-30 rounded-3xl flex items-center h-[90%] w-[71%]  bg-gray-100" >
            {/* <div className='flex justify-between'> */}
            <div className='flex justify-between' >
                <div className='flex flex-col items-end'>
                    <div className='bg-gray-100 w-[95%] rounded' >
                        <div className='flex'>

                            <div  >

                                <div className='flex items-center  ml-9 '>
                                    <Button style={{ backgroundColor: '#f6db86', height: '45px', width: '150px', display: 'flex', alignItems: 'center' }} >
                                        <img src='/assets/icons/p4fleches.svg' />
                                        <span className="lowercase" style={{ fontWeight: '500', textTransform: 'capitalize', color: '#05445E', fontSize: '22px' }}>Open </span>
                                    </Button>
                                </div>
                                <div className='ml-[10%] mt-2'>
                                    <div className=' text-darkBlue text-2xl font-font font-[600]'>
                                        <input

                                            className="bg-transparent  placeholder-[#7e9eab] outline-none focus:outline-none focus:border-transparent mb-2 "
                                            type="text"
                                            placeholder="Title"
                                        />
                                    </div>
                                    <div className=' text-darkBlue text-md font-font'>
                                        <input
                                            className="bg-transparent w-full placeholder-[#7e9eab] outline-none focus:outline-none focus:border-transparent mb-2 "
                                            type="text"
                                            placeholder="Description"
                                        />
                                    </div>
                                </div>

                                <div className='my-[3%] ml-[7%] px-[3%] py-[5%] rounded-3xl shadow-md h-[290px] w-[390px] bg-gray-300'>
                                    <div className='mt-[5%] mx-[5%] flex justify-between'>
                                        <span className=' text-darkBlue text-md font-[600] font-font'> Upload Your Work Here !</span>
                                        <img src={toAbsoluteUrl('/assets/icons/pyeux1.svg')} />
                                    </div>
                                    <div className='flex items-center '>
                                        <div>
                                            <label htmlFor="file-upload" className=" ">
                                                <div className="flex mt-[5%] items-center w-32 justify-center flex-1 h-[45px] px-5 pt-1  border rounded-lg border-[#189ab4]">
                                                    <div className="flex space-x-2 items-center justify-end flex-1 h-5">
                                                        <p className="text-base font-font font-[600] text-[#189ab4]">Select a file</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>

                                        <input type="file" id="file-upload" className="hidden" />
                                        <div className='flex m-[5%] items-center w-fit justify-center flex-1 h-[45px] px-1 pt-1 pb-1 border rounded-lg border-[#189ab4]'>
                                            <img src={toAbsoluteUrl('assets/icons/download.svg')} alt="upload" />
                                            <button onClick={() => stack.push(<ConfirmationDialog />)} className="text-base font-font font-[600] text-[#189ab4]"> Upload</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
            {/* </div> */}
            <div className='flex flex-col items-end justify-between w-[70%] font-font text-[#7e9eab] pr-[5%]'>
                <div></div>
                <div className='flex justify-between items-center px-10 w-[70%]'>
                    <div>Assigned To</div>
                    <div>Deadline</div>
                    <div>Creation Date</div>
                </div>
                <div className='flex justify-between items-center mt-2 px-8 w-[70%] mr-4' >
                    <AssingneeComponent />
                    <Calendar setDate={undefined} date={undefined} selectRange={false} setSelectRange={undefined} />
                    <AutomaticDate />
                </div>
                <Commentaire />
                <div className='flex items-end mt-5 mr-4'>
                    <button className='cancelBtn' onClick={HideModal}>
                        Cancel
                    </button>
                    <button className='saveBtn'>
                        Save
                    </button>
                </div>
            </div>


        </div >

    )
}
