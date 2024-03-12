/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'


type Props = {
  className: string
}

const TodayCourseSwipper: React.FC<Props> = ({ className }) => {
  return (
    <div className="tab-content">
      <div className="flex items-center mb-1">
        <div className="m-3 flex items-center">
          <div className="shadow-lg bg-white w-12 h-12 rounded-full flex justify-center items-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="36.091" height="38.102" viewBox="0 0 46.091 46.102">
                <g id="Groupe_182" data-name="Groupe 182" transform="translate(-1276 -1166)">
                  <g id="Arrow" transform="translate(1272.994 1162)">
                    <path id="Tracé_50" data-name="Tracé 50" d="M48.562,4.535a1.844,1.844,0,0,0-2.1-.35L4.046,24.469a1.844,1.844,0,0,0,.793,3.5H25.124V48.258A1.844,1.844,0,0,0,26.562,50.1h.406a1.844,1.844,0,0,0,1.66-1.051L48.913,6.637a1.844,1.844,0,0,0-.35-2.1Z" transform="translate(0 0)" fill="#ffcc29" />
                    <path id="Tracé_51" data-name="Tracé 51" d="M15,48.013a1.844,1.844,0,0,0,1.438,1.844h.406a1.844,1.844,0,0,0,1.66-1.051L38.789,6.392a1.844,1.844,0,0,0-.35-2.1L15,27.728Z" transform="translate(10.124 0.245)" fill="#eeb500" />
                  </g>
                </g>
              </svg>
            </span>
          </div>
          <span className="card-label font-bold text-lg  ml-4 flex-1" style={{ color: '#05445e' }}>Photoshop Tools
            <div className='flex items-center'>
              <button type="submit" id="kt_sign_in_submit" className="btn mt-5 mr-8 flex items-center rounded-full px-2 py-1 text-sm" style={{ color: '#6b909e' }}>
                <svg className="fill-current mr-1" viewBox="0 0 20 20" width="20" height="20" style={{ color: '#05445e' }}>
                  <path d="M10 10l-9 10h18z"></path>
                </svg>
                2 Topics
              </button>

              <button type="submit" id="kt_sign_in_submit" className="btnmt-5 mr-8 flex items-center rounded-full px-2 py-1 text-sm" style={{ color: '#6b909e' }}>
                <svg className="fill-current mr-1" viewBox="0 0 20 20" width="20" height="20" style={{ color: '#05445e' }}>
                  <path d="M10 10l-9 10h18z"></path>
                </svg>
                50 min
              </button>
            </div>
          </span>
        </div>
        <div>
        </div>
      </div>

      <div style={{ marginLeft: '90px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          type='submit'
          id='kt_sign_in_submit'
          style={{
            borderRadius: '10px', width: '90px', height: '30px',
            border: '2px solid #05445E', fontFamily: 'Segoe UI', fontWeight: 'bold', backgroundColor: 'white', color: '#05445E', marginTop: '15px',

          }}>
          <span className='indicator-label'>Skip </span>
        </button>
        <button
          type='submit'
          id='kt_sign_in_submit'
          style={{ marginRight: '68px', border: '2px solid #FFCC29', borderRadius: '10px', width: '90px', height: '30px', fontFamily: 'Segoe UI', fontWeight: 'bold', backgroundColor: '#FFCC29', color: '#05445E', marginTop: '15px' }}
        >
          <span className='indicator-label'>Join </span>
        </button>
      </div>
    </div>
  )
}

export default TodayCourseSwipper;
