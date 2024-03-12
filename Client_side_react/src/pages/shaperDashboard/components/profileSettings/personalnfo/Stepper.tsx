import React, { useState } from 'react';
import BasicInformation from '../BasicInformation';
import ProfessionalExperience from '../professionalInfo/ProfessionalExperience';
import ResumePortfolio from '../ResumePortfolio';

type Step = 'basic' | 'experience' | 'resume & portfolio';

const Stepper: React.FC = () => {
    const [activeStep, setActiveStep] = useState<Step>('basic');

    const handleStepClick = (step: Step) => {
        setActiveStep(step);
    };

    return (
        <div>
            <ul className="flex justify-between mt-4 px-[40px]">
                <li
                    className={`cursor-pointer ${activeStep === 'basic'
                        ? 'font-font font-[600] text-[18px] text-darkBlue '
                        : 'text-darkBlue opacity-[50%]'
                        }`}
                    onClick={() => handleStepClick('basic')}
                >
                    Basic Information
                </li>
                <li
                    className={`cursor-pointer ${activeStep === 'experience'
                        ? 'font-font font-[600] text-[18px] text-darkBlue '
                        : 'text-darkBlue opacity-[50%]'
                        }`}
                    onClick={() => handleStepClick('experience')}
                >
                    Professional Experience
                </li>
                <li
                    className={`cursor-pointer ${activeStep === 'resume & portfolio'
                        ? 'font-font font-[600] text-[18px] text-darkBlue '
                        : 'text-darkBlue opacity-[50%]'
                        }`}
                    onClick={() => handleStepClick('resume & portfolio')}
                >
                    Resume And Portfolio
                </li>
            </ul>
            <div className="relative mt-4 ml-[30px] px-[40px]">
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
            {activeStep === 'basic' && <BasicInformation />}
            {activeStep === 'experience' && <ProfessionalExperience />}
            {activeStep === 'resume & portfolio' && <ResumePortfolio />}
        </div>
    );
};

export default Stepper;
