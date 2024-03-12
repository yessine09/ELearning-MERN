import React, { useEffect, useState } from 'react'
import Sidebar from '../../SideBarShaper'
import Stepper from './Stepper'
import { Card } from '@material-tailwind/react'
import { toAbsoluteUrl } from '../../../../helpers/AssetHelpers'
import Cookies from 'js-cookie'
import { IJobOffer, getMatchingJobOffers } from '../../../../api/matchMaking'
import { useStack } from '../../../../contexts/Stack'
import JobOffer from './Company'

export default function CompanyMatch() {
    const stack = useStack();
    const userId = Cookies.get('userId');
    const [matchingJobOffers, setMatchingJobOffers] = useState([])
    useEffect(() => {
        const fetchMatchingJobOffersData = async () => {
            try {
                const jobOffers = await getMatchingJobOffers(userId)
                setMatchingJobOffers(jobOffers)
                // console.log(jobOffers)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMatchingJobOffersData()
        // console.log(matchingJobOffers)

    }, [userId])



    return (
        <div className="flex h-[250vh]" >
            <Sidebar />
            <div className="flex-1 bg-gray-100">
                <div className='m-[2%] flex items-center' style={{ marginLeft: '80px' }}>
                    <img src='/assets/icons/home.svg' />
                    <div className='ml-2 font-segoe-ui text-lg text-darkBlue opacity-90 '> Match Making Dashboard </div>
                </div>

                <div className="flex items-center">
                    <h1 className='font-font font-semibold text-darkBlue text-xl ml-20'>Matching Job Offers<div className="separator " style={{
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
                            </div>
                        </div>

                    </div>

                </div>
                <div className='flex ml-[65px] mt-10 items-center justify-between w-[70%]'>

                    <Stepper />
                </div>
                {matchingJobOffers.map((jobOffer: IJobOffer, index) => {
                    const startDate = new Date(jobOffer.createdAt);
                    const currentDate = new Date();
                    const differenceInMilliseconds = currentDate.getTime() - startDate.getTime();
                    const differenceInDays = Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));

                    let startDateText;
                    if (differenceInDays >= 7) {
                        const differenceInWeeks = Math.floor(differenceInDays / 7);
                        startDateText = `${differenceInWeeks} week${differenceInWeeks > 1 ? 's' : ''} ago`;
                    } else if (differenceInDays < 1) {
                        const differenceInHours = Math.floor(differenceInMilliseconds / (60 * 60 * 1000));
                        startDateText = `${differenceInHours} hour${differenceInHours > 1 ? 's' : ''} ago`;
                    } else {
                        startDateText = `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`;
                    }

                    return (
                        <div key={index} className="flex ml-[65px] mt-10 items-center justify-between w-[70%]">
                            <Card style={{ boxShadow: '1px 2px 9px #0000003D', backgroundColor: '', width: '160%', height: '140px', overflow: 'hidden' }} onClick={() => stack.push(<JobOffer jobOfferId={jobOffer.id} HideModal={() => stack.pop()} />)}>
                                <div className="flex flex-col">
                                    <div className="flex flex-col flex-end font-font h-fit text-darkBlue  pt-2 ml-[65%]">
                                        <div className='flex'>
                                            <span className='opacity-[60%]'> Matching With Your Profile</span> <span className="text-darkBlue opacity-100 font-font font-bold pl-4">{jobOffer.score.toFixed(2)} %</span></div>
                                        <div className="flex items-center pt-2 ">
                                            <div className="w-1/3 h-[6px] bg-fancyBlue "></div>
                                            {jobOffer.score < 100 && (
                                                <div className="w-1/2 h-[6px] bg-gray-300 rounded-sm"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex pl-[10px]">
                                        {jobOffer.company && (
                                            <div className="symbol symbol-52px ml-8">
                                                <img src={`${jobOffer.company.logo}`} alt="" className="w-16 h-16 rounded-full p-2 object-cover shadow-lg" />
                                            </div>)}
                                        <div className="flex flex-col items-start px-[3%] w-full">
                                            <div><span style={{ color: '#d1d8db', fontFamily: 'Segoe UI', fontWeight: '400' }}>{jobOffer.company.name}</span></div>
                                            <div><span style={{ fontSize: '20px', color: '#05445E', fontFamily: 'Segoe UI', fontWeight: '700' }}>{jobOffer.position}</span></div>
                                            <div className="flex items-center justify-between font-font text-darkBlue opacity-[60%] w-[45%]">
                                                <span className="mr-[2%]">Fully Remote</span>
                                                <span>{jobOffer.location}</span>
                                                <span>{startDateText}</span>
                                            </div>
                                        </div>
                                        <div className="pt-2 pr-4">
                                            <div><img src="/assets/icons/Saved.svg" alt="Saved" /></div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    );
                })}
            </div >
        </div >




    )
}
