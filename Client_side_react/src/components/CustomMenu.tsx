import React from 'react'
import { toAbsoluteUrl } from '../helpers/AssetHelpers';

function CustomMenu({ title, program }: any) {
    return (
        <div className='flex flex-col  mt-[2.5%] '>
            <div className=' flex items-center' >
                <img src={toAbsoluteUrl('/assets/icons/home.svg')} className='mr-2' />
                <div className='font-segoe-ui text-lg font-[400] text-darkBlue'>{title} Dashboard</div>
            </div>
            <div className="flex items-center">
                <h1 className='text-darkBlue font-[700]' style={{ color: '#05445E', fontWeight: "500", fontFamily: 'Segoe UI', fontSize: '20px' }}>{program} Program</h1>
                <div>
                    <svg
                        className={`transform 'rotate-180' mt-[2px] ml-[2px]`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="21"
                        height="20"
                    >
                        <path id="_05d672bf2ec15f434a544f7a2214100f"
                            data-name="05d672bf2ec15f434a544f7a2214100f"
                            d="M20.5,11.5l-6,6-6-6"
                            transform="rotate(0)"
                            fill="none"
                            stroke="#05445e"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="2" />
                    </svg>
                </div>
                <div style={{
                    textDecoration: ' underline double ', marginTop: '12px', marginLeft: '8px',
                    flexGrow: '', borderBottom: '2px solid #D3D3D3', width: '550px'
                }}>
                    {""}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
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
                        <img src={toAbsoluteUrl('assets/icons/message.svg')} />
                    </div>
                    <div className='' style={{ display: 'flex', alignItems: 'center', marginLeft: '-75px' }}>
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
                            <img src={toAbsoluteUrl('assets/icons/ring.svg')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomMenu;