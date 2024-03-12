import { FunctionComponent, useEffect, useState, createContext } from "react";
import Sidebar from "../../SideBarShaper";
import Weeks from "./Weeks";
import Lession from "./Lession";
import CustomMenu from "../../../../components/CustomMenu";
import { getenrollmentStartDate, getprogrambyid } from "../../../../api/enrollment";
import { useParams } from "react-router-dom";
import { getLessonsByProgramAndWeek } from "../../../../api/projects";
import Cookies from "js-cookie";
import AccessCourse from "./AccessCourse";
import { getTasksByLesson } from "../../../../api/tasks";

export const AccessContext = createContext<{
    hasAccess: boolean;
    setAccess: (access: boolean) => void;
}>({
    hasAccess: false,
    setAccess: () => { },
});


interface WeekContextType {
    selectedWeek: string | null;
    setSelectedWeek: (weekId: string) => void;
}
export const WeekContext = createContext<WeekContextType>({
    selectedWeek: "",
    setSelectedWeek: () => { },
});
const CoursSession: FunctionComponent = () => {
    const [selectedWeek, setSelectedWeek] = useState("");
    const [hasAccess, setAccess] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<string>("");
    const [program, setProgram] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [firstLesson, setFirstLesson] = useState(null);
    const [taskCounts, setTaskCounts] = useState<number[]>([]);
    // const [firstLessonId, setFirstLessonId] = useState(null);
    const userId = Cookies.get('userId');
    const { courseId } = useParams();
    const currentWeekId = localStorage.getItem('currentWeekId');
    useEffect(() => {
        // fetch data with default week
        const fetchShaperData = async () => {
            const program = await getprogrambyid(courseId);
            setProgram(program);
        };
        fetchShaperData();
    }, [courseId]);

    useEffect(() => {
        const fetchLessons = async () => {
            const courses = await getLessonsByProgramAndWeek(courseId, currentWeekId);
            setLessons(courses);
            const lessonIds = courses.map((lesson: { id: any; }) => lesson.id); // Store lesson IDs separately
            // console.log(lessonIds)
            const fetchedTaskCounts = await Promise.all(lessonIds.map((lessonId: any) => getTasksByLesson(lessonId)));
            setTaskCounts(fetchedTaskCounts.map((tasks: any) => tasks.length));
            setSelectedWeek(currentWeekId)
        };

        fetchLessons();
        console.log(selectedWeek);
    }, [courseId]);

    useEffect(() => {
        const fetchLessons = async () => {
            const courses = await getLessonsByProgramAndWeek(courseId, selectedWeek);
            setLessons(courses);
            const lessonIds = courses.map((lesson: { id: any; }) => lesson.id); // Store lesson IDs separately
            // console.log(lessonIds)
            const fetchedTaskCounts = await Promise.all(lessonIds.map((lessonId: any) => getTasksByLesson(lessonId)));
            setTaskCounts(fetchedTaskCounts.map((tasks: any) => tasks.length));
            setSelectedWeek(selectedWeek)
        };

        fetchLessons();
        console.log(selectedWeek);
    }, [courseId, selectedWeek]);
    return (
        <AccessContext.Provider value={{ hasAccess, setAccess }}>
            <WeekContext.Provider value={{ selectedWeek, setSelectedWeek }}>

                <div className="flex h-fit" >
                    <Sidebar />
                    <div className="flex-1  bg-gray-100">
                        <div className="ml-[7%]">
                            <CustomMenu title="Courses" program={program.title} />
                        </div>
                        <div className="flex center-items mt-[2%] ml-[10%]">
                            <Weeks />
                        </div>
                        <div className="flex">

                            {currentWeekId && lessons.length > 0 &&
                                <div className="flex flex-col ml-[2%]">
                                    {lessons.map((lesson, index: any) => (
                                        <div className="flex-2"
                                            onClick={() => {

                                                setSelectedLesson(lesson.id);

                                            }}

                                            key={lesson.id}>
                                            <div className="  ml-2 mt-7 bg-white shadow border rounded-3xl" style={{ width: '250px', height: '160px' }} >
                                                <div className="mt-8 ml-4">
                                                    <span className="   text-lg  font-segoe-ui text-blue-400">Lesson {index + 1} :</span >
                                                    <span style={{ color: '#05445E', fontFamily: 'Segoe UI' }}  > The Theory of </span><span style={{ color: '#05445E', fontFamily: 'Segoe UI' }}><br></br>{lesson.title}</span>
                                                </div>
                                                <span className=" m-8 font-segoe-ui" style={{ color: '#9dabb0', fontSize: '15px' }}> {lesson.duration / 60} hour to complete</span><br></br>
                                                <span className=" m-8  font-segoe-ui" style={{ color: '#9dabb0', fontSize: '15px' }}>{taskCounts[index]} {taskCounts[index] === 1 ? 'challenge' : 'challenges'}</span><br></br>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {currentWeekId && currentWeekId === selectedWeek && <Lession lessonId={selectedLesson} />}

                            {currentWeekId && currentWeekId !== selectedWeek && <AccessCourse />}
                        </div>
                    </div>
                </div>
            </WeekContext.Provider>
        </AccessContext.Provider>
    )
}
export default CoursSession;
