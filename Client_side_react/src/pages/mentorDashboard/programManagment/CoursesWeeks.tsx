import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import './styles.css';
import { PaginationOptions } from 'swiper/types';
import { Navigation, Pagination } from 'swiper';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getenrollmentStartDate, getprogrambyid } from '../../../api/enrollment';
import { getLessonsByWeek, getTaskByUserAndLessonAndStatus, getTasksByLesson } from '../../../api/tasks';
import { WeekContext } from './CourseManagment';

interface MyPaginationOptions extends PaginationOptions {
  renderProgress?: (progressbarFillClass: string) => JSX.Element;
}

const CoursesWeeks = () => {
  //fetch the prgram and get the weeks array
  const [weeks, setweeks] = useState([]);
  const { course } = useParams();
  const userId = Cookies.get('userId');
  const { selectedWeek, setSelectedWeek } = useContext(WeekContext);
  const [enrollmentStartDate, setEnrollmentStartDate] = useState<Date | null>(null);
  const [currentWeekId, setCurrentWeekId] = useState<string | null>(null);
  const [previousWeekId, setPreviousWeekId] = useState<string | null>(null);
  // State to store the first week ID
  useEffect(() => {
    const fetchShaperData = async () => {
      const program = await getprogrambyid(course);
      const enrollment = await getenrollmentStartDate(userId, course);
      const startDate = new Date(enrollment);
      setEnrollmentStartDate(startDate);
      setweeks(program.weeks);
      const weeks = program.weeks;
      // Determine the selected week index
      const selectedWeekIndex = weeks.findIndex((week) => week._id === selectedWeek) + 1;
      console.log(selectedWeekIndex)

      // Determine the current week ID based on enrollment start date
      const currentDate = new Date();
      const weeksStartDates = program.weeks.map((week) => new Date(week.start));
      const currentWeekIndex = weeksStartDates.findIndex((startDate) => currentDate >= startDate) + 1;
      const currentWeekId = currentWeekIndex >= 0 ? program.weeks[currentWeekIndex]._id : null;
      setCurrentWeekId(currentWeekId);
      // Retrieve the previous week ID
      const previousWeek = selectedWeekIndex > 0 ? program.weeks[selectedWeekIndex - 1] : null;
      setPreviousWeekId(previousWeek ? previousWeek._id : selectedWeek);
      console.log("previousWeekId", previousWeekId, "currentWeekId", currentWeekId, "selectedWeek", selectedWeek)

      // Determine if the user has access to the selected week
      const isPreviousWeekTasksCompleted = await checkTasksCompletionStatus(previousWeekId, userId);
      const isCurrentWeekTasksCompleted = await checkTasksCompletionStatus(currentWeekId, userId);
      console.log("isPreviousWeekTasksCompleted", isPreviousWeekTasksCompleted, "isCurrentWeekTasksCompleted", isCurrentWeekTasksCompleted)
    };

    fetchShaperData();

  }, [course, selectedWeek]);

  const checkTasksCompletionStatus = async (weekId: string | null, userId: string): Promise<boolean> => {
    if (!weekId) {
      // Week ID not available, return false
      return false;
    }

    const lessons = await getLessonsByWeek(weekId, course);
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
            className={`text-3xl font-font text-[20px]  text-sky-900 ${selectedWeek === week._id ? 'text-darkBlue font-bold' : 'text-[#9cb3bd]'}`}
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
export default CoursesWeeks;