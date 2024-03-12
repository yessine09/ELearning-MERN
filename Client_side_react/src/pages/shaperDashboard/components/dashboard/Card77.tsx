/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card } from '@material-tailwind/react'
import React from 'react'


type Props = {
    className: string
}

const Card77: React.FC<Props> = ({ className }) => {
    return (
        <Card style={{
            boxShadow: '1px 2px 9px #0000003D', borderRadius: '10px', fontFamily: 'Segoe UI', backgroundColor: 'white', width: '200px', height: '160px'
        }}>
            {/* begin::Header */}
            <div className=' '>

                <h3 className='mt-3' style={{ fontWeight: "bold", color: '#05445E', fontSize: '15px', fontFamily: 'Segoe UI', marginLeft: '5px' }}>
                    <svg style={{}} xmlns="http://www.w3.org/2000/svg" width="15.953" height="38.953" viewBox="0 0 38.953 38.953">
                        <path id="_320364e0178437c8191e507ddc54288d" data-name="320364e0178437c8191e507ddc54288d" d="M19.477,0A19.477,19.477,0,1,0,38.953,19.477,19.488,19.488,0,0,0,19.477,0Zm0,1.5A17.977,17.977,0,1,1,1.5,19.477,17.965,17.965,0,0,1,19.477,1.5Zm-5.993,5.99a3,3,0,0,0-2.978,2.83.749.749,0,0,0-.018.166V30.713a.749.749,0,0,0,.749.749H29.215a.749.749,0,0,0,.749-.749V12.823a.867.867,0,0,0-.515-.8,1.452,1.452,0,0,1-.995-1.539,1.447,1.447,0,0,1,.995-1.536.749.749,0,0,0-.237-1.461Zm0,1.5H27.615a2.431,2.431,0,0,0-.659,1.5,2.434,2.434,0,0,0,.659,1.5H13.484a1.5,1.5,0,0,1,0-3Zm-1.5,4.074a2.951,2.951,0,0,0,1.5.421H28.466v16.48H11.986Zm6.68,4.916a1.51,1.51,0,0,0-1.5,1.5,1.421,1.421,0,0,0,.085.415L14.6,22.548a1.368,1.368,0,0,0-.366-.075,1.5,1.5,0,1,0,1.5,1.5,1.472,1.472,0,0,0-.075-.363l2.7-2.7a1.384,1.384,0,0,0,.313.064,1.431,1.431,0,0,0,.415-.085L22.692,24.5a.749.749,0,0,0,1.2-.192l1.678-3.354a1.49,1.49,0,1,0-1.6-1.477,1.441,1.441,0,0,0,.267.794l-1.221,2.436L20.1,19.79a1.385,1.385,0,0,0,.064-.313,1.51,1.51,0,0,0-1.5-1.5Z" fill="#189ab4" />
                    </svg>Digital Marketing</h3>

            </div>
            <span style={{ marginTop: '8px', marginLeft: '25px', color: '#6B7280', fontWeight: '', fontSize: '13px' }} >Lead By Khra</span>

            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body pt-5 ml-5'>
                <div>
                    <a href="#" style={{ textDecoration: "underline", color: '#FFCC29' }}>
                        View
                    </a>
                </div>
            </div>



            {/* end::Body */}
        </Card>
    )
}

export { Card77 }