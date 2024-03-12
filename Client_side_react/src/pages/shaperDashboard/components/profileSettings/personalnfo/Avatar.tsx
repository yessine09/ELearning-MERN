import { useState, useRef, useEffect } from 'react'
import { toAbsoluteUrl } from '../../../../../helpers/AssetHelpers'
import { downloadAvatar } from '../../../../../api/uploadServices'

interface AvatarInputProps {
  onAvatarChange: (avatar: File) => void
  imageUrl?: string
}

const AvatarInput: React.FC<AvatarInputProps> = ({ onAvatarChange, imageUrl }) => {
  const [avatarUrl, setAvatarUrl] = useState(imageUrl)
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement>(null)
  const [hasAvatar, setHasAvatar] = useState(false)
  useEffect(() => {
    async function fetchAvatar() {
      console.log('Fetching Avatar')
      const url = (await downloadAvatar(imageUrl!)).imageUrl
      console.log('Got the url', url)
      setAvatarUrl(url)
      setHasAvatar(true)
      console.log('Updated state')
    }
    fetchAvatar()
  }, [])
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile)
      setAvatarUrl(imageUrl)
      onAvatarChange(selectedFile)
      setHasAvatar(true)
    }
  }

  const handleRemoveAvatar = () => {
    setAvatarUrl('')
    setHasAvatar(false)
  }

  const calculateIconPosition = () => {
    if (imgRef.current) {
      const imgWidth = imgRef.current.clientWidth
      const imgHeight = imgRef.current.clientHeight
      const iconSize = 30 // set the size of the icon
      const x = imgWidth - iconSize / 2
      const y = imgHeight - iconSize / 2
      setIconPosition({ x, y })
    }
  }

  return (
    <div className="mr-[15%] flex w-[50%] items-center justify-between">
      <div className="relative ml-4 h-[100px] w-[100px] overflow-hidden rounded-full bg-lightBlue object-cover shadow-xl ">
        <div
          className="absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white"
          style={{ bottom: -iconPosition.y, right: -iconPosition.x, zIndex: 5 }}
        >
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white">
            <img
              src={toAbsoluteUrl('/assets/icons/edit.svg')}
              alt=""
              className="h-3 w-3 fill-current "
            />
          </div>
        </div>
        <img
          ref={imgRef}
          src={avatarUrl}
          alt=""
          className="h-[100%] w-[100%] object-cover shadow-xl"
          onLoad={calculateIconPosition}
        />
      </div>
      <div className="ml-8 flex items-center">
        <label className="flex h-[40px] w-[110px] items-center justify-center rounded-[6px] border-[1px] border-[solid] bg-yellow font-bold text-darkBlue  ">
          <img
            src={toAbsoluteUrl('assets/icons/upload.svg')}
            className="mr-2 h-6 w-6 rotate-180 font-bold"
          />
          Upload
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </label>
        <input
          type="submit"
          value="Remove"
          className="ml-2 box-border flex h-[40px] w-[110px] items-center justify-center rounded-[6px] border-[1px] border-inputBorderColor border-[solid] pb-[0.4em] font-[1.15rem] placeholder:font-font placeholder:tracking-[1px] placeholder:text-gray-400 focus:border-[solid] focus:border-[#4eb8dd] focus:bg-[#edf8fc] focus:shadow-[0px_2px_10px_rgba(0,0,0,0.1)] focus:outline-none"
          onClick={handleRemoveAvatar}
        />
      </div>
    </div>
  )
}

export default AvatarInput
