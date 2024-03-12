import { toAbsoluteUrl } from "../../helpers/AssetHelpers";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';


interface Submenu {
    title: string;
    path?: string;
    onClick?: () => void;
}

interface Menu {
    title: string;
    submenus: Submenu[];
}
export default function AdminSideBar() {
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    const { logoutUser } = useAuth();
    // const userId = Cookies.get('userId');
    // const [shaperPrograms, setShaperPrograms] = useState([]);
    // const [shaperprojects, setShaperProjects] = useState([]);

    // useEffect(() => {
    //     const fetchShaperData = async () => {
    //         const shaperCourses = await getprogrambymentor(userId);
    //         setShaperPrograms(shaperCourses);
    //     };
    //     fetchShaperData();
    // }, [userId]);

    const toggleSubmenu = (index: number) => {
        if (activeSubmenu === index) {
            setActiveSubmenu(null);
        } else {
            setActiveSubmenu(index);
        }
    };
    const menus: Menu[] = [
        {
            title: 'Corporate Management',
            submenus: [
                {
                    title: 'Shapers',
                    path: '/shapers/',
                },
                {
                    title: 'Mentor',
                    path: '/mentors/',
                }, {
                    title: 'Business',
                    path: '/business/',
                },
            ],
        },
        {
            title: 'Project Managment',
            submenus: [
                {
                    title: 'Course 1',
                    path: '/course-1',
                },
                {
                    title: 'Course 2',
                    path: '/course-2',
                },
            ],
        },
        {
            title: 'Matching',
            submenus: [
                {
                    title: 'Course 1',
                    path: '/course-1',
                },
                {
                    title: 'Course 2',
                    path: '/course-2',
                },
            ],
        }, {
            title: 'statics',
            submenus: [
                {
                    title: 'mathing statics',
                    path: '/course-1',
                },
                {
                    title: 'recrutment statics',
                    path: '/course-2',
                },
            ],
        },
        {
            title: 'Settings',
            submenus: [
                {
                    title: 'Profile Settings',
                    path: '/profile-settings',
                },
                {
                    title: 'Account Settings',
                    path: '/account-settings',
                },
                {
                    title: 'Payment',
                    path: '/payment',
                },
                {
                    title: 'Notification',
                    path: '/notification',
                },
                {
                    title: 'More',
                    path: '/more',
                },
                {
                    title: 'Log out',
                    onClick: logoutUser,
                },
            ],
        }
    ];
    return (
        <div className="flex bg-cover bg-repeat-y drop-shadow-2xl h-fit flex-col"
            style={{
                backgroundImage: `url(${toAbsoluteUrl('/assets/images/bg/menu.png')})`,
            }}
        >

            <div className='flex flex-col items-center h-44'>
                <img
                    className='w-[120px] h-[100px] relative'
                    src={toAbsoluteUrl('/assets/images/logos/logo.png')}
                    alt='logo'
                />
                <h1 className='text-fancyYellow font-font font-semibold absolute mt-2 top-[4%]'>Workspace</h1>

            </div>

            <div className='ml-12' > <h3 className=' text-xl pt-6 font-font text-darkBlue' style={{ fontWeight: '700' }}>Home</h3> </div>

            <div
                className="w-[310px] h-[200vh]  px-8"
            >
                {menus.map((menu, index) => (
                    <div key={menu.title}>
                        <div
                            className="flex justify-between items-center cursor-pointer p-4"
                            onClick={() => toggleSubmenu(index)}
                        >
                            <div><h3 className="text-lg pt-6 font-bold text-darkBlue">{menu.title}</h3></div>
                            <div>
                                <svg
                                    className={`transform ${activeSubmenu === index ? 'rotate-180' : ''
                                        } mt-5`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="21"
                                    height="20"
                                >
                                    <path id="_05d672bf2ec15f434a544f7a2214100f"
                                        data-name="05d672bf2ec15f434a544f7a2214100f"
                                        d="M20.5,11.5l-6,6-6-6"
                                        transform="rotate(0)"
                                        fill="none"
                                        stroke="#05445e"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        strokeWidth="2" />
                                </svg>
                            </div>
                        </div>
                        {activeSubmenu === index && (
                            <div className="pl-8">
                                {menu.submenus.map((submenu, index) => (
                                    <Link
                                        key={submenu.title}
                                        to={submenu.path}
                                        className="block py-2 text-[14px] font-font font-semibold text-darkBlue hover:font-bold hover:font-font"
                                        onClick={submenu.onClick}
                                    >
                                        <span className="w-1 h-1 mr-2 rounded-full bg-darkBlue inline-block"></span>
                                        {submenu.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
