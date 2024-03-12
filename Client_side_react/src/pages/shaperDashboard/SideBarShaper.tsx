import React, { useEffect, useState } from 'react';
import { toAbsoluteUrl } from '../../helpers/AssetHelpers';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';
import Cookies from 'js-cookie';
import { getshaperprograms } from '../../api/enrollment';
import { getProjectsByClient } from '../../api/projects';

interface Submenu {
    key?: string;
    title: string;
    path?: string;
    submenus?: Submenu[];
    onClick?: () => void;
}

interface Menu {
    title: string;
    submenus: Submenu[];
}


const Sidebar: React.FC = () => {
    const userId = Cookies.get('userId');
    const [shaperPrograms, setShaperPrograms] = useState([]);
    const [shaperprojects, setShaperProjects] = useState([]);

    useEffect(() => {
        const fetchShaperData = async () => {
            const shaperCourses = await getshaperprograms(userId);
            // const shaperProjects = await getProjectsByClient(userId);
            setShaperPrograms(shaperCourses);
            // setShaperProjects(shaperProjects);
        };
        fetchShaperData();
    }, [userId]);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    const [activeSubsubmenu, setActiveSubsubmenu] = useState<boolean>(false);
    const { logoutUser } = useAuth();

    const toggleSubmenu = (index: number) => {
        if (activeSubmenu === index) {
            setActiveSubmenu(null);
        } else {
            setActiveSubmenu(index);
        }
    };
    const toggleSubsubmenu = (index: number) => {
        if (activeSubmenu === index) {
            setActiveSubsubmenu(true);
        } else {
            setActiveSubsubmenu(false);
        }
    };

    const menus: Menu[] = [
        {
            title: 'Courses',
            submenus: [
                {
                    title: "Course Session",
                    path: "/course/session",
                    submenus: shaperPrograms.map((program) => ({
                        key: program.id,
                        title: `${program.title}`,
                        path: `/course/${program.id}`,
                    })),
                },
                {
                    title: 'Course Documents',
                    path: '/course-document',
                },
                {
                    title: 'Meet Your Mentor',
                    path: '/meet-your-mentor',
                },
            ],

        },
        {
            title: 'Project Management',
            submenus: shaperPrograms.map((project) => ({
                key: project.id,
                title: `${project.title}`,
                path: `/project/${project.id}`,
            })),
        },
        {
            title: 'Profile Matching',
            submenus: [
                {
                    title: 'Company Matching',
                    path: '/company-matching',
                },
                {
                    title: 'Application History',
                    path: '/application-history',
                },
                {
                    title: 'Saved',
                    path: '/saved',
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
                    title: 'Language',
                    path: '/Language',
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
        },
    ];

    return (
        <div className="flex bg-cover bg-repeat-y drop-shadow-2xl flex-col"
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
            <Link to="/profile">
                <div className='ml-12' > <h3 className=' text-xl pt-6 font-font text-darkBlue' style={{ fontWeight: '700' }}>Home</h3> </div>
            </Link>
            <div className="w-[310px] h-[200vh] px-8">
                {/* {menus.map((menu, index) => ( */}
                    <div key={menu.title}>
                        <div
                            className="flex justify-between items-center cursor-pointer p-4"
                            onClick={() => toggleSubmenu(index)}
                        >
                            <div>
                                <h3 className="text-lg pt-6 font-bold text-darkBlue">{menu.title}</h3>
                            </div>
                            <div>
                                <svg
                                    className={`transform ${activeSubmenu === index ? 'rotate-180' : ''
                                        } mt-5`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="21"
                                    height="20"
                                >
                                    <path
                                        id="_05d672bf2ec15f434a544f7a2214100f"
                                        data-name="05d672bf2ec15f434a544f7a2214100f"
                                        d="M20.5,11.5l-6,6-6-6"
                                        transform="rotate(0)"
                                        fill="none"
                                        stroke="#05445e"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                        </div>
                        {activeSubmenu === index && (
                            <div className="pl-8">
                                {menu.submenus.map((submenu, index) => (
                                    <React.Fragment key={submenu.title}>
                                        {submenu.title === 'Course Session' ? (
                                            <React.Fragment>
                                                <div
                                                    className="flex justify-between items-center cursor-pointer  py-2 text-[14px] font-font font-semibold text-darkBlue hover:font-bold hover:font-font"
                                                    onClick={() => toggleSubsubmenu(index)}
                                                >
                                                    <div>
                                                        <span className="w-1 h-1 mr-2 bg-darkBlue rounded-full inline-block"> </span>
                                                        {submenu.title}
                                                    </div>
                                                    <div>
                                                        <svg
                                                            className={`transform ${activeSubsubmenu === true ? 'rotate-180' : ''
                                                                } mt-0`}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="21"
                                                            height="20"
                                                        >
                                                            <path
                                                                id="_05d672bf2ec15f434a544f7a2214100f"
                                                                data-name="05d672bf2ec15f434a544f7a2214100f"
                                                                d="M20.5,11.5l-6,6-6-6"
                                                                transform="rotate(0)"
                                                                fill="none"
                                                                stroke="#05445e"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeMiterlimit="10"
                                                                strokeWidth="2"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                {activeSubsubmenu === true &&
                                                    <ul>

                                                        {submenu.submenus.map(subsubmenu => (
                                                            <li key={subsubmenu.key}>
                                                                <Link
                                                                    to={subsubmenu.path}
                                                                    className="block text-[14px] ml-[10%] font-font font-semibold text-darkBlue hover:font-bold hover:font-font"
                                                                    onClick={subsubmenu.onClick}
                                                                >
                                                                    <span className="w-1 h-1 mr-2 rounded-full bg-darkBlue inline-block"></span>
                                                                    {subsubmenu.title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </React.Fragment>
                                        ) : (

                                            <Link
                                                to={submenu.path}
                                                className="block py-2 text-[14px] font-font font-semibold text-darkBlue hover:font-bold hover:font-font"
                                                onClick={submenu.onClick}
                                            >
                                                <span className="w-1 h-1 mr-2 rounded-full bg-darkBlue inline-block"></span>
                                                {submenu.title}
                                            </Link>

                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                {/* ))} */}
            </div>

        </div>
    );
};

export default Sidebar;






