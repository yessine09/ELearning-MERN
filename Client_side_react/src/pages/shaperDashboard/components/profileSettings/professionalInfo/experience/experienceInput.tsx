import { useFormik } from 'formik';
import { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import expContext from '../../../../../../features/auth/components/profiling/contexts/dataExpContext';
import { ExperienceSchema } from '../../../../../../features/auth/yupSchemas';
import { CustomInput } from '../../../../../../features/auth/components/Login';
import ManageComponent from './manageComponent';


type DisplayContextType = {
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

type experienceProps = {
    job: string,
    company: string,
    Local: string,
    period: string,
    index: number,
}

export default function ExperienceInput({ job, company, Local, period, index }: experienceProps) {
    const [isClicked, setClicked] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const { data, setFormData } = useContext(expContext);
    const initialValues = {
        job: job,
        local: Local,
        company: company,
        period: period,
    };
    const handleSubmit = (values: { job: any; local: any; company: any; period: any; }, actions: { resetForm: () => void; }) => {
        setFormData(prevState => {
            const updatedData = [...prevState.data];
            updatedData[index] = {
                ...updatedData[index],
                job: values.job,
                local: values.local,
                company: values.company,
                period: values.period
            };
            return { ...prevState, data: updatedData };
        });
        actions.resetForm();
        setShowForm(false);
    };
    const formik = useFormik({
        initialValues,
        validationSchema: ExperienceSchema,
        onSubmit: handleSubmit
    });

    const handleCancel = () => {
        setShowForm(false);
    };

    function handleDelete() {
        setFormData(prevState => ({
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
            <div className="text-darkBlue min-h-minH items-center justify-between rounded-[6px] px-2 flex  w-[100%] font-font mb-[10px] border-[1px] border-solid border-[#1f5f82] " >
                <div >
                    <span style={{ fontWeight: '500', textTransform: 'uppercase' }}>{job} ,</span>
                    <span>{company}, </span>
                    <span>{Local}, </span>
                    <span>{period}</span>
                </div>
                <div className="relative">
                    <BsThreeDots className='text-fancy-blue' onClick={handleClick} style={isClicked ? activeStyle : inactiveStyle} ></BsThreeDots>
                    {isClicked &&
                        <div>
                            <ManageComponent handleEdit={handleEdit} onClick={handleClick} />
                        </div>}
                </div>
            </div>
            {
                showForm && (
                    <>
                        <form
                            className=' flex h-fit flex-col rounded-md font-font w-full'
                            // style={{ width: '100%' }}
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <div className='flex flex-col justify-between'>
                                {/* begin::Professional Experience Form */}
                                <div className='flex justify-between'>
                                    <CustomInput placeholder='Job Title' type='text' className='custom-input mr-2 '  {...formik.getFieldProps('job')} />
                                    <CustomInput placeholder='Company' type='text' className='custom-input  ml-2 ' {...formik.getFieldProps('company')} />
                                </div>
                                <div className='flex justify-between'>
                                    <CustomInput placeholder='Local' type='text' className='custom-input mr-2 ' {...formik.getFieldProps('local')} />
                                    <CustomInput placeholder='Period' type='text' className='custom-input ml-2' {...formik.getFieldProps('period')} />
                                </div>
                                {/* bend:: Input-wrapper*/}
                                {/* begin:: Buttons-wrapper*/}
                                <div className='flex items-center mt-10 justify-end'>
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
                            </div>
                        </form>
                    </>
                )
            }
        </>
    )
}
