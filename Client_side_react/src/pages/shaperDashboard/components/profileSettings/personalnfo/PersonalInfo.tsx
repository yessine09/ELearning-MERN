import { useEffect, useState } from 'react'
import AvatarInput from './Avatar'
import { CustomInput } from '../../../../../features/auth/components/Login'
import { updateBasicInfo } from '../../../../../api/crudServices'
import { getuserInfoById } from '../../../../../api/crudServices'
import { useAuth } from '../../../../../contexts/Auth'
import { downloadAvatar, uploadAvatar } from '../../../../../api/uploadServices'

export default function PersonalInfo() {
  const [loading, setLoading] = useState<boolean>(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [data, setData] = useState()
  const { authStatus } = useAuth()
  let clientId = ''
  if (authStatus.status === 'loggedIn') {
    clientId = authStatus.userId
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getuserInfoById(clientId)
        console.log('We go the data')
        console.log(data.data.client.avatar)
        if (data.data.client.avatar != null) {
          setAvatarUrl(data.data.client.avatar)
        }
        setData(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    setLoading(true)
    fetchUser()
  }, [])

  const handleAvatarChange = (avatar: File) => {
    // handle avatar change here and set the URL
    setLoading(true)
    uploadAvatar({ file: avatar })
      .then((result) => {
        console.log('The result key', result)
        const url = URL.createObjectURL(avatar)
        setAvatarUrl(url)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error ', error)
        setLoading(false)
      })
  }
  type Gender = 'male' | 'female' | 'none'

  const [gender, setGender] = useState<Gender>('none')

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value as Gender)
  }

  // Assuming phone and profession are state variables
  const [phone, setPhone] = useState('')
  const [profession, setProfession] = useState('')

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value)
  }

  const handleProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfession(event.target.value)
  }

  //   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault()
  //     // submit form here
  //     const formData = new FormData()
  //     formData.append('avatar', avatarUrl)
  //     formData.append('gender', gender)
  //     try {
  //       const data = await updateUser(clientId, formData)
  //       console.log('We go the data')
  //       console.log(data)
  //       setData(data.data.user)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    //formData.append('avatar', avatarUrl)
    formData.append('phone', phone)
    formData.append('gender', gender)
    formData.append('profession', profession)

    try {
      setLoading(true)
      const response = await updateBasicInfo({
        phone: phone,
        gender: gender,
        profession: profession,
      })
      console.log('Data updated successfully')
      console.log(response.data)
      setData(response.data.user)
    } catch (error) {
      console.error('Error updating data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-[95vh] rounded-xl bg-white py-8 px-10 shadow-lg">
      <div className="">
        <h3 className="font-font text-[26px] font-[600] text-darkBlue">Basic Informations</h3>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="">
          <h3 className="font-font text-[20px] font-[500] text-darkBlue">Avatar</h3>
        </div>
        <AvatarInput onAvatarChange={handleAvatarChange} imageUrl={avatarUrl} />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="">
          <h3 className="w-[200px] font-font text-[20px] font-[500] text-darkBlue">Full Name</h3>
        </div>
        <CustomInput
          type={'string'}
          className="setting-input opacity-[50%]mx-[50px] w-[500px]"
          value={`${data?.user?.firstName ?? ''} ${data?.user?.lastName ?? ''}`}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="">
          <h3 className="w-[200px] font-font text-[20px] font-[500] text-darkBlue">Email</h3>
        </div>
        <CustomInput
          type={'string'}
          className="setting-input opacity-[50%]mx-[50px] w-[500px] "
          value={data?.user?.email ?? ''}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="">
          <h3 className="w-[200px] font-font text-[20px] font-[500] text-darkBlue">
            Contact Phone
          </h3>
        </div>
        <CustomInput
          type={'string'}
          className="setting-input opacity-[50%]mx-[50px] w-[500px]"
          value={data?.client?.phone ?? ''}
          onChange={handlePhoneChange}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="">
          <h3 className="w-[200px] font-font text-[20px] font-[500] text-darkBlue">Profession</h3>
        </div>
        <CustomInput
          type={'string'}
          className="setting-input opacity-[50%]mx-[50px] w-[500px]"
          value={data?.client?.profession ?? ''}
          onChange={handleProfessionChange}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        {/* <div className="">
          <h3 className="w-[200px] font-font text-[20px] font-[500] text-darkBlue">Address</h3>
        </div> */}
        {/* <div className="flex items-center justify-between">
          <CustomInput
            type={'string'}
            className="relative mt-[20px] mr-[7px] box-border flex min-h-minH w-[270px] items-center justify-center rounded-[6px] border-[1px] border-inputBorderColor border-[solid] pb-[0.4em] font-[1.15rem] opacity-60 placeholder:font-font placeholder:tracking-[1px] placeholder:text-gray-400 focus:border-[solid] focus:border-lightBlue focus:bg-[#edf8fc] focus:shadow-[0px_2px_10px_rgba(0,0,0,0.1)] focus:outline-none"
          />
          <CustomInput
            type={'string'}
            className="focus:outline-nonerelative mt-[20px] ml-[7px] box-border flex min-h-minH w-[270px] items-center justify-center rounded-[6px] border-[1px] border-inputBorderColor border-[solid] pb-[0.4em] font-[1.15rem] opacity-60 placeholder:font-font placeholder:tracking-[1px] placeholder:text-gray-400 focus:border-[solid] focus:border-lightBlue focus:bg-[#edf8fc] focus:shadow-[0px_2px_10px_rgba(0,0,0,0.1)]"
          />
        </div> */}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="">
          <h3 className="w-[200px] font-font text-[20px] font-[500] text-darkBlue">Gender</h3>
        </div>
        <div className="flex w-[69%] flex-row items-center space-x-4">
          <label className="flex cursor-pointer items-center rounded-lg px-4 py-2">
            <input
              type="radio"
              value="male"
              checked={data?.client?.gender === 'male'}
              onChange={handleGenderChange}
              className="hidden"
            />
            <div className={`} relative h-4 w-4 rounded-full border-[1.5px] border-gray-500`}>
              {data?.client?.gender === 'male' && (
                <div className="absolute top-[2px] left-[2px] h-2.5 w-2.5 rounded-full  bg-fancyYellow"></div>
              )}
            </div>
            <span className="px-2 font-font text-[14px] font-[500] text-darkBlue">Male</span>
          </label>
          <label className="flex cursor-pointer items-center rounded-lg">
            <input
              type="radio"
              value="female"
              checked={data?.client?.gender === 'female'}
              onChange={handleGenderChange}
              className="hidden"
            />
            <div className={`} relative h-4 w-4 rounded-full border-[1.5px] border-gray-500`}>
              {data?.client?.gender === 'female' && (
                <div className="absolute top-[2px] left-[2px] h-2.5 w-2.5 rounded-full bg-fancyYellow"></div>
              )}
            </div>
            <span className="px-2 font-font text-[14px] font-[500] text-darkBlue">Female</span>
          </label>
          <label className="flex cursor-pointer items-center rounded-full">
            <input
              type="radio"
              value="none"
              checked={data?.client?.gender === 'none'}
              onChange={handleGenderChange}
              className="hidden"
            />
            <div className={`} relative h-4 w-4 rounded-full border-[1.5px] border-gray-500`}>
              {data?.client?.gender === 'none' && (
                <div className="absolute top-[2px] left-[2px] h-2.5 w-2.5 rounded-full bg-fancyYellow "></div>
              )}
            </div>
            <span className="px-2 font-font text-[14px] font-[500] text-darkBlue">No Gender</span>
          </label>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-end">
        <div className="mt-2 flex items-center justify-between">
          <input
            type="submit"
            value="Discard"
            className="ml-2 box-border flex h-[40px] w-[100px] items-center justify-center rounded-[6px] border-[1px] border-inputBorderColor border-[solid] pb-[0.4em] font-[500] placeholder:font-font placeholder:tracking-[1px] placeholder:text-gray-400 focus:border-[solid] focus:border-[#4eb8dd] focus:bg-[#edf8fc] focus:shadow-[0px_2px_10px_rgba(0,0,0,0.1)] focus:outline-none"
          />
          <input
            type="submit"
            value={'Save Changes'}
            className="ml-4 flex h-[40px] w-[130px] items-center justify-center rounded-[6px] border-[1px] border-[solid] bg-yellow font-[500] text-darkBlue "
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
