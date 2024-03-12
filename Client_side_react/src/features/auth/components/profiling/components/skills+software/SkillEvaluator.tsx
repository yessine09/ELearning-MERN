import { SetStateAction, useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../custom/CustomButton';
import clsx from 'clsx';
import CustomErrors from '../../../Login/CustomErrors';
import { useCustomContext } from '../../contexts/CustomContext';
import skillContext from '../../contexts/skillsContext';

interface SkillEvaluatorProps {
    placeholder: string;
}

const HardSkillSchema = Yup.object().shape({
    skill: Yup.string().required('Skill is required'),
});

const SkillEvaluator = ({ placeholder }: SkillEvaluatorProps) => {
    const [activeButton, setActiveButton] = useState('');
    const [inputData, setInputData] = useState('');
    const [data, addData] = useState<{ data: { level: string; skill: string; isSoftSkill: boolean; }[]; }>({ data: [] })
    const { customData, setCustomData } = useCustomContext();

    const formik = useFormik({
        initialValues: {
            level: '',
            skill: '',
            isSoftSkill: true,

        },
        validationSchema: HardSkillSchema,
        onSubmit: (values) => {

            addData((prevState: { data: any; }) => ({
                data: [...prevState.data, {
                    level: activeButton,
                    skill: inputData,
                    isSoftSkill: placeholder.toLowerCase() !== "software",
                }]

            }));



        },

    });

    const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
        setInputData(event.target.value);
        formik.setFieldValue('skill', event.target.value);
    };

    const handleButtonClick = (level: SetStateAction<string>) => {
        setActiveButton(level);
        formik.setFieldValue('level', level);


    };
    useEffect(() => {
        if (data) {
            setCustomData({
                ...customData,
                skillsets: data
            });
        }
    }, [data])




    return (
        <form onSubmit={formik.handleSubmit} className=' min-h-minH mb-3 ' >
            <div className='flex items-center justify-center '>
                <div className='flex flex-col w-full' style={{ width: '50%' }}>
                    <input
                        type='text'
                        placeholder={placeholder}
                        autoComplete='off'
                        id="skill"
                        name="skill"
                        onChange={handleInputChange}
                        value={inputData}
                        style={{
                            border: '1px solid #1f5f82 ',
                            backgroundColor: 'transparent',
                            width: '100%',
                        }}
                        className=" min-h-minH px-5 rounded-[6px] border-[1px] border-inputBorderColor border-[solid] flex items-center"
                    />

                    {formik.touched.skill && formik.errors.skill && (
                        <CustomErrors>{formik.errors.skill}</CustomErrors>
                    )}
                </div>
                <div className='flex items-center'>
                    <CustomButton
                        label='Advanced'
                        onClick={() => handleButtonClick('Advanced')}
                        className={clsx('bg-darkBlue ml-2', { 'is-active': activeButton === 'Advanced' })}
                        active={activeButton === 'Advanced'} // Pass the active prop
                    />
                    <CustomButton
                        label='Medium'
                        onClick={() => handleButtonClick('Medium')}
                        className={clsx('bg-darkBlue', { 'is-active': activeButton === 'Medium' })}
                        active={activeButton === 'Medium'} // Pass the active prop
                    />
                    <CustomButton
                        label='Beginner'
                        onClick={() => handleButtonClick('Beginner')}
                        className={clsx('bg-darkBlue', { 'is-active': activeButton === 'Beginner' })}
                        active={activeButton === 'Beginner'} // Pass the active prop
                    />
                    {formik.touched.level && formik.errors.level ? (
                        <CustomErrors>{formik.errors.level}</CustomErrors>
                    ) : null}
                </div>

            </div>
        </form>
    );
}
export default SkillEvaluator;
