import { FunctionComponent, useEffect, useState, createContext } from "react";
import Weeks from "./CoursesWeeks";
import Lession from "./LessonComponent";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Program, getenrollmentStartDate, getprogrambyid } from "../../../api/enrollment";
import { getLessonsByProgramAndWeek } from "../../../api/projects";
import { getTasksByLesson } from "../../../api/tasks";
import MentorSideBar from "../mentorSideBar";
import CustomMenu from "../../../components/CustomMenu";
import LessonComponent from "./LessonComponent";
import CoursesWeeks from "./CoursesWeeks";

interface WeekContextType {
    selectedWeek: string | null;
    setSelectedWeek: (weekId: string) => void;
}
export const WeekContext = createContext<WeekContextType>({
    selectedWeek: "",
    setSelectedWeek: () => { },
});
const CourseManagment: FunctionComponent = () => {
    const [selectedWeek, setSelectedWeek] = useState("");
    const [selectedLesson, setSelectedLesson] = useState<string>("");
    const [program, setProgram] = useState<Program | null>();
    const [lessons, setLessons] = useState([]);
    const [firstWeekId, setFirstWeekId] = useState<string | null>(null);
    const [weeks, setweeks] = useState([]);
    const [enrollmentStartDate, setEnrollmentStartDate] = useState<Date | null>(null);
    const [currentWeekId, setCurrentWeekId] = useState<string | null>(null);
    const [firstLesson, setFirstLesson] = useState(null);
    const [taskCounts, setTaskCounts] = useState<number[]>([]);
    // const [firstLessonId, setFirstLessonId] = useState(null);
    const userId = Cookies.get('userId');
    const { course } = useParams();
    useEffect(() => {
        // fetch data with default week
        const fetchShaperData = async () => {
            const program = await getprogrambyid(course);
            setProgram(program);
            const enrollment = await getenrollmentStartDate(userId, course);
            setweeks(program.weeks);
            const startDate = new Date(enrollment);
            setEnrollmentStartDate(startDate);
            // Determine the current week ID based on enrollment start date
            const currentDate = new Date();
            const weeksStartDates = program.weeks.map((week) => new Date(week._id));
            const currentWeekIndex = weeksStartDates.findIndex((startDate) => currentDate >= startDate);
            setCurrentWeekId(program.weeks[currentWeekIndex]._id);
            setSelectedWeek(program.weeks[currentWeekIndex]._id);
            setFirstWeekId(program.weeks[0]._id);

        };
        fetchShaperData();
        // console.log(firstWeekId);
    }, [course, selectedLesson]);

    useEffect(() => {
        // fetch lessons with default week
        if (currentWeekId) {
            const fetchFirstLesson = async () => {
                const lessons = await getLessonsByProgramAndWeek(course, currentWeekId);
                if (lessons.length > 0) {
                    setFirstLesson(lessons[0]);
                    setSelectedLesson(lessons[0].id)
                }
            };
            fetchFirstLesson();
        }
    }, [currentWeekId, course]);

    useEffect(() => {
        // fetch lessons with selected week
        if (selectedWeek) {
            const fetchLessons = async () => {
                const courses = await getLessonsByProgramAndWeek(course, selectedWeek);
                setLessons(courses);
                const lessonIds = courses.map((lesson: { id: any; }) => lesson.id); // Store lesson IDs separately
                // console.log(lessonIds)
                const fetchedTaskCounts = await Promise.all(lessonIds.map((lessonId: any) => getTasksByLesson(lessonId)));
                setTaskCounts(fetchedTaskCounts.map((tasks: any) => tasks.length));
            };

            fetchLessons();
            // console.log(selectedWeek);
        }
    }, [selectedWeek, course]);

    return (

        <WeekContext.Provider value={{ selectedWeek, setSelectedWeek }}>
            <div className="flex h-fit" >
                <MentorSideBar />
                <div className="flex-1  bg-gray-100">
                    <div className="ml-[7%]">
                        <CustomMenu title="Courses" program={program?.title} />
                    </div>
                    <div className="flex center-items mt-[2%] ml-[10%]">
                        <CoursesWeeks />
                    </div>
                    <div className="flex">
                        {selectedWeek !== "" &&
                            <div className="flex flex-col ml-[2%]">
                                {lessons.map((lesson, index: any) => (
                                    <div className="flex-2"
                                        onClick={() => setSelectedLesson(lesson.id)}

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
                        <div>
                            <LessonComponent lessonId={selectedLesson} />
                            <div className="separator border-b-2 border-gray-300 underline-double mt-20 ml-20 w-1400"></div>
                            <span className="text-gray-300 mt-neg-20 ml-20">© Copyrwite 2023</span>
                        </div>

                    </div>
                </div>
            </div>
        </WeekContext.Provider>
    )
}
export default CourseManagment;
