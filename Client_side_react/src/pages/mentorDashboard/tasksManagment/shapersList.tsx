import { Fragment, useEffect, useRef, useState } from "react";
import { getTasksByClient } from "../../../api/tasks";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { getusersbyprogram } from "../../../api/mentor";
import { Menu, Transition } from "@headlessui/react";
import { useContext } from "react";
import { selectShaperContext } from "./MentorProjectManagment";
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
function shapersList() {
    const [shapersList, setShapersList] = useState([]);
    const { selectedShaper, setSelectedShaper } = useContext(selectShaperContext);
    const { course } = useParams();
    useEffect(() => {
        const fetchShapers = async () => {
            const shapers = await getusersbyprogram(course);
            setShapersList(shapers)
        };
        fetchShapers();
    }, [course]);

    const handleShaperClick = async (shaperId: any) => {
        setSelectedShaper(shaperId);
    };

    return (
        <div className=" ">
            <Menu as="div" className=" relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex items-center justify-center text-darkBlue font-semibold px-3 py-2  text-[20px]  ">
                        All Shapers Tasks
                        <div>
                            <svg
                                className={`transform 'rotate-180' mt-[2px] ml-[2px]`}
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
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 left-2 z-15 mt-1 w-40  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {shapersList.map((shaper: any) => (
                                <Menu.Item >
                                    {({ active }) => (
                                        <div
                                            onClick={() => handleShaperClick(shaper.id)}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-blue-900' : 'text-gray-400',
                                                'block px-4 py-2 z-45'
                                            )}
                                        >
                                            {shaper.firstName + " " + shaper.lastName}
                                        </div>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default shapersList