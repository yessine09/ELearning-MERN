import { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs"
import ManageComponent from "../experience/ManageComponent";
import trainingDataContext from "../../contexts/trainingDataContext";
import { useFormik } from 'formik'
import clsx from 'clsx'
import { TrainingSchema } from "../../schemas/TrainingSchema";
import { CustomInput } from "../../../Login";
type DisplayContextType = {
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};
type trainingProps = {
    establishment: string,
    local: string,
    specialty: string,
    degree: string,
    startDate: Date,
    endDate: Date,
    index: number,
}

export default function TrainingInput({ index }: trainingProps) {
    const [isClicked, setClicked] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false)

    const { data, setTrainingData } = useContext(trainingDataContext);
    const Data = data.filter((e, terfess) => terfess === index)
    const { establishment, local, specialty, degree, startDate, endDate } = Data[0];
    const initialValues = {
        establishment: establishment,
        local: local,
        specialty: specialty,
        degree: degree,
        startDate: startDate,
        endDate: endDate,
    }
    const handleSubmit = (values: { establishment: any; local: any; specialty: any; degree: any; startDate: any; endDate: any; }, actions: { resetForm: () => void; }) => {
        setTrainingData(prevState => {
            const updatedData = [...prevState.data];
            updatedData[index] = {
                ...updatedData[index],
                establishment: values.establishment,
                local: values.local,
                specialty: values.specialty,
                degree: values.degree,
                startDate: values.startDate,
                endDate: values.endDate,
            };
            return { ...prevState, data: updatedData };
        });
        actions.resetForm();
        setShowForm(false);
    };
    const formik = useFormik({
        initialValues,
        validationSchema: TrainingSchema,
        onSubmit: handleSubmit
    })

    const handleCancel = () => {
        setShowForm(true)
    }

    function handleDelete() {
        setTrainingData((prevState: { data: any[]; }) => ({
            ...prevState,
            data: prevState.data.filter((item, i) => i !== index)
        }));
        setClicked(!isClicked);

    }
    function handleEdit() {
        setShowForm(!showForm);
        setClicked(!isClicked);
    }

    function handleClick() {
        setClicked(!isClicked);
    }

    const activeStyle = {
        display: "none",
    };

    const inactiveStyle = {
        display: "block",
        width: "25px",
        height: "25px",
    };

    return (
        <>
            <div className="text-darkBlue min-h-minH items-center justify-between rounded-[6px] px-3 flex  w-[100%] font-font mb-[10px] border-[1px] border-solid border-[#1f5f82] "
                style={{ width: '100%', border: '1px solid #1f5f82 ', backgroundColor: 'transparent', fontFamily: 'Segoe UI', marginBottom: '10px' }}

            >
                <div >
                    <span style={{ fontWeight: '500', textTransform: 'uppercase' }}>{establishment}, </span>
                    <span>{local}, </span>
                    <span>{specialty}, </span>
                    <span>{degree}, </span>
                    <span>{startDate.toString()}, </span>
                    <span>{endDate.toString()}, </span>

                </div>
                <div style={{ position: "relative" }} >
                    <BsThreeDots className='text-fancy-blue' onClick={handleClick} style={isClicked ? activeStyle : inactiveStyle} ></BsThreeDots>
                    {isClicked &&
                        <div>
                            <ManageComponent handleEdit={handleEdit} handleDelete={handleDelete} onClick={handleClick} />
                        </div>}
                </div>
            </div>
            {
                showForm && (
                    <>
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





                    </>
                )

            }

        </>
    )
}
