import { FunctionComponent, createContext, useEffect, useState } from "react";
import { Button, Card } from "@material-tailwind/react";
import Sidebar from "../../SideBarShaper";
import Cookies from "js-cookie";
import CustomMenu from "../../../../components/CustomMenu";
import { getprogrambyid } from "../../../../api/enrollment";
import { useParams } from 'react-router-dom';
import { getTasksByClient, getTasksByClientAndStatus, getTasksByProgramAndStatus } from "../../../../api/tasks";

import { useStack } from "../../../../contexts/Stack";
import Lesson from "./CoursesStepper";
import SearchBar from "./SearchBar";
import Dropdown from "./DropdownMenu";
import CourseTasks from "./CourseTasks";
import UploadTask from "./UploadTask";

interface filterContextType {
    filterOption: string;
    setfilterOption: (filterOption: string) => void;
}
export const filterContext = createContext<filterContextType>({
    filterOption: "status",
    setfilterOption: () => { },
});
interface lessonContextType {
    lessonSelected: string;
    setselectedlesson: (lessonid: string) => void;
}
export const lessonContext = createContext<lessonContextType>({
    lessonSelected: "All",
    setselectedlesson: () => { },
});
const now = new Date();
const ProjectManagment: FunctionComponent = () => {
    const [lessonSelected, setselectedlesson] = useState("All");
    const { projectId } = useParams();
    const userId = Cookies.get('userId');
    const [openTasks, setOpenTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [reviewTasks, setReviewTasks] = useState([]);
    const [closedTasks, setClosedTasks] = useState([]);
    const [program, setProgram] = useState([]);
    const [filterOption, setfilterOption] = useState("status");
    const [lateTasks, setlateTasks] = useState([]);
    const [tomorrowTasks, settomorrowTasks] = useState([]);
    const [comingTasks, setcomingTasks] = useState([]);
    const stack = useStack();
    useEffect(() => {
        const fetchShaperData = async () => {
            const opentasks = await getTasksByClientAndStatus(userId, 'Open');
            const inprogresstasks = await getTasksByClientAndStatus(userId, 'InProgress');
            const reviewtasks = await getTasksByClientAndStatus(userId, 'Review');
            const closedtasks = await getTasksByClientAndStatus(userId, 'Closed');
            const program = await getprogrambyid(projectId);
            const tasks = await getTasksByClient(userId);

            const lateTasks = tasks.filter((task: { dueDate: Date; }) => {
                const deadline = new Date(task.dueDate);
                return deadline < now;
            });

            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const tomorrowTasks = tasks.filter((task: { dueDate: Date; }) => {
                const deadline = new Date(task.dueDate);
                return deadline >= tomorrow && deadline < tomorrow.setDate(tomorrow.getDate() + 1);
            });

            const comingTasks = tasks.filter((task: { dueDate: Date; }) => {
                const deadline = new Date(task.dueDate);
                return deadline > tomorrow;
            });
            setProgram(program);
            setOpenTasks(opentasks);
            setInProgressTasks(inprogresstasks);
            setReviewTasks(reviewtasks);
            setClosedTasks(closedtasks);
            setlateTasks(lateTasks);
            settomorrowTasks(tomorrowTasks);
            setcomingTasks(comingTasks);


        };
        fetchShaperData();
        console.log(filterOption);
        console.log(lessonSelected);
    }, [filterOption, lessonSelected, projectId]);



    return (
        <filterContext.Provider value={{ filterOption, setfilterOption }}>

            <lessonContext.Provider value={{ lessonSelected, setselectedlesson }}>
                <div className="flex h-fit" >
                    <Sidebar />
                    <div className="flex-1 pl-[4%] bg-gray-100">
                        <CustomMenu title="Projects" program={program.title} />
                        <Lesson />
                        <div className="flex items-center mt-12 mx-12" >
                            <span style={{ color: '#3699ff', fontFamily: 'Segoe UI', fontSize: '22px', fontWeight: '500' }}>TASKS</span>
                            <SearchBar />
                            <div className="flex items-center justify-between">
                                <Dropdown />

                                <a href="#InProgress"><div className="ml-10 mr-3 font-font text-[18px] text-[#3699ff]" > In progress </div></a>
                                <a href="#Review"><div className="mx-3 font-font text-[18px] text-[#3699ff]" > Review </div></a>
                                <a href="#Closed"><div className="mx-3 font-font text-[18px] text-[#3699ff]" > Closed </div></a>
                            </div>

                        </div>
                        {lessonSelected == "All" &&
                            filterOption === "status" &&
                            <div>
                                <div className="flex flex-col items-start " >
                                    <div className="mt-[7%] flex items-center">
                                        <Button style={{ backgroundColor: '#f6db86', height: '45px', width: '150px', display: 'flex', alignItems: 'center', paddingBottom: '7px' }} >
                                            <img src='/assets/icons/p4fleches.svg' />
                                            <span className="lowercase" style={{ fontWeight: '500', textTransform: 'capitalize', color: '#05445E', fontSize: '22px' }}>Open </span>
                                        </Button>
                                        <span style={{ color: '#8ca8b3', marginLeft: '25px', fontWeight: '400', fontSize: '27px' }} > {openTasks.length} Tasks </span>
                                    </div>
                                    {openTasks.length > 0 &&
                                        <Card style={{ backgroundColor: "transparent", marginTop: "30px", boxShadow: "none", position: "relative" }} >
                                            <div style={{ color: '#8ca8b3', marginLeft: '740px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Deadline</div>
                                            <div style={{ color: '#8ca8b3', marginLeft: '840px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Creation Date </div>
                                            {openTasks.map((task) => (
                                                <div key={task._id} style={{ marginBottom: "10px" }} >
                                                    <div className=" flex center-items rounded-xl " onClick={() => stack.push(<UploadTask taskid={task._id} HideModal={() => stack.pop()} />)} style={{ marginTop: '8px', marginLeft: '10px', height: "100px", backgroundColor: 'white', width: '1000px', borderRadius: '17', boxShadow: '1px 2px 9px #0000003D' }}>
                                                        <div className="flex flex-col items-start">
                                                            <div className=" flex center-items mt-[6%]">
                                                                <button style={{ backgroundColor: '#f6db86', height: '38px', width: '40px', borderRadius: '7px', marginLeft: '12px' }}>
                                                                    <img src='/assets/icons/p4fleches.svg' className="h-[17px] w-[17px]" alt="ticket" style={{ fontSize: 'px', marginLeft: '10px' }} />
                                                                </button>
                                                                <div className="font-normal  text-xl w-auto" style={{ marginTop: 'px', color: '#05445E', marginLeft: '15px', fontWeight: '500' }}>
                                                                    {task.title}{" "}<br></br>
                                                                </div>
                                                            </div>
                                                            <div className=" not-italic text-[15px] ml-[65px] text-darkBlue font-[400] text-left w-full">
                                                                {task.description}{" "}
                                                            </div>

                                                        </div>
                                                        <div className="flex ml-[36%]">
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#FFCC29', paddingRight: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.dueDate).toLocaleString('en-US', { day: 'numeric', month: 'long' })}                                    </div>
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#05445E', paddingLeft: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Card>
                                    }
                                </div>

                                <div id="InProgress" className="flex flex-col items-start mt-8 " >
                                    <div className="flex items-center">
                                        <Button style={{ backgroundColor: '#feb422', height: '45px', width: '200px', display: 'flex', alignItems: 'center', paddingBottom: '7px' }}>
                                            <img src='/assets/icons/ploading.svg' />
                                            <span className="lowercase" style={{ fontWeight: '500', marginTop: '-4px', textTransform: 'capitalize', color: '#05445E', fontSize: '22px', marginLeft: '10px', fontFamily: '' }}>In Progress  </span>
                                        </Button>
                                        <span style={{ color: '#8ca8b3', marginLeft: '25px', fontWeight: '400', fontSize: '27px' }} > {inProgressTasks.length} Task </span>

                                    </div>
                                    {inProgressTasks.length > 0 &&

                                        <Card style={{ backgroundColor: "transparent", marginTop: "30px", boxShadow: "none" }}>
                                            <div style={{ color: '#8ca8b3', marginLeft: '740px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Deadline</div>
                                            <div style={{ color: '#8ca8b3', marginLeft: '840px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Creation Date </div>

                                            {inProgressTasks.map((task) => (
                                                <div key={task._id} style={{ marginBottom: "10px" }} >
                                                    <div className=" flex center-items rounded-xl  " onClick={() => stack.push(<UploadTask taskid={task._id} HideModal={() => stack.pop()} />)} style={{ marginTop: '8px', marginLeft: '10px', height: "100px", backgroundColor: 'white', width: '1000px', borderRadius: '17', boxShadow: '1px 2px 9px #0000003D' }}>
                                                        <div className="flex flex-col items-start">
                                                            <div className=" flex center-items mt-[6%]">
                                                                <button style={{ backgroundColor: '#feb422', height: '38px', width: '40px', borderRadius: '7px', marginLeft: '12px' }}>
                                                                    <img src='/assets/icons/ploading.svg' className="h-[17px] w-[17px]" alt="ticket" style={{ fontSize: 'px', marginLeft: '12px' }} />
                                                                </button>
                                                                <div className="font-normal  text-xl w-auto" style={{ marginTop: 'px', color: '#05445E', marginLeft: '15px', fontWeight: '500' }}>
                                                                    {task.title}{" "}<br></br>
                                                                </div>
                                                            </div>
                                                            <div className=" not-italic text-[15px] ml-[65px] text-darkBlue font-[400] text-left w-full">
                                                                {task.description}{" "}
                                                            </div>

                                                        </div>
                                                        <div className="flex ml-[36%]">
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#fe3e29', paddingRight: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.dueDate).toLocaleString('en-US', { day: 'numeric', month: 'long' })}                                    </div>
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#05445E', paddingLeft: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Card>
                                    }
                                </div>


                                <div id="Review" className="flex flex-col items-start mt-8 " >
                                    <div className=" flex items-center">

                                        <Button style={{ backgroundColor: '#d4f1f4', height: '45px', width: '170px', display: 'flex', alignItems: 'center', paddingBottom: '7px' }}>
                                            <img src='/assets/icons/petoile.svg' />
                                            <span className="lowercase" style={{ fontWeight: '500', marginTop: '-4px', textTransform: 'capitalize', color: '#05445E', fontSize: '24px', marginLeft: '10px', fontFamily: '' }}> Review </span>
                                        </Button>
                                        <span style={{ color: '#8ca8b3', marginLeft: '25px', fontWeight: '400', fontSize: '27px' }} > {reviewTasks.length} Task </span>

                                    </div>
                                    {reviewTasks.length > 0 &&

                                        <Card style={{ backgroundColor: "transparent", marginTop: "30px", boxShadow: "none" }}>
                                            <div style={{ color: '#8ca8b3', marginLeft: '740px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Deadline</div>
                                            <div style={{ color: '#8ca8b3', marginLeft: '840px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Creation Date </div>
                                            {reviewTasks.map((task) => (
                                                <div key={task._id} style={{ marginBottom: "10px" }} >
                                                    <div className=" flex center-items rounded-xl " onClick={() => stack.push(<UploadTask taskid={task._id} HideModal={() => stack.pop()} />)} style={{ marginTop: '8px', marginLeft: '10px', height: "100px", backgroundColor: 'white', width: '1000px', borderRadius: '17', boxShadow: '1px 2px 9px #0000003D' }}>
                                                        <div className="flex flex-col items-start">
                                                            <div className=" flex center-items mt-[6%]">
                                                                <button style={{ backgroundColor: '#d4f1f4', height: '38px', width: '40px', borderRadius: '7px', marginLeft: '12px' }}>
                                                                    <img src='/assets/icons/petoile.svg' className="h-[17px] w-[17px]" alt="ticket" style={{ fontSize: 'px', marginLeft: '10px' }} />
                                                                </button>
                                                                <div className="font-normal  text-xl w-auto" style={{ marginTop: 'px', color: '#05445E', marginLeft: '15px', fontWeight: '500' }}>
                                                                    {task.title}{" "}<br></br>
                                                                </div>
                                                            </div>
                                                            <div className=" not-italic text-[15px] ml-[65px] text-darkBlue font-[400] text-left w-full">
                                                                {task.description}{" "}
                                                            </div>

                                                        </div>
                                                        <div className="flex ml-[36%]">
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#d4f1f4', paddingRight: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.dueDate).toLocaleString('en-US', { day: 'numeric', month: 'long' })}                                    </div>
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#05445E', paddingLeft: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Card>
                                    }
                                </div>
                                {/* tasks closed section  */}
                                <div id="Closed" className="flex flex-col items-start mt-8 " >
                                    <div className="flex items-center">
                                        <Button style={{ backgroundColor: '#42ff75', height: '45px', width: '150px', display: 'flex', alignItems: 'center', paddingBottom: '7px' }}>
                                            <img src='/assets/icons/pteck.svg' />
                                            <span className="lowercase" style={{ fontWeight: '500', marginTop: '-4px', textTransform: 'capitalize', color: '#05445E', fontSize: '24px', marginLeft: '10px', fontFamily: '' }}>Closed  </span>
                                        </Button>
                                        <span style={{ color: '#8ca8b3', marginLeft: '25px', fontWeight: '400', fontSize: '27px' }} > {closedTasks.length} Task </span>
                                    </div>
                                    {closedTasks.length > 0 &&
                                        <Card style={{ backgroundColor: "transparent", marginTop: "30px", boxShadow: "none" }}>
                                            <div style={{ color: '#8ca8b3', marginLeft: '740px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Deadline</div>
                                            <div style={{ color: '#8ca8b3', marginLeft: '840px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Creation Date </div>

                                            {closedTasks.map((task) => (
                                                <div key={task._id} style={{ marginBottom: "10px" }} >
                                                    <div className=" flex center-items rounded-xl " onClick={() => stack.push(<UploadTask taskid={task._id} HideModal={() => stack.pop()} />)} style={{ marginTop: '8px', marginLeft: '10px', height: "100px", backgroundColor: 'white', width: '1000px', borderRadius: '17', boxShadow: '1px 2px 9px #0000003D' }}>
                                                        <div className="flex flex-col items-start">
                                                            <div className=" flex center-items mt-[6%]">
                                                                <button style={{ backgroundColor: '#42ff75', height: '38px', width: '40px', borderRadius: '7px', marginLeft: '12px' }}>
                                                                    <img src='/assets/icons/pteck.svg' className="h-[17px] w-[17px]" alt="ticket" style={{ fontSize: 'px', marginLeft: '10px' }} />
                                                                </button>
                                                                <div className="font-normal  text-xl w-auto" style={{ marginTop: 'px', color: '#05445E', marginLeft: '15px', fontWeight: '500' }}>
                                                                    {task.title}{" "}<br></br>
                                                                </div>
                                                            </div>
                                                            <div className=" not-italic text-[15px] ml-[65px] text-darkBlue font-[400] text-left w-full">
                                                                {task.description}{" "}
                                                            </div>

                                                        </div>
                                                        <div className="flex ml-[36%]">
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#42ff75', paddingRight: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.dueDate).toLocaleString('en-US', { day: 'numeric', month: 'long' })}                                    </div>
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#05445E', paddingLeft: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Card>
                                    }
                                </div>
                            </div>
                        }
                        {
                            lessonSelected == "All" &&
                            filterOption === "deadline" &&
                            <div>


                                <div className="flex flex-col items-start " >
                                    <div className="mt-[7%] ml-4 flex items-center">
                                        <span style={{ height: '45px', width: '130px', display: 'flex', alignItems: 'center', paddingBottom: '8px' }} >
                                            <span className="lowercase" style={{ fontWeight: '700', textTransform: 'capitalize', color: '#fe3e29', fontSize: '22px' }}>Late Work </span>
                                        </span>
                                        <span style={{ color: '#8ca8b3', fontWeight: '400', fontSize: '18px' }} > {openTasks.length} Tasks </span>
                                    </div>
                                    {lateTasks.length > 0 &&
                                        <Card style={{ backgroundColor: "transparent", marginTop: "15px", boxShadow: "none" }}>
                                            <div style={{ color: '#fe3e29', marginLeft: '740px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Deadline</div>
                                            <div style={{ color: '#8ca8b3', marginLeft: '840px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Creation Date </div>
                                            {lateTasks.map((task) => (
                                                <div key={task._id} style={{ marginBottom: "10px" }} >
                                                    <div className=" flex center-items rounded-xl " onClick={() => stack.push(<UploadTask taskid={task._id} HideModal={() => stack.pop()} />)} style={{ marginTop: '8px', marginLeft: '10px', height: "100px", backgroundColor: 'white', width: '1000px', borderRadius: '17', boxShadow: '1px 2px 9px #0000003D' }}>
                                                        <div className="flex flex-col items-start">
                                                            <div className=" flex center-items mt-[6%]">
                                                                <button style={{ backgroundColor: '#f6db86', height: '38px', width: '40px', borderRadius: '7px', marginLeft: '12px' }}>
                                                                    <img src='/assets/icons/p4fleches.svg' className="h-[17px] w-[17px]" alt="ticket" style={{ fontSize: 'px', marginLeft: '10px' }} />
                                                                </button>
                                                                <div className="font-normal  text-xl w-auto" style={{ marginTop: 'px', color: '#05445E', marginLeft: '15px', fontWeight: '500' }}>
                                                                    {task.title}{" "}<br></br>
                                                                </div>
                                                            </div>
                                                            <div className=" not-italic text-[15px] ml-[65px] text-darkBlue font-[400] text-left w-full">
                                                                {task.description}{" "}
                                                            </div>

                                                        </div>
                                                        <div className="flex ml-[36%]">
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#fe3e29', paddingRight: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.dueDate).toLocaleString('en-US', { day: 'numeric', month: 'long' })}                                    </div>
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#05445E', paddingLeft: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Card>
                                    }

                                </div>


                                <div className="flex flex-col items-start " >
                                    <div className="mt-[7%] ml-4 flex items-center">
                                        <span style={{ height: '45px', width: '130px', display: 'flex', alignItems: 'center', paddingBottom: '8px' }} >
                                            <span className="lowercase" style={{ fontWeight: '700', textTransform: 'capitalize', color: '#f6db86', fontSize: '22px' }}> tomorrow </span>
                                        </span>
                                        <span style={{ color: '#8ca8b3', fontWeight: '400', fontSize: '18px' }} > {openTasks.length} Tasks </span>
                                    </div>
                                    {tomorrowTasks.length > 0 &&
                                        <Card style={{ backgroundColor: "transparent", marginTop: "15px", boxShadow: "none" }}>
                                            <div style={{ color: '#8ca8b3', marginLeft: '740px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Deadline</div>
                                            <div style={{ color: '#8ca8b3', marginLeft: '840px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Creation Date </div>
                                            {tomorrowTasks.map((task) => (
                                                <div key={task._id} style={{ marginBottom: "10px" }} >
                                                    <div className=" flex center-items rounded-xl " onClick={() => stack.push(<UploadTask taskid={task._id} HideModal={() => stack.pop()} />)} style={{ marginTop: '8px', marginLeft: '10px', height: "100px", backgroundColor: 'white', width: '1000px', borderRadius: '17', boxShadow: '1px 2px 9px #0000003D' }}>
                                                        <div className="flex flex-col items-start">
                                                            <div className=" flex center-items mt-[6%]">
                                                                <button style={{ backgroundColor: '#f6db86', height: '38px', width: '40px', borderRadius: '7px', marginLeft: '12px' }}>
                                                                    <img src='/assets/icons/p4fleches.svg' className="h-[17px] w-[17px]" alt="ticket" style={{ fontSize: 'px', marginLeft: '10px' }} />
                                                                </button>
                                                                <div className="font-normal  text-xl w-auto" style={{ marginTop: 'px', color: '#05445E', marginLeft: '15px', fontWeight: '500' }}>
                                                                    {task.title}{" "}<br></br>
                                                                </div>
                                                            </div>
                                                            <div className=" not-italic text-[15px] ml-[65px] text-darkBlue font-[400] text-left w-full">
                                                                {task.description}{" "}
                                                            </div>

                                                        </div>
                                                        <div className="flex ml-[36%]">
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#f6db86', paddingRight: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.dueDate).toLocaleString('en-US', { day: 'numeric', month: 'long' })}                                    </div>
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#05445E', paddingLeft: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Card>
                                    }

                                </div>


                                <div className="flex flex-col items-start " >
                                    <div className="mt-[7%] ml-4 flex items-center">
                                        <span style={{ height: '45px', width: '130px', display: 'flex', alignItems: 'center', paddingBottom: '8px' }} >
                                            <span className="lowercase" style={{ fontWeight: '700', textTransform: 'capitalize', color: '8ca8b2', fontSize: '22px' }}> Coming </span>
                                        </span>
                                        <span style={{ color: '#8ca8b3', fontWeight: '400', fontSize: '18px' }} > {openTasks.length} Tasks </span>
                                    </div>
                                    {comingTasks.length > 0 &&
                                        <Card style={{ backgroundColor: "transparent", marginTop: "15px", boxShadow: "none" }}>
                                            <div style={{ color: '#8ca8b3', marginLeft: '740px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Deadline</div>
                                            <div style={{ color: '#8ca8b3', marginLeft: '840px', marginTop: '-28px', fontWeight: '', fontSize: '18px' }}>Creation Date </div>
                                            {comingTasks.map((task) => (
                                                <div key={task._id} style={{ marginBottom: "10px" }} >
                                                    <div className=" flex center-items rounded-xl " onClick={() => stack.push(<UploadTask taskid={task._id} HideModal={() => stack.pop()} />)} style={{ marginTop: '8px', marginLeft: '10px', height: "100px", backgroundColor: 'white', width: '1000px', borderRadius: '17', boxShadow: '1px 2px 9px #0000003D' }}>
                                                        <div className="flex flex-col items-start">
                                                            <div className=" flex center-items mt-[6%]">
                                                                <button style={{ backgroundColor: '#f6db86', height: '38px', width: '40px', borderRadius: '7px', marginLeft: '12px' }}>
                                                                    <img src='/assets/icons/p4fleches.svg' className="h-[17px] w-[17px]" alt="ticket" style={{ fontSize: 'px', marginLeft: '10px' }} />
                                                                </button>
                                                                <div className="font-normal  text-xl w-auto" style={{ marginTop: 'px', color: '#05445E', marginLeft: '15px', fontWeight: '500' }}>
                                                                    {task.title}{" "}<br></br>
                                                                </div>
                                                            </div>
                                                            <div className=" not-italic text-[15px] ml-[65px] text-darkBlue font-[400] text-left w-full">
                                                                {task.description}{" "}
                                                            </div>

                                                        </div>
                                                        <div className="flex ml-[36%]">
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#d4f1f4', paddingRight: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.dueDate).toLocaleString('en-US', { day: 'numeric', month: 'long' })}                                    </div>
                                                            <div className="font-normal  md:mt-0 mt-[11px] not-italic   text-xl w-auto" style={{ color: '#05445E', paddingLeft: '30px', marginTop: '25px', fontWeight: 'bold' }}>
                                                                {new Date(task.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Card>
                                    }
                                </div>
                            </div>
                        }
                        {
                            lessonSelected != "All" &&
                            <CourseTasks />
                        }

                        <div className="separator " style={{
                            textDecoration: '  underline double ', marginLeft: '5px', marginTop: '100px',
                            flexGrow: '', borderBottom: '2px solid #D3D3D3 ', width: '1000px'
                        }}></div>
                        <span style={{ color: '#767676', marginTop: '-20px' }}> © Copyrwite 2023</span>
                    </div >
                </div >
            </lessonContext.Provider>
        </filterContext.Provider>

    );
};

export default ProjectManagment;
