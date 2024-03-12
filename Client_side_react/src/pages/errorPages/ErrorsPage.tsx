/* eslint-disable jsx-a11y/anchor-is-valid */
import { Route, Routes, Outlet } from 'react-router-dom'
import { Error500 } from './components/Error500'
import { Error404 } from './components/Error404'
import { toAbsoluteUrl } from '../../helpers/AssetHelpers'

const ErrorsLayout = () => {
  return (
    <div
      className='bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-cover bgi-attachment-fixed h-[100vh]'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/assets/images/bg/background.png')})`,
      }}
    >
      <Outlet />
    </div>
  )
}

const ErrorsPage = () => (
  <Routes>
    <Route element={<ErrorsLayout />}>
      <Route path='404' element={<Error404 />} />
      <Route path='500' element={<Error500 />} />
      <Route index element={<Error404 />} />
    </Route>
  </Routes>
)

export { ErrorsPage }
