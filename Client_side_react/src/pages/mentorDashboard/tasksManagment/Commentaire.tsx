import { Card } from '@material-tailwind/react'
import React from 'react'
import { toAbsoluteUrl } from '../../../helpers/AssetHelpers'

export default function Commentaire() {
  return (
    <Card style={{ boxShadow: '1px 2px 9px #0000003D', marginTop: '20px', backgroundColor: 'white', marginLeft: "130px", width: '430px', height: '400px', borderRadius: '40px' }}>
      <div style={{ marginLeft: "15px" }}>
        <div className='flex items-center' style={{ marginTop: '35px', borderRadius: '10px', backgroundColor: '#f2f2f2', width: '380px', height: '70px', opacity: '' }}>
          <div className='symbol symbol-50px mt-1 mr-55'>

            <img
              src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
              style={{ width: '55px', marginLeft: '15px' }}
              className=' mt rounded-full object-cover'
            />
          </div>
          <div className='pl-2'>
            <div style={{ color: '#05445E', marginLeft: '15px', marginTop: '-4px', fontWeight: '500' }}>User Name </div>
            <div style={{ fontSize: '10px', color: '#05445E', marginLeft: '15px', marginTop: '2px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing Lorem </div>
          </div>
          <div style={{ fontSize: '8px', marginTop: '-50px', color: '#05445E' }}>04 May,13h45 PM</div>

        </div>
        <div className='flex items-center ml-2' style={{ marginTop: '35px', borderRadius: '10px', backgroundColor: '#f2f2f2', width: '380px', height: '70px', opacity: '' }}>
          <div className='symbol symbol-50px mt-1 mr-55'>

            <img
              src={toAbsoluteUrl('/media/avatars/300-2.jpg')}
              style={{ width: '55px', marginLeft: '15px' }}
              className=' mt rounded-full object-cover'
            />
          </div>
          <div className='pl-2'>
            <div style={{ color: '#05445E', marginLeft: '15px', marginTop: '-4px', fontWeight: '500' }}>User Name </div>
            <div style={{ fontSize: '10px', color: '#05445E', marginLeft: '15px', marginTop: '2px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing Lorem  </div>
          </div>
          <div style={{ fontSize: '8px', marginTop: '-50px', color: '#05445E' }}>04 May,13h45 PM</div>

        </div>
        <div className='flex items-center' style={{ marginTop: '35px', borderRadius: '10px', backgroundColor: '#f2f2f2', width: '380px', height: '70px', opacity: '' }}>
          <div className='symbol symbol-50px mt-1 mr-55'>

            <img
              src={toAbsoluteUrl('/media/avatars/300-4.jpg')}
              style={{ width: '55px', marginLeft: '15px' }}
              className=' mt rounded-full object-cover'
            />
          </div>


          <div className='pl-2'>
            <div style={{ color: '#05445E', marginLeft: '15px', marginTop: '-4px', fontWeight: '500' }}>User Name </div>
            <div style={{ fontSize: '10px', color: '#05445E', marginLeft: '15px', marginTop: '2px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing Lorem  </div>
          </div>
          <div style={{ fontSize: '8px', marginTop: '-50px', color: '#05445E' }}>04 May,13h45 PM</div>

        </div>
        <div className="separator " style={{
          textDecoration: '  underline double ', marginLeft: '5px', marginTop: '18px',
          flexGrow: '', borderBottom: '2px solid #D3D3D3 ', width: '380px'

        }}></div>
        <input type="text" id="commentaire" name="commentaire" placeholder="Write Your Comment Here " className="m-4 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-blue-200" style={{ backgroundColor: 'transparent' }} />
        <img style={{ marginLeft: '354px', marginTop: '-45px' }}
          src={toAbsoluteUrl('/assets/icons/com.svg')} />
      </div>
    </Card>
  )
}