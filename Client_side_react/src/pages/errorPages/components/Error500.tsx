import { FC } from 'react'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../helpers/AssetHelpers'


const Error500: FC = () => {
  return (

    <div className='flex flex-col flex-root text-darkBlue font-font relative' >

      {/* begin::Illustration */}
      <img
        src={toAbsoluteUrl('/assets/images/bg/errors.png')}
        alt='error asset'
        className='mt-[110px]'
      />
      {/* end::Illustration */}

      {/* begin::Message */}
      <div className='flex flex-col items-center h-full w-full absolute top-[40%] left-[0%]'>
        <h1 className='font-bold text-[130px]'>
          500
        </h1>
        <h1 className='font-bold text-[45px] mb-7 '>
          Internal Server Error
        </h1>
        <span className='text-[22px] font-light mb-4'>
          Something went wrong .
        </span>
        <span className='text-[22px] font-light mb-4'>
          Please Try Aagain
        </span>
        {/* end::Message */}
        {/* begin::Link */}
        <Link to='/auth' className='mt-[30px]' >
          <div className='bg-yellow w-[150px] text-center pt-2 h-[40px]  font-semibold rounded-[3px] shadow-[-5px_11px_11px_4px_rgba(213,213,213,0.75)]'>Go To Dashboard</div>
        </Link>
        {/* end::Link */}
      </div>
    </div>

  )

}

export { Error500 }
