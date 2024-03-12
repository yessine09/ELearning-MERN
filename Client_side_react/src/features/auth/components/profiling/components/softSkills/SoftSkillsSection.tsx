// import { useState } from 'react'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import * as Yup from 'yup'
import CustomErrors from '../../../Login/CustomErrors'
import { useCustomContext } from '../../contexts/CustomContext'
const initialValues = {
    skill: '',
}

const ExperienceSchema = Yup.object().shape({
    skill: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('At least one soft Skills is required'),
})

export default function SoftSkillsSection() {
    const [loading, setLoading] = useState(false)
    const { customData, setCustomData } = useCustomContext();

    const [softSkills, setSoftSkills] = useState<{
        data: {
            skill: string
        }[]
    }>({ data: [] })

    const formik = useFormik({
        initialValues,
        validationSchema: ExperienceSchema,

        onSubmit: (values) => {
            setLoading(true)
            setSoftSkills((prevState: { data: any }) => ({
                data: [...prevState.data, { skill: values.skill }]
            }))
            formik.resetForm()
        },

    })
    useEffect(() => {
        if (softSkills) {
            setCustomData({
                ...customData,
                softSkills: softSkills,
            });
        }
    }, [softSkills]);


    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            console.log(softSkills)
            formik.handleSubmit()
        }
    }

    const handleDelete = (index: number) => {
        setSoftSkills((prevState) => ({
            data: prevState.data.filter((_, i) => i !== index)
        }));
    }
    return (
        <div className='w-[80%] h-fit m-6'>
            {/* begin::soft skills Heading */}

            <div className='text-darkBlue flex items-start w-[80%]' style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontWeight: 'bold', width: '50% auto', textAlign: 'center', marginBottom: '20px' }}>
                Soft Skills
            </div>

            {/* end::Heading */}
            <div >
                <form className=' min-h-minH px-5 rounded-[6px] border-[1px] border-inputBorderColor border-[solid] flex items-center' onSubmit={formik.handleSubmit} >
                    <div id='kt_login_signup_form' style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        {softSkills.data.map((item: { skill: string }, index: number) => (
                            <div

                                className='flex justify-between rounded-[5px] items-center '
                                style={{
                                    borderRadius: '5px',
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "0 10px",
                                    marginRight: "5px",
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
                                    type="button"
                                    style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        marginLeft: "5px",
                                        cursor: "pointer",
                                        fontSize: '12px',
                                        fontFamily: 'Segoe UI',
                                        fontWeight: 'bold'
                                    }}
                                    onClick={() => handleDelete(index)}
                                >

                                    <IoClose style={{ fontSize: '20px', color: '#05445E' }} />
                                </button>
                            </div>
                        ))}

                    </div>
                    <input
                        type='skill'
                        placeholder=''
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
                {formik.errors.skill && formik.touched.skill && softSkills.data.length <= 0 && (
                    <CustomErrors>{formik.errors.skill}</CustomErrors>
                )}
            </div>
        </div>
    )
}
