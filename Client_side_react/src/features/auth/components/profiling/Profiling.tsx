import { CustomContext, CustomData } from './contexts/CustomContext'
import SaveCustomButton from './custom/SaveCustomButton'
import {
  ExperienceSection,
  SkillSection,
  ProfilingVerticalStepper,
  SoftSkillsSection,
  TrainingSection,
} from './index'
import { useMutation } from 'react-query'
import { profiling } from '../../../../api/profiling'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { toAbsoluteUrl } from '../../../../helpers/AssetHelpers'
import CancelButton from './custom/CancelButton'

import { useAuth } from './../../../../contexts/Auth'

export default function Profiling(programId: any) {
  const { authStatus } = useAuth()
  let clientId = ''
  if (authStatus.status === 'loggedIn') {
    clientId = authStatus.userId
  }
  console.log('clientId', clientId)
  const [customData, setCustomData] = useState<CustomData>({
    clientId: clientId,
    softSkills: { data: [{ skill: '' }] },
    skillsets: { data: [{ skill: '', level: 'Beginner', isSoftSkill: true }] },
    links: { data: [{ title: '', url: '' }] },
    studies: {
      data: [
        {
          local: '',
          specialty: '',
          degree: '',
          startDate: new Date(),
          endDate: new Date(),
          establishment: '',
          student: false,
        },
      ],
    },
    professional_experience: {
      data: [{ period: '', company: '', job: '', local: '' }],
    },
  })

  type CustomContextType = {
    customData: CustomData
    setCustomData: React.Dispatch<React.SetStateAction<CustomData>>
  }

  const navigate = useNavigate()
  const { mutate } = useMutation(profiling, {
    onSuccess: (data) => {
      if (data.status === 'profile not created') {
        toast.error(data.msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        return
      }
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
      })
      navigate('/profile')
    },
    onError: (error) => {
      console.error(error)
      toast.error('Failed to register user.', {
        position: 'top-right',
        theme: 'colored',
        style: { backgroundColor: '#D40776', color: 'white' },
      })
    },
  })
  const saveCustomData = async () => {
    console.log(customData)
    mutate(customData)
  }
  const cancel = () => {
    navigate('/profile')
  }
  return (
    <div
      className="flex h-[200vh] justify-between bg-cover bg-repeat-y"
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/assets/images/bg/background.png')})`,
      }}
    >
      <ProfilingVerticalStepper />
      <div
        className="absolute left-[53%] top-[6%] flex h-[185vh] w-[45%] flex-col items-center rounded-md font-font text-darkBlue shadow-3XL transition duration-300 hover:shadow-xl"
        style={{ backgroundColor: 'white' }}
      >
        <CustomContext.Provider value={{ customData, setCustomData }}>
          <ExperienceSection />
          <TrainingSection />
          <SoftSkillsSection />
          <SkillSection />
          <div className="flex items-center justify-between">
            <SaveCustomButton title="Start Your Career" onClick={saveCustomData} />
            <CancelButton title="Cancel" onClick={cancel} />
          </div>
        </CustomContext.Provider>
      </div>
    </div>
  )
}
