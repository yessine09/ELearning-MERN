import { useFormik } from 'formik'
import { CSSProperties, useContext, useEffect, useState } from 'react'
import { toAbsoluteUrl } from '../../../../../../helpers/AssetHelpers'
import { ExperienceSchema } from '../../../../../../features/auth/yupSchemas'
import displayContext from '../../../../../../features/auth/components/profiling/contexts/displayContext'
import { CustomInput } from '../../../../../../features/auth/components/Login'
import ExperienceInput from './experienceInput'

const initialValues = {
    job: '',
    local: '',
    company: '',
    period: '',
}

export default function ExperienceComponent() {
    const [formdata, setFormData] = useState<{ data: { job: string; local: string; company: string; period: string; }[] }>({ data: [] });
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false);


    const formik = useFormik({
        initialValues,
        validationSchema: ExperienceSchema,
        onSubmit: (values, actions) => {
            console.log("validationSchema: " + values)
            setFormData(prevState => ({
                data: [...prevState.data, { job: values.job, local: values.local, company: values.company, period: values.period, index: prevState.data.length }]

            }));
            actions.resetForm()
            setShowForm(true)

        }
    })

    const handleClick = () => {
        setShowForm(false)
    }

    const handleCancel = () => {
        setShowForm(true)
        console.log("clicked")
    }

    const activeStyle: CSSProperties = {
        pointerEvents: 'visibleStroke'
    };

    const inactiveStyle: CSSProperties = {
        pointerEvents: 'none',
        opacity: '0.5',
    };


    return (
        <displayContext.Provider value={{ showForm, setShowForm }}>
            <div className='mx-[6%] flex justify-between flex-col w-[90%] mt-7 font-font text-darkBlue'>

                <div className='flex justify-between items-center'>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontWeight: 'bold', width: '50% auto', textAlign: 'center' }}>
                        Professional Experience
                    </div>
                    <div onClick={handleClick} style={showForm ? activeStyle : inactiveStyle}>
                        <img src={toAbsoluteUrl('/assets/icons/plus.png')} alt="+icon" style={{ height: '20px', width: '20px' }} />
                    </div>
                </div>

                <div className='flex justify-between flex-col items-center'>
                    {formdata.data.map((item, index) => (
                        <ExperienceInput index={index} key={index} job={item.job} company={item.company} Local={item.local} period={item.period} />
                    ))}
                </div>

                {(!showForm || formdata.data.length <= 0) && (
                    <form
                        className=' flex h-fit flex-col rounded-md font-font w-full'
                        // style={{ width: '100%' }}
                        noValidate
                        onSubmit={formik.handleSubmit}
                    >
                        <div className='flex flex-col justify-between'>
                            {/* begin::Professional Experience Form */}
                            <div className='flex justify-between'>
                                <input placeholder='Job Title' type='text' className='custom-input mr-2 '  {...formik.getFieldProps('job')} />
                                <input placeholder='Company' type='text' className='custom-input  ml-2 ' {...formik.getFieldProps('company')} />
                            </div>
                            <div className='flex justify-between'>
                                <input placeholder='Local' type='text' className='custom-input mr-2 ' {...formik.getFieldProps('local')} />
                                <input placeholder='Period' type='text' className='custom-input ml-2' {...formik.getFieldProps('period')} />
                            </div>
                            {/* bend:: Input-wrapper*/}
                            {/* begin:: Buttons-wrapper*/}
                            <div className='flex items-center justify-end mt-5'>
                                <button
                                    type='button'
                                    className='cancelBtn'
                                    onClick={handleCancel}
                                >
                                    {!loading && <span className='indicator-label'>Cancel</span>}
                                    {loading && (
                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                            Please wait...
                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    )}
                                </button>

                                <button
                                    type='submit'
                                    id='kt_sign_in_submit'
                                    // disabled={formik.isSubmitting || !formik.isValid}
                                    className='saveBtn'
                                >
                                    {!loading && <span className='indicator-label'>Save</span>}
                                    {loading && (
                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                            Please wait...
                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </displayContext.Provider>
    )
}
