/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'

type Props = {
    className: string
}

const Tasks: React.FC<Props> = ({ className }) => {

    useEffect(() => {
        const fetchShaperData = async () => {

        };

        fetchShaperData();

    }, []);




    return (
        <Card style={{ boxShadow: '1px 2px 4px #0000003D', backgroundColor: '#dbf1f4', width: '350px', height: '250px' }}>
            {/* begin::Header */}
            <div className=' pt-7 flex items-center'>
                <h3 style={{ marginLeft: '10px' }} className='card-title align-items-start flex-column '>
                    <span className='card-label fw-bold ' style={{ color: '#3699ff', marginLeft: '25px', fontSize: '20px' }}>My Task
                    </span>
                </h3>
                <div className='card-toolbar ' style={{ marginLeft: '165px', marginTop: '10px' }}>

                    <Dropdown />


                </div>


            </div>
            <div className='card-body p-6'>

                <div className=' d-flex align-items-center mb-9'>


                    <div className='m-2'>
                        <span style={{ color: '#05445E', fontSize: '19px', fontWeight: 'lighter', fontFamily: 'Segoe UI' }}>You have </span ><a href='#' style={{ color: '#FFCC29', textDecoration: 'underline', fontWeight: 'bold', fontSize: '17px', fontFamily: 'Segoe UI' }}>
                            8 Tasks
                        </a><span style={{ color: '#05445E', fontSize: '19px', fontWeight: 'lighter', fontFamily: 'Segoe UI' }} > to do </span><span style={{ color: '#05445E', fontSize: '20px', fontFamily: 'Segoe UI', fontWeight: '' }}><br></br>This week</span>
                    </div>
                </div>
                <div className="flex items-center  gap-5 xl:gap-9 pt-0 justify-between " style={{ marginTop: '-160px' }}>
                    <div className="shadow-md rounded-2xl bg-white mt-40 ml-10" style={{ width: '270px', height: '130px', marginLeft: '6px' }}>
                        <div className=" pt-5">
                            <h3 className="card-title flex items-center">
                                <span className="ml-4">
                                    <img src="/assets/icons/courses.svg" />
                                </span>
                            </h3>
                            <span className="card-label  ml-9" style={{ color: '#05445E', marginLeft: '18px', fontSize: '40px' }}>4</span>

                        </div>
                        <div className="pt-1">
                            <div className="flex items-center mb-7">
                                <span className="text-blue-900 text-lg font-light ml-4">Courses</span>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-md rounded-2xl bg-white mt-40 ml-10" style={{ width: '270px', height: '130px', marginLeft: '6px' }}>
                        <div className=" pt-5">
                            <h3 className="card-title flex items-center">
                                <span className="ml-4">
                                    <img src="/assets/icons/lettre.svg" />
                                </span>
                            </h3>
                            <span className="card-label  ml-9" style={{ color: '#05445E', marginLeft: '18px', fontSize: '40px' }}>4</span>

                        </div>
                        <div className="">
                            <div className="flex items-center mb-7">
                                <span className="text-blue-900 text-lg font-light ml-4 ">Projects</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Card>)
}

export default Tasks
