import { useState } from 'react'
import SkillEvaluator from './SkillEvaluator'
// import { SkillProvider } from '../../contexts/skillsContext'
import { toAbsoluteUrl } from '../../../../../../helpers/AssetHelpers';


export default function SkillSection() {
    const [showSkillComponent, setSkillShowComponent] = useState(false);
    const [showSoftwareComponent, setshowSoftwareComponent] = useState(false);


    const handleButtonClick = () => {
        setSkillShowComponent(!showSkillComponent);
    };
    const handleButtonClickk = () => {
        setshowSoftwareComponent(!showSoftwareComponent);
    };

    return (
        // <SkillProvider>
        <div className='flex justify-between flex-col w-[80%]'>
            {/* begin::Hard skills */}
            <div >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className='text-dark-blue' style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontWeight: 'bold', width: '50% auto', textAlign: 'center' }}>
                        Hard Skills
                    </div>
                    <div onClick={handleButtonClick} >
                        <img src={toAbsoluteUrl('/assets/icons/plus.png')} alt="+icon" style={{ height: '20px', width: '20px' }} />
                    </div>
                </div>
                {/* end::Heading */}
                <div className='d-flex flex-justify-between flex-column mt-5' style={{ width: '100%' }} >
                    <SkillEvaluator placeholder="Enter your hard skills" />
                    <SkillEvaluator placeholder="Enter your hard skills" />
                    <SkillEvaluator placeholder="Enter your hard skills" />
                    {showSkillComponent && <SkillEvaluator placeholder='Enter your hard skills' />}
                </div>
            </div>
            <div>
                <div className='flex justify-between items-center mt-7 font-font text-[18px] font-bold'>
                    <div className='text-dark-blue' style={{ width: '50% auto', textAlign: 'center' }}>
                        Software
                    </div>
                    <div onClick={handleButtonClickk}>
                        <img src={toAbsoluteUrl('/assets/icons/plus.png')} alt="+icon" style={{ height: '20px', width: '20px' }} />
                    </div>
                </div>
                {/* end::Heading */}
                <div className='d-flex flex-justify-between flex-column mt-5'>
                    <SkillEvaluator placeholder="Software" />
                    <SkillEvaluator placeholder="Software" />
                    <SkillEvaluator placeholder="Software" />
                    {showSoftwareComponent && <SkillEvaluator placeholder='Software' />}

                </div>
            </div>

        </div>
        // </SkillProvider>
    )
}
