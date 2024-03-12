
import { toAbsoluteUrl } from '../../helpers/AssetHelpers'
import SuccessRate from './components/dashboard/SuccessRate'
import Tasks from './components/dashboard/Tasks'
import Todaycourse from './components/dashboard/Todaycourse'
import Schedule from './components/dashboard/Schedule'
import ProfileMatching from './components/dashboard/ProfileMatching'
import Projects from './components/dashboard/Projects'
import OngoingProjects from './components/dashboard/OngoingProject'
import Courses from './components/dashboard/Courses'
import Sidebar from './SideBarShaper'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getShaperById } from '../../api/enrollment'



export default function Shaperdashboard() {
  const [user, setUser] = useState<any>({});

  try {
    const userId = Cookies.get('userId');
    useEffect(() => {
      const fetchUser = async () => {
        const response = await getShaperById(userId);
        setUser(response);
      };
      fetchUser();
    }, [userId]);

  } catch (error) {
    console.error('Error fetching users:', error);
  }

  return (
    <div className="flex h-[340vh]" >
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <div className='m-[2%] flex items-center' style={{ marginLeft: '80px' }}>
          <img src='/assets/icons/home.svg' />
          <div className='ml-2 font-segoe-ui text-lg text-darkBlue opacity-90 '>Dashboard</div>
        </div>

        <div className="flex items-center">
          <h1 style={{ color: '#05445E', marginLeft: '75px', marginTop: '-30px', fontFamily: 'Segoe UI', fontSize: '20px' }}>Projects Dashbord<div className="separator " style={{
            textDecoration: '  underline double ', marginLeft: '185px', marginTop: '-10px',
            flexGrow: '', borderBottom: '1px solid #D3D3D3 ', width: '700px'

          }}></div></h1>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '-20px', marginLeft: '20px' }}>
            <div style={{
              boxShadow: '3px 3px 3px #0000003D',
              backgroundColor: '#ffffff',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              outlineColor: '#fefefe',
              border: '',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center', marginRight: '90px'
            }}>
              <img src='assets/icons/message.svg'></img>
            </div>
            <div className='' style={{ display: 'flex', alignItems: 'center', marginLeft: '-70px' }}>
              <div style={{
                boxShadow: '3px 3px 3px #0000003D',
                backgroundColor: '#ffffff',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                outlineColor: '#fefefe',
                border: '',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img src='assets/icons/ring.svg'></img>
              </div></div>

          </div>


        </div>
        <div className='' style={{ marginLeft: '75px' }}>
          {/*begin::Symbol*/}

          <div className='flex items-center'>
            <div className='symbol symbol-50px mt-10 mr-4'>

              <img
                src={toAbsoluteUrl('assets/icons/personna.jpg')}
                alt=''
                className='w-20 h-20 rounded-full object-cover'
              />
            </div>
            <div className='flex flex-col'>

              <div className='flex items-center' style={{ marginTop: '65px' }}>
                <h1 className='text-2xl font-bold ' style={{ color: '#05445e' }}>{user.firstName} {user.lastName}</h1>

                <img style={{ marginTop: '4px', marginLeft: '10px' }} src=''></img>
              </div>
              <div className='flex items-center'>
                <img src='assets/icons/personne.svg' />
                <span className='  mb-1' style={{ fontSize: '15px', marginTop: '6px', color: '#6b909e', fontFamily: 'Segoe UI', marginLeft: '10px' }}>Social Media Designer </span>
              </div>
              <div className='flex items-center'>
                <img src='assets/icons/mail.svg' />
                <span className='  mb-1' style={{ fontSize: '15px', marginTop: '6px', color: '#6b909e', fontFamily: 'Segoe UI', marginLeft: '10px' }}>{user.email}</span>

              </div>
            </div>


            <div style={{ marginTop: '10px', marginLeft: '170px', borderRadius: '5px 5px 5px 5px', backgroundColor: '#dfdfdf', height: '8px', width: '15%' }}>
              <div style={{ backgroundColor: '  #FFCC29', height: '90%', width: '70%', borderRadius: '5px 5px 5px 5px' }}></div>
            </div>

            <Link to="/profile-settings" style={{ textDecoration: 'underline', marginLeft: '40px', color: '#FFCC29' }}>Complete Your Profil </Link>

          </div>

        </div>
        <div className='flex ml-[65px] mt-10 items-center justify-between w-[70%]'>
          <div className='col-span-1 xl:col-span-1'>
            <Projects className='card-xl-stretch mb-xl-2' />
          </div>
          <div className='col-span-1 xl:col-span-1' >
            <OngoingProjects className='card-xl-stretch mb-xl-8' />
          </div>
          <div className='col-span-1 xl:col-span-1'>
            <SuccessRate className='card-xl-stretch mb-xl-8' />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-9 gap-2 pt-16" style={{ marginLeft: " 60px" }}>
          <div className="col-span-5">
            <Tasks className="card-xl-stretch mb-5" />
          </div>
          <div className="col-span-4" style={{ marginLeft: '-175px' }}>
            <Todaycourse className="card-xl-stretch mb-4 xl:mb-4" />
          </div>
        </div>
        <div className="flex flex-wrap gap-5 xl:gap-9 pt-38" style={{ marginLeft: '65px', marginTop: '100px' }}>
          <div className="w-full xxl:w-1/3">
            <Schedule className="w-full h-full" />
          </div>
          <div className='row g-5 g-xl-9 pt-8' style={{ marginLeft: '13px', marginTop: '1px' }}>

            <div className='' style={{ marginLeft: '-18px' }}>
              < Courses className='' />
            </div>
            <div className='row g-5 g-xl-9 pt-8' style={{ marginLeft: '13px', marginTop: '1px' }}>

              <div className='col-xl-8 mt-8' style={{ marginLeft: '-30px' }}>
                <ProfileMatching className='card-xl-stretch mb-5 mb-xl-8' />
              </div>

            </div>
          </div>
          <div className="separator " style={{
            textDecoration: '  underline double ', marginLeft: '5px', marginTop: '100px',
            flexGrow: '', borderBottom: '2px solid #D3D3D3 ', width: '1100px'

          }}></div>
          <span style={{ color: '#D3D3D3', marginTop: '-20px' }}> © Copyrwite 2023</span>
        </div>


      </div>
    </div>
  )
}
