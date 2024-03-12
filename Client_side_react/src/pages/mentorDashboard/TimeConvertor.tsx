/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card } from '@material-tailwind/react'
import React from 'react'
import SwiperConvert from './SwiperConvert'



type Props = {
  className: string
}

const TimeConvertor: React.FC<Props> = ({ className }) => {

  return (


    <div style={{ backgroundColor: 'transparent', width: '750px', height: '400px' }}>
      {/* begin::Header */}
      <div className="border-0 pt-9">
        <h3
          className="card-title align-items-start flex-column"
          style={{ marginLeft: '35px' }}
        >
          
          <span
            className="card-label fw-bold "
            style={{ color: '#3699ff', fontSize: '23px',fontWeight:'600' }}
          >
            Time Convertor <br />
          </span>
          <span className="mt-1 fw-semibold fs-6" style={{ color: '#6b909e' }}>
            We Convert Your Working Time To Money
          </span>
        </h3>
      </div>
      <div className=''>
        {/* begin::Item */}
        <div className='row gy-4 g-xl-9 flex items-center ' style={{ marginLeft: '20px' }} >
          
          <img src='/assets/icons/convert.svg' style={{marginLeft:'-0px',marginTop:'-25px'}} ></img>
          <div className='col-xl-8' style={{ marginLeft: '5px', marginTop: '0px' }}>
            <Card style={{ overflow: 'hidden', marginRight: 'px', marginTop: '25px', boxShadow: '1px 2px 9px #0000003D', backgroundColor: 'white', width: '390px', height: '280px', marginLeft: '35px' }}>
              {/* begin::Header */}
              <div className=' pt-3 align-items-center'>
                <h3 className='align-items-start flex-column align-items-center '>
                  <div className='flex items-center'>

                    <h1 style={{ color: '#3699ff', fontSize: '18px', fontWeight: '500', marginLeft: '30px' }}>Weeks</h1>
                    <h1 style={{ color: '#3699ff', fontSize: '18px', fontWeight: '500', marginLeft: '85px' }}>Time</h1>
                    <h1 style={{ color: '#3699ff', fontSize: '18px', fontWeight: '500', marginLeft: '90px' }}>Money </h1>
                  </div>
                </h3>
              </div>
              
              <div className="separator " style={{
                textDecoration: '  underline double ', marginLeft: '5px', marginTop: '10px',
                flexGrow: '', borderBottom: '2px solid #e1e9ec ', width: '350px'}}>

              </div>
             <div style={{marginLeft:'-310px',marginTop:'-50px'}}><SwiperConvert/></div> 

            </Card>
          </div>

        </div>
      </div>






    </div>




  )
}

export default TimeConvertor;
