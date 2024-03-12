/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { default as dayjs } from "dayjs";
import { useEffect } from "react";
import ScrollMenu from "react-horizontal-scroll-menu";
import './calendar.css'
import { Card } from '@material-tailwind/react';
import Dropdown from './Dropdown';

type Select = string | number | null;
type Props = {
    className: string
}

const schedule: React.FC<Props> = ({ className }) => {
    const [daysOfweek, setDaysOfWeek] = useState<dayjs.Dayjs[]>([]);
    const [selected, setSelected] = useState<Select>();
    const [customFormat, setCustomFormat] = useState<string>("dd");
    const currentDay = dayjs().format("D");

    const getCurrentWeekDays = () => {
        const weekStart = dayjs().startOf("week");

        const days = [];
        for (let i = 1; i <= 32; i++) {
            days.push(dayjs(weekStart).add(i, "days"));
        }

        return days;
    };

    useEffect(() => {
        setDaysOfWeek(getCurrentWeekDays());
    }, []);

    const MenuItem = ({ title, text, selected, key }: any) => {
        return (
            <div
                className={`menu-item dayItem   ${selected ? "active" : ""} ${currentDay === text ? "today" : null
                    }`}
                key={key}
            >
                <h5 className=" text-muted title">{title}</h5>
                <span className="text"> {text}</span>
            </div>
        );
    };

    const Menu = (selected: any) =>
        daysOfweek.map((day: any, index: number) => {
            return (
                <MenuItem
                    title={day.format(customFormat)}
                    text={day.format("D")}
                    key={index}
                    selected={selected}
                />
            );
        });



    const onSelect = (key: Select) => {
        if (key === selected) {
            setSelected(0);
        } else {
            setSelected(key);
        }
    };

    const menu = Menu(selected);



    return (
        <Card style={{ boxShadow: '1px 2px 9px #0000003D', backgroundColor: '#f5f5f5', width: '750px', height: '450px' }}>
            {/* begin::Header */}
            <div className=' pt-7 d-flex justify-content-between align-items-center'>
                <h3 className='flex items-center '>
                    <span className='card-label fw-bold ' style={{ color: '#FFCC29', marginLeft: '30px', fontSize: '20px', fontFamily: 'inherit' }}>Schedule of the Week
                    </span>
                    <div style={{ marginLeft: '430px', marginTop: '10px' }}>
                        <Dropdown />
                    </div>

                    {/* end::Menu */}

                </h3>
            </div>
            <div className='row gy-4 g-xl-9 flex items-center ' >
                <div className='col-xl-8 pt-30' style={{ width: '480px', marginTop: '20px' }}>

                    <ScrollMenu
                        data={menu}

                        selected={selected as string}
                        onSelect={onSelect}
                        scrollToSelected={true}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{
                                height: '39%',
                                borderLeft: '2px solid #FFCC29',
                                color: '#FFCC29', marginLeft: '25px', marginTop: '25px'
                            }}><span style={{ color: '#05445E', fontFamily: 'Segoe UI', fontSize: '20px', marginLeft: '15px' }}>10:30-13:00 PM<br></br>
                                    <span style={{ fontSize: '14px', marginLeft: '20px', color: '#295e75' }}>Social Media Marketing<br></br> </span>
                                    <span style={{ fontSize: '10px', marginLeft: '20px', color: '#56b4c6' }}>Lead by Mr Mark Zukerberg<br></br> </span>
                                </span><a href="#" style={{ marginLeft: '20px', textDecoration: "underline", color: '#FFCC29' }}>
                                    View
                                </a></div>
                            <div style={{
                                height: '39%',
                                borderLeft: '2px solid #56b4c6',
                                color: '#FFCC29', marginLeft: '25px', marginTop: '25px'
                            }}><span style={{ color: '#05445E', fontFamily: 'Segoe UI', fontSize: '20px', marginLeft: '15px' }}>10:30-13:00 PM<br></br>
                                    <span style={{ fontSize: '14px', marginLeft: '20px', color: '#295e75' }}>Social Media Marketing<br></br> </span>
                                    <span style={{ fontSize: '10px', marginLeft: '20px', color: '#56b4c6' }}>Lead by Mr Mark Zukerberg<br></br> </span>
                                </span><a href="#" style={{ marginLeft: '20px', textDecoration: "underline", color: '#FFCC29' }}>
                                    View
                                </a></div></div>
                        <div>
                            <div style={{
                                height: '39%',
                                borderLeft: '2px solid  #56b4c6',
                                color: '#FFCC29', marginLeft: '25px', marginTop: '25px'
                            }}><span style={{ color: '#05445E', fontFamily: 'Segoe UI', fontSize: '20px', marginLeft: '15px' }}>10:30-13:00 PM<br></br>
                                    <span style={{ fontSize: '14px', marginLeft: '20px', color: '#295e75' }}>Social Media Marketing<br></br> </span>
                                    <span style={{ fontSize: '10px', marginLeft: '20px', color: '#56b4c6' }}>Lead by Mr Mark Zukerberg<br></br> </span>
                                </span><a href="#" style={{ marginLeft: '20px', textDecoration: "underline", color: '#FFCC29' }}>
                                    View
                                </a></div>
                            <div style={{
                                height: '39%',
                                borderLeft: '2px solid #FFCC29',
                                color: '#FFCC29', marginLeft: '25px', marginTop: '25px'
                            }}><span style={{ color: '#05445E', fontFamily: 'Segoe UI', fontSize: '20px', marginLeft: '15px' }}>10:30-13:00 PM<br></br>
                                    <span style={{ fontSize: '14px', marginLeft: '20px', color: '#295e75' }}>Social Media Marketing<br></br> </span>
                                    <span style={{ fontSize: '10px', marginLeft: '20px', color: '#56b4c6' }}>Lead by Mr Mark Zukerberg<br></br> </span>
                                </span><a href="#" style={{ marginLeft: '20px', textDecoration: "underline", color: '#FFCC29' }}>
                                    View
                                </a></div></div></div>
                </div>

                <Card style={{ marginRight: 'px', marginTop: '25px', boxShadow: '1px 2px 9px #0000003D', backgroundColor: 'white', width: '220px', height: '320px', marginLeft: '35px' }}>
                    {/* begin::Header */}
                    <div className=' pt-18 pt-9 align-items-center' style={{}}>
                        <h3 className='align-items-start flex-column align-items-center '>

                            <div style={{ marginLeft: '85px' }}><svg xmlns="http://www.w3.org/2000/svg" width="44" height="47.957" viewBox="0 0 64 47.957">
                                <path id="_74fa94fa64b5cfb89a313e727db176a0" data-name="74fa94fa64b5cfb89a313e727db176a0" d="M64,257.257a3.5,3.5,0,0,1-1.056,2.248L51.5,272.993a11.55,11.55,0,0,1-4.1,2.946,11.824,11.824,0,0,1-4.888,1.209H5.45a4.62,4.62,0,0,1-2.061-.443,1.514,1.514,0,0,1-.9-1.465,3.5,3.5,0,0,1,1.056-2.248l11.444-13.488a11.55,11.55,0,0,1,4.1-2.946,11.824,11.824,0,0,1,4.888-1.209H61.037a4.62,4.62,0,0,1,2.061.443A1.514,1.514,0,0,1,64,257.257ZM52.317,245.54v5.45H23.979a16.021,16.021,0,0,0-6.71,1.618,15.9,15.9,0,0,0-5.586,4.07L.2,270.166l-.17.2q0-.136-.017-.426T0,269.519v-32.7a7.342,7.342,0,0,1,2.248-5.382,7.342,7.342,0,0,1,5.382-2.248h10.9a7.342,7.342,0,0,1,5.382,2.248,7.342,7.342,0,0,1,2.248,5.382v1.09H44.688a7.676,7.676,0,0,1,7.63,7.63Z" transform="translate(0 -229.191)" fill="#ffcc29" />
                            </svg><br></br></div>
                            <div className=' card-title  pt-3'>
                                <span style={{ marginTop: '70px', color: '#05445E', fontSize: '18px', marginLeft: '70px' }}>My folders
                                </span>
                            </div>
                        </h3>
                    </div>
                    <div className='border-9 pt-5 align-items-center'>
                        <h2 style={{ color: '#295e75', fontSize: '13px', textAlign: 'center', fontFamily: 'Segoe UI' }} className='card-title align-items-start flex-column  '>
                            Here you can find all your<br></br> uploaded , saved and sent<br></br> Foldres ,Files and documents </h2 > </div>
                    <div className='border-9 pt-1 align-items-center'>
                        <button
                            type='submit'
                            id='kt_sign_in_submit'
                            style={{ textDecoration: "underline", marginLeft: '62px', backgroundColor: 'white', border: '0px solid white', borderRadius: '0px', width: '65px', height: '30px', fontFamily: 'Segoe UI', fontWeight: 'bold', color: '#FFCC29', marginTop: '15px' }}
                        >
                            <span className='indicator-label'>Check It  </span>
                        </button></div>
                </Card>


            </div>

            {/* begin::Item */}

            {/* end::Header */}

            {/* end::Body */}

        </Card>
    )
}
export default schedule;
