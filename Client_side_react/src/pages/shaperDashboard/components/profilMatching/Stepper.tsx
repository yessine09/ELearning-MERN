import React, { useState } from 'react';
import BasicInformation from '../profileSettings/BasicInformation';
import ProfessionalExperience from '../profileSettings/professionalInfo/ProfessionalExperience';
import ResumePortfolio from '../profileSettings/ResumePortfolio';

type Step = 'basic' | 'experience' | 'resume & portfolio';

const Stepper: React.FC = () => {
    const [activeStep, setActiveStep] = useState<Step>('basic');

    const handleStepClick = (step: Step) => {
        setActiveStep(step);
    };

    return (
        <div className='w-full'>
            <ul className="flex justify-between mt-5 px-[10px]">
                <li
                    className={`cursor-pointer ${activeStep === 'basic'
                        ? 'font-font font-[600] text-[18px] text-darkBlue '
                        : 'text-darkBlue opacity-[50%]'
                        }`}
                    onClick={() => handleStepClick('basic')}
                >
                    Company Matching
                </li>
                <li
                    className={`ml-44 cursor-pointer ${activeStep === 'experience'
                        ? 'font-font font-[600] text-[18px] text-darkBlue '
                        : 'text-darkBlue opacity-[50%]'
                        }`}
                    onClick={() => handleStepClick('experience')}
                >
                    Aplication Story
                </li>
                <li
                    className={`ml-44 cursor-pointer ${activeStep === 'resume & portfolio'
                        ? 'font-font font-[600] text-[18px] text-darkBlue '
                        : 'text-darkBlue opacity-[50%]'
                        }`}
                    onClick={() => handleStepClick('resume & portfolio')}
                >
                    Saved
                </li>
            </ul>
            <div className="relative mt-4 ml-[2px] px-[2px]">
                <div
                    className={`absolute top-0 bottom-0 ${activeStep === 'basic'
                        ? 'left-0 bg-fancyBlue'
                        : activeStep === 'experience'
                            ? 'left-1/3 bg-fancyBlue'
                            : 'right-0 bg-fancyBlue'
                        }`}
                    style={{
                        width: 'calc(100% / 3)',
                        transition: 'left 0.3s',
                    }}
                />
                <div className="flex items-center justify-between">
                    <div
                        className={`w-1/3 h-[2.5px] rounded-full ${activeStep === 'basic' ? 'bg-fancyBlue' : 'bg-gray-300'
                            }`}
                    />
                    <div
                        className={`w-1/3 h-[2.5px] rounded-full ${activeStep === 'experience' ? 'bg-fancyBlue' : 'bg-gray-300'
                            }`}
                    />
                    <div
                        className={`w-1/3 h-[2.5px] rounded-full ${activeStep === 'resume & portfolio' ? 'bg-fancyBlue' : 'bg-gray-300'
                            }`}
                    />
                </div>
            </div>

        </div>
    );
};

export default Stepper;
