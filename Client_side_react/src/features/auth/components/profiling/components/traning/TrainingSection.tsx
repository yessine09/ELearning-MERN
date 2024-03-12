import { useFormik } from 'formik'
import { CSSProperties, useContext, useEffect, useState } from 'react'
import { toAbsoluteUrl } from '../../../../../../helpers/AssetHelpers'
import { CustomInput } from '../../../Login'
import displayContext from '../../contexts/displayContext'
import trainingDataContext from '../../contexts/trainingDataContext'
import { TrainingSchema } from '../../schemas/TrainingSchema'
import TrainingInput from './TrainingInput'
import { useCustomContext } from '../../contexts/CustomContext'

const initialValues = {
    establishment: '',
    local: '',
    specialty: '',
    degree: '',
    startDate: new Date(),
    endDate: new Date(),
    student: true
}

export default function TrainingSection() {
    const [traningData, setTraningData] = useState<{
        data: {
            local: string;
            specialty: string;
            degree: string;
            startDate: Date;
            endDate: Date;
            establishment: string;
            student: boolean;
        }[]
    }>({ data: [] })
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false);
    const { customData, setCustomData } = useCustomContext();

    const formik = useFormik({
        initialValues,
        validationSchema: TrainingSchema,

        onSubmit: (values, actions) => {
            setTraningData(prevState => ({
                data: [...prevState.data, { establishment: values.establishment, local: values.local, specialty: values.specialty, degree: values.degree, startDate: values.startDate, endDate: values.endDate, student: values.student }]

            }));

            actions.resetForm()
            setShowForm(true)
        }
    })
    useEffect(() => {
        if (traningData) {
            setCustomData({
                ...customData,
                studies: traningData,
            });
        }
    }, [traningData]);

    const handleClick = () => {
        setShowForm(false)
    }

    const handleCancel = () => {
        setShowForm(true)
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
            <trainingDataContext.Provider value={{
                data: traningData.data,
                setTrainingData: setTraningData
            }}>

                < div className='flex justify-between flex-col w-[80%] mt-7 font-font text-darkBlue '>
                    {/* begin::Training section header*/}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div className='text-dark-blue' style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontWeight: 'bold', width: '50% auto', textAlign: 'center' }}>
                            Academic Training
                        </div>
                        <div onClick={handleClick} style={showForm ? activeStyle : inactiveStyle}>
                            <img src={toAbsoluteUrl('/assets/icons/plus.png')} alt="+icon" style={{ height: '20px', width: '20px' }} />
                        </div>
                    </div>
                    {/* end::Heading */}
                    {/* begin:: experience inputs mapping */}

                    <div className='flex justify-between flex-col items-center'>
                        {traningData.data.map((item, index) => (
                            <TrainingInput index={index} key={index} establishment={item.establishment} local={item.local} degree={item.degree} specialty={item.specialty} startDate={item.startDate} endDate={item.endDate} />
                        ))}
                    </div>
                    <form
                        style={{ width: '100%' }}
                        noValidate
                        id='kt_login_signup_form'
                        onSubmit={formik.handleSubmit}
                    >


                        {/* begin:: Button-wrapper*/}
                        <div className='d-flex flex-column justify-content-between'>
                            {/* begin::Professional Experience Form */}
                            <div className='flex justify-between'>
                                <CustomInput
                                    placeholder='Establishment'
                                    type='text'
                                    {...formik.getFieldProps('establishment')}
                                    className='custom-input mr-2 ' />
                                <CustomInput
                                    placeholder='local'
                                    type='text'
                                    {...formik.getFieldProps('local')}
                                    className='custom-input ml-2 ' />
                            </div>
                            <div className='flex justify-between'>
                                <CustomInput
                                    placeholder='Specialization'
                                    type='text'
                                    {...formik.getFieldProps('specialty')}
                                    className='custom-input mr-2 ' />
                                <CustomInput
                                    placeholder='Study Level'
                                    type='text'
                                    className='custom-input ml-2 '
                                    {...formik.getFieldProps('degree')}
                                />
                            </div>
                            <div className='flex justify-between'>
                                <CustomInput
                                    placeholder='Start Date'
                                    type='date'
                                    {...formik.getFieldProps('startDate')}
                                    className='custom-input mr-2 ' />
                                <CustomInput
                                    placeholder='End Date'
                                    type='date'
                                    className='custom-input ml-2 '
                                    {...formik.getFieldProps('endDate')}

                                />
                            </div>
                        </div>
                        <div className='flex items-center justify-end mt-5'>
                            <button
                                type='submit'
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
                                disabled={formik.isSubmitting || !formik.isValid}
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
                    </form>

                </div>
            </trainingDataContext.Provider>
        </displayContext.Provider>
    )
}
