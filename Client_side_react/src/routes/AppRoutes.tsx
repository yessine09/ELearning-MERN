import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import App from '../App'
import { Logout } from '../pages/Logout'
import { ErrorsPage } from '../pages/errorPages/ErrorsPage'
import { AuthPage } from './AuthRoutes'
import LoggedUserRoute from './LoggedUserRoute'
import NotLoggedUserRoute from './NotLoggedUserRoute'
import Profiling from '../features/auth/components/profiling/Profiling'
import ProfileSetting from '../pages/shaperDashboard/components/profileSettings/ProfieSetting'
import MentorDash from '../pages/mentorDashboard/MentorDash'
import Dashboard from '../features/AccManagment/adminDashboard'
import Shaperdashboard from '../pages/shaperDashboard/ShaperDashboard'
// import CoursSession from '../pages/shaperDashboard/components/courses/CoursSession'
// import ProjectManagment from '../pages/shaperDashboard/components/projectManagment/ProjectManagment'
// import MentorProjectManagment from '../pages/mentorDashboard/tasksManagment/MentorProjectManagment'
import ProjectManagment from '../pages/shaperDashboard/components/projectManagment/ProjectManagment'
import CourseManagment from '../pages/mentorDashboard/programManagment/CourseManagment'
import MentorProjectManagment from '../pages/mentorDashboard/tasksManagment/MentorProjectManagment'
import CoursSession from '../pages/shaperDashboard/components/courses/CoursSession'
import Company1 from '../pages/shaperDashboard/components/profilMatching/Company'
import CompanyMatch from '../pages/shaperDashboard/components/profilMatching/CompanyMatch'
import JobOffer from '../pages/shaperDashboard/components/profilMatching/Company'
// import MentorProjectManagment from '../pages/mentorDashboard/programMang/tasksManagment/MentorProjectManagment'

const AppRoutes: FC = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />

          <Route element={<LoggedUserRoute />}>
            <Route path='/profiling' element={<Profiling />} />
            <Route path="/profile" element={<Shaperdashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/mentor/dashboard" element={<MentorDash />} />
            <Route path="/content-creator/dashboard" element={<Profiling />} />
            <Route path="/profile-settings" element={<ProfileSetting />} />
            {/* Dynamic segment for project id */}
            <Route path="/project/:projectId/*" element={<ProjectManagment />} />
            <Route path="/course-document" element={<ProjectManagment />} />
            <Route path="/meet-your-mentor" element={<ProjectManagment />} />
            <Route path="/company-matching" element={<CompanyMatch />} />
            <Route path="/application-history" element={<JobOffer />} />
            <Route path="/saved" element={<ProjectManagment />} />
            {/* Dynamic segment for shapers courses */}
            <Route path="/course/:courseId/*" element={<CoursSession />} />
            <Route path="/course/:courseId" element={<CoursSession />} />
            <Route path="/courses/overview/:course/" element={<CourseManagment />} />
            <Route path="/courses/overview/:course/*" element={<CourseManagment />} />
            <Route path="/tasks/overview/:course/" element={<MentorProjectManagment />} />
            <Route path="/tasks/overview/:course/*" element={<MentorProjectManagment />} />

          </Route>
          <Route element={<NotLoggedUserRoute />}>
            <Route path='auth/*' element={<AuthPage />} />
            <Route path='*' element={<Navigate to='/auth' />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }

