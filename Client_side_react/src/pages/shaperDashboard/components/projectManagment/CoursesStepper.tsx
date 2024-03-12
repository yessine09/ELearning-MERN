import { useContext, useEffect, useState } from "react";
import { getTasksByClient, getTasksByClientAndProject, gettasksByLessonandUser } from "../../../../api/tasks";
import { useParams } from "react-router-dom";
import { getLessonsByProgram } from "../../../../api/enrollment";
import Cookies from "js-cookie";
import { lessonContext } from "../../../shaperDashboard/components/projectManagment/ProjectManagment";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

export const Course = ({ number, lessonId, onClick }: any) => {
    const [numTasks, setNumTasks] = useState(0);
    const userId = Cookies.get("userId");
    const { projectId } = useParams();

    useEffect(() => {
        const fetchTaskCount = async () => {
            const tasks = await gettasksByLessonandUser(userId, lessonId);
            setNumTasks(tasks.length);
        };
        fetchTaskCount();
    }, [lessonId, projectId]);

    return (
        <div className="mx-6 " key={number}>
            <div className="flex items-center justify-between" onClick={onClick}>
                <span className="font-font text-darkBlue opacity-60 font-[400] p-[5px] text-[20px] hover:opacity-100">
                    {" "}
                    Course {number}
                </span>
                <div className="relative">
                    <div className="w-6 h-6 bg-fancyYellow border rounded-full" />
                    <p className="text-md text-white absolute left-2 bottom-0"> {numTasks} </p>
                </div>
            </div>
        </div>
    );
};

const Lesson = () => {
    const [lessons, setLessons] = useState([]);
    const { projectId } = useParams();
    const [allTask, setAllTasks] = useState(0);
    const { setselectedlesson, lessonSelected } = useContext(lessonContext);

    const userId = Cookies.get("userId");

    useEffect(() => {
        const fetchLessonData = async () => {
            const projectLessons = await getLessonsByProgram(projectId);
            const allTasks = await getTasksByClient(userId, projectId);
            setLessons(projectLessons);
            setAllTasks(allTasks.length);
        };
        fetchLessonData();
    }, [lessonSelected, projectId]);

    return (
        <div className="flex items-center mt-6">
            <div className="flex items-center justify-between" key={0} onClick={() => setselectedlesson("All")}>
                <span className="font-font text-darkBlue opacity-60 font-[400] p-[5px] text-[20px] hover:opacity-100">
                    {" "}
                    All{" "}
                </span>
                <div className="relative">
                    <div className="w-6 h-6 bg-fancyYellow border rounded-full" />
                    <p className="text-md text-white absolute left-2 bottom-0"> {allTask} </p>
                </div>
            </div>

            <div className="flex items-center mt-6">
                <Swiper
                    slidesPerView={lessons.length > 6 ? 6 : lessons.length}
                    spaceBetween={40}
                    navigation
                    breakpoints={{
                        100: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 12,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 16,
                        },
                    }}
                    className="mySwiper" // Add a class name to the Swiper component for custom styling
                >
                    {lessons.map((lesson: { id: string }, index: number) => (
                        <SwiperSlide key={lesson.id}>
                            <div className="px-4"> {/* Add padding around the Course component */}
                                <Course
                                    onClick={() => setselectedlesson(lesson.id)}
                                    number={index + 1}
                                    lessonId={lesson.id}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Lesson;

