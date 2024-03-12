import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import './styles.css';
import { PaginationOptions } from 'swiper/types';
import { Navigation, Pagination } from 'swiper';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getenrollmentStartDate, getprogrambyid } from '../../../../api/enrollment';
import { AccessContext, WeekContext } from './CoursSession';
import Cookies from 'js-cookie';
import { getAllWeeksFromProgram, getLessonsByWeek, getTaskByUserAndLessonAndStatus, getTasksByClientAndStatus, getTasksByLesson } from '../../../../api/tasks';

interface MyPaginationOptions extends PaginationOptions {
  renderProgress?: (progressbarFillClass: string) => JSX.Element;
}

const Weeks = () => {
  //fetch the prgram and get the weeks array
  const [weeks, setweeks] = useState([]);
  const { courseId } = useParams();
  const userId = Cookies.get('userId');
  const { selectedWeek, setSelectedWeek } = useContext(WeekContext);
  const { hasAccess, setAccess } = useContext(AccessContext);
  const [enrollmentStartDate, setEnrollmentStartDate] = useState<Date>(new Date());
  const [currentWeekId, setCurrentWeekId] = useState<string | null>(null);
  const [previousWeekId, setPreviousWeekId] = useState<string | null>(null);
  // State to store the first week ID
  useEffect(() => {
    const fetchShaperData = async () => {
      try {
        const weeks = await getAllWeeksFromProgram(courseId);
        const enrollment = await getenrollmentStartDate(userId, courseId);
        setweeks(weeks);
        console.log("weeks", weeks);
        const startDate = new Date(Date.parse(enrollment));
        console.log("enrollment start date", startDate);
        setEnrollmentStartDate(startDate);

        // Determine the current week ID based on enrollment start date
        const currentDate = new Date();
        const elapsedDays = Math.ceil((currentDate.getTime() - enrollmentStartDate.getTime()) / (24 * 60 * 60 * 1000));
        console.log(elapsedDays);
        const weekDuration = 7; // Duration of each week in days
        const currentWeekIndex = Math.floor(elapsedDays / weekDuration);

        console.log("currentWeekIndex", currentWeekIndex);

        if (weeks.length > currentWeekIndex) {
          const currentWeek = weeks[currentWeekIndex]._id;
          console.log("currentWeek", currentWeek);
          setCurrentWeekId(currentWeek);
          console.log("currentWeekId", currentWeek);
          localStorage.setItem('currentWeekId', currentWeek);

          const isCurrentWeekTasksCompleted = await checkTasksCompletionStatus(currentWeekId, userId);
          setAccess(isCurrentWeekTasksCompleted);
          console.log("isCurrentWeekTasksCompleted", isCurrentWeekTasksCompleted);
        } else {
          console.log("Invalid current week index");
        }
      } catch (error) {
        // Handle error here
        console.error("Error fetching data:", error);
      }

    };

    fetchShaperData();
    console.log(currentWeekId);
  }, [courseId, selectedWeek, currentWeekId]);


  const checkTasksCompletionStatus = async (weekId: string | null, userId: string): Promise<boolean> => {
    if (!weekId) {
      // Week ID not available, return false
      return false;
    }

    const lessons = await getLessonsByWeek(weekId, courseId);
    let totalTasks = 0;
    let completedTasks = 0;

    for (const lesson of lessons) {
      const tasks = await getTasksByLesson(lesson.id);
      totalTasks += tasks.length;
      const closedTasks = await getTaskByUserAndLessonAndStatus(userId, lesson.id, 'Closed');
      completedTasks += closedTasks.length;
    }
    console.log("completedTasks", completedTasks, "totalTasks", totalTasks)

    if (completedTasks === 0 && totalTasks === 0) {
      // No tasks available, return false
      return false;
    }
    return completedTasks === totalTasks;
  };


  const renderProgress = (progressbarFillClass: string) => (
    <span
      className={progressbarFillClass}
    />);
  //   pagination={paginationOptions}
  const paginationOptions: MyPaginationOptions = {
    type: 'progressbar',
    renderProgress,
  };

  return (
    <Swiper
      spaceBetween={7}
      navigation={true}
      slidesPerView={6}
      modules={[Pagination, Navigation]}
      className="MySwiper"
    >
      {weeks.map((week, index: any) => (
        <SwiperSlide key={index}>
          <button
            className={`text-3xl font-font text-[20px]  text-sky-900 ${currentWeekId === week._id ? 'text-darkBlue font-bold' : 'text-[#9cb3bd]'}`}
            // style={{ color: '#9cb3bd', textDecoration: '', fontSize: '20px' }}
            onClick={() => setSelectedWeek(week._id)}
          >
            <span>Week {index + 1}</span>
          </button>
        </SwiperSlide>
      ))
      }
    </Swiper >
  );
};
export default Weeks;