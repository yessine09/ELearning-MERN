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

const scheduleMent: React.FC<Props> = ({ className }) => {
    

  
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
                            </div></div>
                </div>

                <Card style={{ boxShadow: '1px 2px 9px #0000003D', backgroundColor: 'white', width: '220px', height: '320px', marginLeft: '35px' }}>
                    {/* begin::Header */}
                    <div className=' pt-5 align-items-center' style={{}}>
                        <h3 className='align-items-start flex-column align-items-center '>

                            <div style={{ marginLeft: '85px' }}>
                                <img src='/assets/icons/videoCall.svg'></img><br></br></div>
                            <div style={{marginTop:'-10px'}}>
                                <span style={{ fontWeight:'600',color: '#05445E', fontSize: '18px', marginLeft: '50px' }}>One To One Call
                                </span><br></br>
                                <span style={{ fontSize: '13px', marginLeft: '60px', color: '#56b4c6',fontWeight:'600' }}>With Nawel Eoussi<br></br> </span>
                                
                            </div>
                        </h3>
                    </div>
                    <div className='border-9 pt-5 align-items-center'>
                    <h1  style={{ color: '#05445e',marginLeft:'80px',fontWeight:'600' }}>Subject</h1>
                      <span style={{fontSize:'13px',color: '#05445e',marginLeft:'40px'}}>How to make blur effect <br></br><span style={{marginLeft:'20px'}}>on photoshop and illustrator ?</span></span>  
                        <button
                            type='submit'
                            id='kt_sign_in_submit'
                            style={{ textDecoration: "underline", marginLeft: '62px', backgroundColor: 'white', border: '0px solid white', borderRadius: '0px', width: '65px', height: '30px', fontFamily: 'Segoe UI', fontWeight: 'bold', color: '#FFCC29', marginTop: '15px' }}
                        >
                            <span className='indicator-label '>Check It  </span>
                        </button></div>
                </Card>


            </div>

            {/* begin::Item */}

            {/* end::Header */}

            {/* end::Body */}

        </Card>
    )
}
export default scheduleMent;
