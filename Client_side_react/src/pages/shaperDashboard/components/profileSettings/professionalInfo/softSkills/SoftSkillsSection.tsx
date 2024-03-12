import { useFormik } from 'formik';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface SoftSkill {
    skill: string;
}

interface SoftSkillsProps {
    softSkills: {
        data: SoftSkill[];
    };
    setSoftSkills: React.Dispatch<React.SetStateAction<{ data: SoftSkill[] }>>;
}


const initialValues = {
    skill: '',
};

export default function SoftSkillsSection({ softSkills, setSoftSkills }: SoftSkillsProps) {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            setLoading(true);
            setSoftSkills((prevState) => ({
                data: [...prevState.data, { skill: values.skill }],
            }));
            formik.resetForm();
            setLoading(false);
        },
    });

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            formik.handleSubmit();
        }
    };

    const handleDelete = (index: number) => {
        setSoftSkills((prevState) => ({
            data: prevState.data.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className='h-fit'>
            {/* begin::soft skills Heading */}
            <div
                className='text-darkBlue flex items-start'
                style={{
                    fontFamily: 'Segoe UI',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    width: '50% auto',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}
            >
                Soft Skills
            </div>
            {/* end::Heading */}
            <div>
                <form
                    className='min-h-minH px-5 w-full rounded-[6px] border-[1px] border-inputBorderColor border-[solid] flex items-center'
                    onSubmit={formik.handleSubmit}
                >
                    <div id='kt_login_signup_form' style={{ display: 'flex', alignItems: 'center' }}>
                        {softSkills.data.map((item: SoftSkill, index: number) => (
                            <div
                                className='flex justify-between rounded-[5px] items-center'
                                style={{
                                    borderRadius: '5px',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 10px',
                                    marginRight: '5px',
                                    backgroundColor: '#FFCC29',
                                    opacity: '50%',
                                    fontFamily: 'Segoe UI',
                                    fontWeight: 'bold',
                                    color: '#05445E',
                                }}
                                key={index}
                            >
                                {item.skill}
                                <button
                                    type='button'
                                    style={{
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        marginLeft: '5px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        fontFamily: 'Segoe UI',
                                        fontWeight: 'bold',
                                    }}
                                    onClick={() => handleDelete(index)}
                                >
                                    <IoClose style={{ fontSize: '20px', color: '#05445E' }} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        type='text'
                        placeholder='Add a soft skill'
                        autoComplete='off'
                        style={{
                            border: 'none',
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'transparent',
                            outline: 'none',
                        }}
                        value={formik.values.skill}
                        onChange={formik.handleChange('skill')}
                        onBlur={formik.handleBlur('skill')}
                        onKeyUp={handleKeyUp}
                    />
                </form>
            </div>
        </div>
    )
}
