/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card } from '@material-tailwind/react'
import React from 'react'


type Props = {
  className: string
}

const ProfileMatching: React.FC<Props> = ({ className }) => {

  return (


    <Card style={{ boxShadow: '1px 2px 9px #0000003D', backgroundColor: '#f5f5f5', width: '750px', height: '400px' }}>
      {/* begin::Header */}
      <div className='border-0 pt-12'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bold ' style={{ color: '#3699ff', marginLeft: '45px', fontSize: '20px', fontFamily: 'Segoe UI' }}>Profil Matching</span>

        </h3>
        <span className='pt-14' style={{ marginTop: '45px', marginLeft: '45px', color: '#05445E', fontFamily: 'Segoe UI' }}>The most Matching Company </span>
      </div>
      <div className='pt-10'>
        {/* begin::Item */}
        <div className='tab-content'>
          <div className='flex items-center mb-1'>

            {/* begin::Text */}

            <div className='m-9 flex items-center' style={{ display: 'flex', alignItems: 'center' }}>

              <div style={{
                marginLeft: '13px',
                boxShadow: '3px 3px 3px #0000003D',
                backgroundColor: '#ffffff',
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                outlineColor: '#fefefe',
                border: '',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>

              </div>
              <span style={{ marginLeft: '25px', color: '#05445E', fontFamily: 'Segoe UI', fontWeight: '', fontSize: '18px' }}>DABYGO
                <span style={{ marginLeft: '75px', color: '#05445E', fontFamily: 'Segoe UI', fontWeight: 'bold', fontSize: '15px' }}>92%</span>
                <div>
                  <div style={{ marginTop: '10px', marginRight: '25px', borderRadius: '5px 5px 5px 5px', backgroundColor: '#dfdfdf', height: '8px', width: '100%' }}>
                    <div style={{ backgroundColor: '#3699ff', height: '92%', width: '92%', borderRadius: '5px 5px 5px 5px' }}></div>
                  </div>
                </div>
              </span>

            </div>
            <div className='flex items-center'>
              <div style={{
                marginLeft: '13px',
                boxShadow: '3px 3px 3px #0000003D',
                backgroundColor: '#ffffff',
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                outlineColor: '#fefefe',
                border: '',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>

              </div>
              <span style={{ marginLeft: '25px', color: '#05445E', fontFamily: 'Segoe UI', fontWeight: '', fontSize: '18px' }}>CYNOIA
                <span style={{ marginLeft: '75px', color: '#05445E', fontFamily: 'Segoe UI', fontWeight: 'bold', fontSize: '15px' }}>86%</span>
                <div>
                  <div style={{ marginTop: '10px', marginRight: '25px', borderRadius: '5px 5px 5px 5px', backgroundColor: '#dfdfdf', height: '8px', width: '100%' }}>
                    <div style={{ backgroundColor: '#3699ff', height: '92%', width: '86%', borderRadius: '5px 5px 5px 5px' }}></div>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '105px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <button
                type='submit'
                id='kt_sign_in_submit'
                style={{
                  borderRadius: '5px', width: '100px', height: '30px',
                  border: '1px solid #05445E', fontFamily: 'Segoe UI', fontWeight: 'bold', backgroundColor: 'white', color: '#05445E', marginTop: '15px',

                }}>
                <span className='indicator-label'>Skip </span>
              </button>
              <button
                type='submit'
                id='kt_sign_in_submit'
                style={{ marginLeft: '10px', marginRight: '100px', border: '1px solid #FFCC29', borderRadius: '5px', width: '100px', height: '30px', fontFamily: 'Segoe UI', fontWeight: 'bold', backgroundColor: '#FFCC29', color: '#05445E', marginTop: '15px' }}
              >
                <span className='indicator-label'>Apply Now  </span>
              </button>
            </div>
            <div style={{ marginLeft: '20px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <button
                type='submit'
                id='kt_sign_in_submit'
                style={{
                  borderRadius: '5px', width: '100px', height: '30px',
                  border: '1px solid #05445E', fontFamily: 'Segoe UI', fontWeight: 'bold', backgroundColor: 'white', color: '#05445E', marginTop: '15px',

                }}>
                <span className='indicator-label'>Skip </span>
              </button>
              <button
                type='submit'
                id='kt_sign_in_submit'
                style={{ marginLeft: '10px', border: '1px solid #FFCC29', borderRadius: '5px', width: '100px', height: '30px', fontFamily: 'Segoe UI', fontWeight: 'bold', backgroundColor: '#FFCC29', color: '#05445E', marginTop: '15px' }}
              >
                <span className='indicator-label'>Apply Now  </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>




  )
}

export default ProfileMatching;
