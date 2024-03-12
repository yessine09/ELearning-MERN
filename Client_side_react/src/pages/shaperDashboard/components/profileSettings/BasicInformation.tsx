import { useEffect, useState } from 'react'
import ExperienceInput from './professionalInfo/experience/experienceInput'
import { getProfileInfoById } from '../../../../api/crudServices'
import { useAuth } from '../../../../contexts/Auth'
import PersonalInfo from './personalnfo/PersonalInfo'
import TrainingInput from './professionalInfo/training/TrainingInput'
import { toAbsoluteUrl } from '../../../../helpers/AssetHelpers'
import SoftSkillsSection from './professionalInfo/softSkills/SoftSkillsSection'

interface IProfessionalExperience {
  _id: string
  job: string
  local: string
  company: string
  period: string
}
export interface ISkillset {
  skill: string
  level: string
  isSoftSkill: boolean
}

export interface ILinks {
  title: string
  url: string
}

export interface ISoftSkill {
  skill: string
}

export interface IAcademicTraining {
  local: string
  specialty: string
  degree: string
  startDate: Date
  endDate: Date
  establishment: string
}

interface ProfessionalExperience {
  professional_experience: {
    data: IProfessionalExperience[]
  }
}

interface AcademicTraining {
  studies: {
    data: IAcademicTraining[]
  }
}

interface SoftSkills {
  softskills: {
    data: ISoftSkill[]
  }
}

interface UserProfileData {
  professional_experience: {
    data: IProfessionalExperience[]
  }
  studies: {
    data: IAcademicTraining[]
  }
  skillsets: {
    data: ISkillset[]
  }
  softskills: {
    data: ISoftSkill[]
  }
}

export default function BasicInformation() {
  const { authStatus } = useAuth()
  // const [skillsets, setSkillsets] = useState<ISkillset[]>([]);
  const [softskills, setSoftskills] = useState<SoftSkills>({
    softskills: {
      data: [],
    },
  })
  let clientId = ''
  if (authStatus.status === 'loggedIn') {
    clientId = authStatus.userId
  }
  const [client, setClient] = useState<ProfessionalExperience>({
    professional_experience: { data: [] },
  })
  const [Acdstudies, setAcdStudies] = useState<AcademicTraining>({
    studies: { data: [] },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfileInfoById(clientId)
        const userProfileData: UserProfileData = data.data.client
        const professionalExperience = userProfileData.professional_experience?.data ?? []
        const academicTraining = userProfileData.studies?.data ?? []
        const skillsets = userProfileData.skillsets?.data ?? []
        const softskills = userProfileData.softskills?.data ?? []
        console.log(academicTraining, skillsets, softskills)
        console.log(professionalExperience)
        setClient({ professional_experience: { data: professionalExperience } })
        setAcdStudies({ studies: { data: academicTraining } })
        setSoftskills({ softskills: { data: softskills } })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="mt-[2%] rounded-xl">
      <PersonalInfo />

      <div className="mt-10 flex h-[200vh] flex-col rounded-xl bg-white py-8 px-[10%] shadow-lg">
        <div className="flex h-[50vh] flex-col rounded-xl bg-white py-8 px-[10%] shadow-lg">
          <div className="w-fit font-font text-[20px] font-[700] text-darkBlue">
            Professional Information
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div>
            <div className="flex items-center justify-between">
              <div className="w-fit font-font text-[20px] font-[700] text-darkBlue">
                Description{' '}
              </div>
              <div>
                <img
                  src={toAbsoluteUrl('/assets/icons/plus.png')}
                  alt="+icon"
                  style={{ height: '20px', width: '20px' }}
                />
              </div>
            </div>
            <div className="mt-4">
              {client.professional_experience &&
                client.professional_experience.data.length > 0 &&
                client.professional_experience.data.map((experience, index) => (
                  <ExperienceInput
                    job={experience.job}
                    company={experience.company}
                    Local={experience.local}
                    period={experience.period}
                    index={index}
                    key={index}
                  />
                ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div className="w-fit font-font text-[20px] font-[700] text-darkBlue">
                Professional Experience
              </div>
              <div>
                <img
                  src={toAbsoluteUrl('/assets/icons/plus.png')}
                  alt="+icon"
                  style={{ height: '20px', width: '20px' }}
                />
              </div>
            </div>
            <div className="mt-4">
              {client.professional_experience &&
                client.professional_experience.data.length > 0 &&
                client.professional_experience.data.map((experience, index) => (
                  <ExperienceInput
                    job={experience.job}
                    company={experience.company}
                    Local={experience.local}
                    period={experience.period}
                    index={index}
                    key={index}
                  />
                ))}
            </div>
          </div>
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div className="mt-6 w-fit font-font text-[20px] font-[700] text-darkBlue">
                Academic Training
              </div>
              <div>
                <img
                  src={toAbsoluteUrl('/assets/icons/plus.png')}
                  alt="+icon"
                  style={{ height: '20px', width: '20px' }}
                />
              </div>
            </div>
            <div className="mt-4">
              {Acdstudies.studies &&
                Acdstudies.studies.data.length > 0 &&
                Acdstudies.studies.data.map((training, index) => (
                  <TrainingInput
                    establishment={training.establishment}
                    local={training.local}
                    specialty={training.specialty}
                    degree={training.degree}
                    startDate={training.startDate}
                    endDate={training.endDate}
                    index={index}
                    key={index}
                  />
                ))}
            </div>
          </div>

          {/* <div className='mt-4'>
                    {softskills.softskills && softskills.softskills.data.length > 0 &&
                        <SoftSkillsSection softSkills={softskills} setSoftSkills={setSoftskills} />
                    }
                </div> */}
        </div>
      </div>
    </div>
  )
}
