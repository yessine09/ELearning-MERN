/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Card } from '@material-tailwind/react'

type Props = {
  className: string
}

const SuccessRate: React.FC<Props> = ({ className }) => {
  return (
    <Card className="" style={{ boxShadow: '1px 2px 9px #0000003D', marginTop: '0px', backgroundColor: 'white', width: '200px', height: '150px' }}>
      {/* begin::Header */}
      <div className='card-header align-items-center border-0 '>
        <h3 className='card-title m-7 flex items-center'>
          <img src='assets/icons/fleche1.svg' style={{ marginTop: '4px' }}></img>

          <span style={{ color: '#05445E', fontSize: '30px', marginRight: '96px', marginTop: '-20px', height: '14px' }}>20%</span>

        </h3>
        <div className='card-toolbar mt-5'>
          <span style={{ color: '#3699ff', fontFamily: 'Segoe UI', fontSize: '20px', fontWeight: 'lighter', marginLeft: '30px' }}>Success rate  </span>
        </div>
      </div>
      {/* end::Body */}
    </Card>
  )
}

export default SuccessRate
