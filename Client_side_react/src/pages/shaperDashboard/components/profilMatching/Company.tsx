import { useEffect, useState } from 'react'
import { Card } from '@material-tailwind/react'
import { IJobOffer, JobApplication, getJobOfferById, handlejobApplication } from '../../../../api/matchMaking'
import Cookies from 'js-cookie';
import { toAbsoluteUrl } from '../../../../helpers/AssetHelpers';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import jobApplicationSchema from '../../../../schemas/jobApplication';

type jobOfferProps = {
    jobOfferId: string,
    HideModal: () => void;
}

export default function JobOffer({ jobOfferId, HideModal }: jobOfferProps) {
    const [jobOffer, setJobOffer] = useState<IJobOffer | undefined>();
    const [showOffer, setShowOffer] = useState(true);
    const [showApplication, setShowApplication] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file);
        // handle the file selection logic here
    };
    const { mutate } = useMutation(handlejobApplication, {
        onSuccess: (data) => {
            if (data.status === 'failed to submit your job application') {
                toast.error(data.msg, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } else {
                toast.info(data.status, {
                    position: 'top-right',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: '0px 2px 5px rgba(0,0,0,0.5)',
                    },
                });
            }
        },
        onError: (error: Error) => {
            console.error(error);
            const response = (error as any).response?.data;
            const errorMsg = response?.msg || 'Failed to submit your job application';
            toast.error(errorMsg, {
                position: "top-right",
                theme: "colored",
                style: {
                    backgroundColor: 'rgb(171, 228, 234)',
                    boxShadow: '0px 2px 5px rgba(0,0,0,0.5)',
                    color: "#FE3721"
                },
            });
        },
    });

    const applicantId = Cookies.get('userId')

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            resume: null as File | null,
            coverLetter: "",
            jobOfferId: jobOfferId as string,
            applicantId: applicantId,
            status: "Pending"
        },
        validationSchema: jobApplicationSchema,
        onSubmit: (values) => {
            // Create a new FormData instance
            const formData = new FormData();

            // Append the form values to the formData
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('address', values.address);
            formData.append('resume', selectedFile); // Append the selected file
            formData.append('coverLetter', values.coverLetter);
            formData.append('jobOfferId', jobOfferId);
            formData.append('applicantId', applicantId);
            formData.append('status', values.status);

            // Make the mutation request with the formData
            mutate(formData);

            console.log(values);
            HideModal();
        },

    });
    useEffect(() => {
        const fetchJobOffersData = async () => {
            try {
                const jobOffer = await getJobOfferById(jobOfferId)
                setJobOffer(jobOffer)
            } catch (error) {
                console.log(error)
            }
        }
        fetchJobOffersData()
    }, [jobOfferId])

    if (!jobOffer) {
        return null; // Return null or a loading indicator while waiting for the data to be fetched
    }

    const handleApllication = () => {
        setShowOffer(false);
        setShowApplication(true);
    }
    const handleOffer = () => {
        setShowOffer(true);
        setShowApplication(false);
    }


    return (
        <div className="flex h-fit justify-center pb-6 w-[60%] bg-white absolute top-[18%] left-[25%] z-30 rounded-xl shadow-2xl" >
            <div className='border-r-2 flex flex-col border-gray-200 w-full px-6 py-[16%]' >
                {showApplication === true && showOffer === false &&
                    <div className='font-font text-darkBlue text-[20px] pb-4' >
                        <div className='font-font text-darkBlue flex items-center font-bold text-[20px]' onClick={handleApllication}>
                            < div className=" mt-4 items-center h-10 mr-2 border-2 border-amber-400" />
                            <span className='font-font font-bold text-darkBlue'> Application</span>
                        </div>
                        <div className='font-font text-darkBlue flex items-center text-[20px]' onClick={handleOffer}>
                            <span> Offer</span>
                        </div>
                    </div>
                }


                {showApplication === false && showOffer === true &&
                    <div className='font-font text-darkBlue text-[20px] pb-4' >

                        <div className='font-font text-darkBlue flex items-center text-[20px]' onClick={handleApllication}>
                            <span className=''> Application</span>
                        </div>
                        <div className='font-font text-darkBlue flex items-center font-bold text-[20px]'>
                            < div className=" mt-4 items-center h-10 mr-2 border-2 border-amber-400" />
                            <span className='font-font font-bold text-darkBlue' onClick={handleOffer} > Offer</span>
                        </div>
                    </div>
                }

            </div>
            {showOffer &&
                <div className='flex flex-col px-8'>
                    <div className='flex flex-col '>
                        <div className='absolute right-5 pt-5' onClick={HideModal}><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                            <g id="Groupe_710" data-name="Groupe 710" transform="translate(-1274.883 -634.978)">
                                <circle id="Ellipse_64" data-name="Ellipse 64" cx="13.5" cy="13.5" r="13.5" transform="translate(1274.883 634.978)" fill="#189ab4" />
                                <g id="x" transform="translate(1284.351 644.446)">
                                    <line id="Ligne_26" data-name="Ligne 26" x1="8" y2="8" transform="translate(-0.469 -0.469)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
                                    <line id="Ligne_27" data-name="Ligne 27" x2="8" y2="8" transform="translate(-0.469 -0.469)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
                                </g>
                            </g>
                        </svg></div>
                        <Card className=' mt-12 shadow-none bg-transparent' >
                            <div className="flex flex-col">
                                <div className="flex pl-[10px]">
                                    <div className="symbol symbol-52px ml-8">
                                        <img src={`${jobOffer.company.logo}`} alt="" className="w-16 h-16 rounded-full p-2 object-cover shadow-lg" />
                                    </div>
                                    <div className="flex flex-col items-start px-[3%] w-full">
                                        <div><span style={{ color: '#d1d8db', fontFamily: 'Segoe UI', fontWeight: '400' }}>{jobOffer.company.name}</span></div>
                                        <div><span style={{ fontSize: '20px', color: '#05445E', fontFamily: 'Segoe UI', fontWeight: '700' }}>{jobOffer.position}</span></div>
                                        <div className="flex items-center justify-between font-font text-darkBlue opacity-[60%] w-[70%]">
                                            <span className="mr-[2%]">Fully Remote</span>
                                            <span>{jobOffer.location}</span>
                                            <span>
                                                {(() => {
                                                    const startDate = new Date(jobOffer.createdAt);
                                                    const currentDate = new Date();
                                                    const differenceInMilliseconds = currentDate.getTime() - startDate.getTime();
                                                    const differenceInDays = Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));

                                                    let startDateText;
                                                    if (differenceInDays >= 7) {
                                                        const differenceInWeeks = Math.floor(differenceInDays / 7);
                                                        startDateText = `${differenceInWeeks} week${differenceInWeeks > 1 ? 's' : ''} ago`;
                                                    } else if (differenceInDays < 1) {
                                                        const differenceInHours = Math.floor(differenceInMilliseconds / (60 * 60 * 1000));
                                                        startDateText = `${differenceInHours} hour${differenceInHours > 1 ? 's' : ''} ago`;
                                                    } else {
                                                        startDateText = `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`;
                                                    }

                                                    return startDateText;
                                                })()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='flex w-full mt-6 items-center justify-between mr-10 '>
                        <Card className='bg-lightBlue flex flex-col pb-6'>

                            <div className='flex mt-6 self-center'>
                                <h1 className="ml-3 text-2xl font-font font-semibold text-amber-400">Job Description</h1>
                            </div>

                            <div className='flex center-items mt-4'>
                                <div className="mt-4  w-24 h-0.5 border-2 border-amber-400" />
                                <p className="ml-3 text-xl font-font font-bold text-sky-900">Who are they?</p>
                            </div>
                            <p className="ml-24 px-3 py-3 text-sky-900"> {jobOffer.company.description} </p>


                            <div className='flex center-items mt-6'>
                                <div className=" mt-4  w-24 h-0.5 border-2 border-amber-400" />
                                <p className="ml-3 text-xl font-font font-bold text-sky-900">Job Description</p>
                            </div>
                            <p className="ml-24 px-3 py-3 text-sky-900"> {jobOffer.description} </p>

                            <div className='flex center-items mt-6'>
                                <div className="mt-4  w-24 h-0.5 border-2 border-amber-400" />
                                <p className="ml-3 text-xl font-font font-bold text-sky-900">Required Profile </p>
                            </div>
                            {jobOffer.requirements.map((requirmet: any) => (
                                <div className="relative flex items-center">
                                    <div className=" w-3 h-3 absolute bg-amber-400 border rounded-full mt-6 ml-[26%]" />
                                    <div className="  text-sky-900 ml-[30%] mt-[18px] font-semibold " > {requirmet} </div>
                                </div>
                            ))}
                            <div className='flex center-items mt-6'>
                                <div className="mt-4  w-24 h-0.5 border-2 border-amber-400" />
                                <p className="ml-3 text-xl font-font font-bold text-sky-900">Skills </p>
                            </div>
                            <div className="flex justify-between self-center h-40 w-[58%]">
                                <div className="flex flex-col ">
                                    {jobOffer.skills.map((skill: any) => (
                                        <div className="relative flex flex-col ">
                                            <div className="w-3 h-3 absolute bg-amber-400 border rounded-full mt-6 ml-[24%]" />
                                            <div className="text-sky-900 ml-[38%] w-full mt-[18px] font-semibold">{skill}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col ">
                                    {jobOffer.bonusSkills.map((skill: any) => (
                                        <div className="relative flex flex-col ">
                                            <div className="w-3 h-3 absolute bg-amber-400 border rounded-full mt-6 ml-[26%]" />
                                            <div className="text-sky-900 ml-[47%] w-full mt-[18px] font-semibold">{skill}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='flex center-items mt-6'>
                                <div className="mt-4  w-24 h-0.5 border-2 border-amber-400" />
                                <p className="ml-3 w-full text-xl font-font font-bold text-sky-900">Required Process </p>
                            </div>
                            <p className="  text-sky-900 ml-[26%] mt-[18px] font-semibold " > - {jobOffer.recruitmentProcess} </p>
                        </Card>
                    </div>
                    <Card className='flex flex-col items-center pt-6 h-56 shadow-md mt-4 '>
                        <div className="symbol symbol-52px">
                            <img src={`${jobOffer.company.logo}`} alt="" className="w-20 h-20 rounded-full p-2 object-cover shadow-lg" />
                        </div>
                        <div ><p className=" text-[18px] font-font pt-4 text-sky-900">Does this offer appeal to you?</p></div>
                        <button
                            onClick={handleApllication}
                            type='submit'
                            id='kt_sign_in_submit'
                            className='h-[40px] w-[130px] rounded-[6px] border-[1px] mt-4 border-[solid] bg-yellow font-bold text-darkBlue'
                        >
                            <span className='indicator-label' >Apply Now  </span>
                        </button>
                    </Card>
                </div>}

            {showApplication === true && showOffer === false &&
                <div className='flex flex-col w-full '>
                    <div className='flex flex-col '>
                        <div className='absolute right-5 pt-5' onClick={HideModal}><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                            <g id="Groupe_710" data-name="Groupe 710" transform="translate(-1274.883 -634.978)">
                                <circle id="Ellipse_64" data-name="Ellipse 64" cx="13.5" cy="13.5" r="13.5" transform="translate(1274.883 634.978)" fill="#189ab4" />
                                <g id="x" transform="translate(1284.351 644.446)">
                                    <line id="Ligne_26" data-name="Ligne 26" x1="8" y2="8" transform="translate(-0.469 -0.469)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
                                    <line id="Ligne_27" data-name="Ligne 27" x2="8" y2="8" transform="translate(-0.469 -0.469)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
                                </g>
                            </g>
                        </svg></div>
                        <Card className=' mx-6 mt-14 mb-6 shadow-none w-[680px] bg-gray-100' >
                            <form
                                onSubmit={formik.handleSubmit}
                                noValidate
                            >
                                <div className='flex mt-6 self-start'>
                                    <p className="ml-3 text-xl font-font font-bold text-sky-900">Personnal informations</p>
                                </div>

                                <div className='pl-8'>
                                    <p className='text-gray-400 mt-4'>Profile Picture</p>
                                    <div className='h-24 w-24 shadow-md mt-2 relative'>
                                        <div className="flex h-5 w-5 absolute shadow-lg right-1 items-center justify-center rounded-full bg-white">
                                            <img
                                                src={toAbsoluteUrl('/assets/icons/edit.svg')}
                                                alt=""
                                                className="h-3 w-3 fill-current "
                                            />
                                        </div>
                                        <img src={toAbsoluteUrl("assets/icons/300-12.jpg")} alt="" />
                                    </div>
                                </div>
                                <div className='flex flex-col w-full mb-6'>
                                    <div className='flex justify-between mx-8'>
                                        <div style={{ width: "300px" }} className='flex flex-col items-start '>
                                            <p className='text-gray-400 mt-4'>First Name</p>
                                            <input
                                                style={{ width: '300px' }}
                                                type='text'
                                                className='relative mt-[10px] shadow-md box-border flex h-[40px] items-center justify-center rounded-[6px] pl-5 pb-[0.4em] font-[1.15rem] placeholder:font-font placeholder:tracking-[1px] placeholder:text-gray-400 focus:border-[solid] focus:border-[#4eb8dd] focus:bg-[#edf8fc] focus:shadow-[0px_2px_10px_rgba(0,0,0,0.1)] focus:outline-none'
                                                id='firstName'
                                                name='firstName'
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div style={{ width: "300px" }} className='flex flex-col items-start'>
                                            <p className='text-gray-400 mt-4 '>Last Name</p>
                                            <input
                                                style={{ width: '300px' }}
                                                type='text'
                                                className='relative mt-[10px] shadow-md box-border flex h-[40px] items-center justify-center rounded-[6px] pl-5 pb-[0.4em] font-[1.15rem] placeholder:font-font placeholder:tracking-[1px] placeholder:text-gray-400 focus:border-[solid] focus:border-[#4eb8dd] focus:bg-[#edf8fc] focus:shadow-[0px_2px_10px_rgba(0,0,0,0.1)] focus:outline-none'
                                                id='lastName'
                                                name='lastName'
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between px-8'>
                                        <div style={{ width: "300px" }} className='flex flex-col items-start'>
                                            <p className='text-gray-400 mt-4'>Email</p>
                                            <input
                                                style={{ width: '300px' }}
                                                type='email'
                                                className='relative mt-[10px] shadow-md box-border flex h-[40px] items-center justify-center rounded-[6px] pl-5 pb-[0.4em] font-[1.15rem] placeholder:font-font placeholder:tracking-[1px] placeholder:text-gray-400 focus:border-[solid] focus:border-[#4eb8dd] focus:bg-[#edf8fc] focus:shadow-[0px_2px_10px_rgba(0,0,0,0.1)] focus:outline-none'
                                                id='email'
                                                name='email'
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div style={{ width: "300px" }} className='flex flex-col items-start'>
                                            <p className='text-gray-400 mt-4 '>Phone Number</p>
                                            <input
                                                style={{ width: '300px' }}
                                                type='text'
                                                className='relative mt-[10px] shadow-md box-border flex h-[40px] items-center justify-center rounded-[6px] pl-5 pb-[0.4em] font-[1.15rem] placeholder:font-font placeholder:tracking-[1px] placeholder:text-gray-400 focus:border-[solid] focus:border-[#4eb8dd] focus:bg-[#edf8fc] focus:shadow-[0px_2px_10px_rgba(0,0,0,0.1)] focus:outline-none'
                                                id='phone'
                                                name='phone'

                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-between px-8'>
                                        <p className='text-gray-400 mt-4 '>Adress</p>
                                        <input
                                            style={{ width: '300px' }}
                                            type='text'
                                            className='relative mt-[10px] shadow-md box-border flex h-[40px] items-center justify-center rounded-[6px] pl-5 pb-[0.4em] font-[1.15rem] placeholder:font-font placeholder:tracking-[1px] placeholder:text-gray-400 focus:border-[solid] focus:border-[#4eb8dd] focus:bg-[#edf8fc] focus:shadow-[0px_2px_10px_rgba(0,0,0,0.1)] focus:outline-none'
                                            id='adress'
                                            name='address'
                                            required
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between px-8">
                                        <p className="text-gray-400 mt-4">CV</p>
                                        <div className="relative flex mx-[5%] py-2 items-center w-fit justify-center flex-1 h-[45px] px-6 border rounded-lg border-[#189ab4]">
                                            <label htmlFor="resume" className="flex items-center cursor-pointer">
                                                <img src={toAbsoluteUrl('assets/icons/download.svg')} alt="upload" className="" />
                                                <span className="text-base px-2 font-font font-[700] text-[#189ab4]">Upload</span>
                                            </label>
                                            <input
                                                type="file"
                                                id="resume"
                                                name="resume"
                                                accept=".pdf,.doc,.docx"
                                                className="absolute w-0 h-0 opacity-0"
                                                onChange={(event) => {
                                                    formik.setFieldValue('resume', event.target.files && event.target.files[0]);
                                                    handleFileChange(event);
                                                }}
                                            />
                                        </div>
                                        {selectedFile && (
                                            <div className="flex items-center mt-2">
                                                <img src={toAbsoluteUrl('/assets/icons/doc.png')} className="h-10 w-8" alt="" />
                                                <span className="ml-2">{selectedFile.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className='flex flex-col justify-between px-8'>
                                        <p className='text-gray-400 mt-4'>Cover Letter</p>
                                        <textarea
                                            className='relative mt-[10px] pt-4 overflow-hidden box-border flex shadow-md items-center justify-center rounded-[6px] pl-5 pb-[0.4em] font-[1.15rem] placeholder:font-font placeholder:tracking-[1px] placeholder:text-gray-400 focus:border-[solid] focus:border-[#4eb8dd] focus:bg-[#edf8fc] focus:shadow-[0px_2px_10px_rgba(0,0,0,0.1)] focus:outline-none'
                                            id="coverLetter"
                                            name="coverLetter"
                                            rows={6}
                                            cols={70}
                                            required
                                            value={formik.values.coverLetter}
                                            onChange={formik.handleChange}
                                        />
                                    </div>

                                    <button
                                        type='submit'
                                        id='kt_sign_in_submit'
                                        className='h-[40px] w-[130px] self-center rounded-[6px] border-[1px] mt-4 border-[solid] bg-yellow font-bold text-darkBlue'
                                    >
                                        <span className='indicator-label' >Apply Now</span>
                                    </button>
                                </div>
                            </form>
                        </Card>

                    </div>
                </div>
            }
        </div>
    )
}