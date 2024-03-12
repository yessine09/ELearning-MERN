import React, { useEffect, useState } from 'react'
import { toAbsoluteUrl } from '../../../../helpers/AssetHelpers'
import { getLessonById } from '../../../../api/enrollment'
import ReactPlayer from 'react-player'
import { getTasksByLesson } from '../../../../api/tasks'
import { Link, useParams } from 'react-router-dom'
import { downloadCourseAttachment } from '../../../../api/uploadServices'
import instance from '../../../../utils/axios'

interface Props {
  lessonId: string
}

export default function Lesson(props: Props) {
  const { courseId } = useParams()
  const [lessons, setLessons] = useState({})
  const [taskCount, setTaskCount] = useState<number>(0)

  useEffect(() => {
    // fetch data with default week
    const fetchShaperData = async () => {
      const lesson = await getLessonById(props.lessonId)
      setLessons(lesson)

      const lessonsTasks = await getTasksByLesson(props.lessonId)
      setTaskCount(lessonsTasks.length)
    }
    fetchShaperData()
    console.log(lessons)
  }, [props.lessonId])
  useEffect(() => {
    const fileKey = 'your_file_key_here'; // Replace with the actual file key

    const downloadCourseAttachment = async (fileKey: string) => {
      try {
        // Perform the file download logic here
        // ...

        // Example logic for downloading a file
        const response = await instance.get(`program/list/lessons/download/${fileKey}`, {
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileKey);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Handle success or any additional logic
      } catch (error) {
        // Handle error or display an error message
      }
    };

    downloadCourseAttachment(fileKey);
  }, []);

  return (
    <div className="ml-[3%] flex-1">
      <h1
        className="font-segoe-ui  mt-[4.5%] text-lg font-[700]"
        style={{ color: '#05445E', fontSize: '150%', fontWeight: '500' }}
      >
        {' '}
        Welcome To This Course{' '}
      </h1>
      <div className=" mt-8 rounded-xl">
        <ReactPlayer url={lessons.video} width="800px" height="400px" controls />
      </div>
      <img className="mt-4 ml-8" src={toAbsoluteUrl('assets/icons/cours1.svg')} />
      <div>
        <div className="mt-14  ">
          <h1
            className=" text-lg  "
            style={{ color: '#FFCC29', fontWeight: '500', fontSize: '125%' }}
          >
            {' '}
            What You Will Learn
          </h1>
          <p
            className=" mr-54 mt-6 leading-loose text-sky-900"
            style={{ width: '78%', wordWrap: 'break-word' }}
          >
            Bio : {lessons.description}
          </p>
        </div>
        <div className="mt-8">
          <p
            className=" text-lg  "
            style={{ color: '#FFCC29', fontWeight: '500', fontSize: '125%' }}
          >
            {' '}
            Lesson Challenge{' '}
          </p>
          <p
            className=" mr-54 leading-loose text-sky-900 "
            style={{ width: '78%', wordWrap: 'break-word' }}
          >
            {' '}
            {lessons.content}
          </p>
          <p
            className=" mt-4 leading-loose  text-sky-900"
            style={{ fontWeight: '500', width: '78%', wordWrap: 'break-word' }}
          >
            These tasks are the key to unlocking your full potential and gaining the knowledge and
            skills you need to succeed.
          </p>
          <p className=" mt-4 leading-loose  text-cyan-600" style={{ fontWeight: 'bold' }}>
            Be sure to complete them in order to get the most out of your learning experience
          </p>
          <Link
            to={`/project/${courseId}`}
            type="submit"
            id="kt_sign_in_submit"
            style={{
              marginLeft: '30%',
              paddingLeft: '3%',
              paddingTop: '1%',
              border: '1px solid #FFCC29',
              borderRadius: '5px',
              width: '17%',
              height: '40px',
              fontFamily: 'Segoe UI',
              fontWeight: 'bold',
              backgroundColor: '#FFCC29',
              color: '#05445E',
              marginTop: '50px',
            }}
          >
            <span className="indicator-label">View Tasks </span>
          </Link>
          <div className="mt-10 w-[600px]">
            {lessons.attachments && (
              <h1
                className=" text-lg leading-loose "
                style={{ color: '#FFCC29', fontWeight: '500', fontSize: '155%' }}
              >
                {' '}
                Course Folders{' '}
              </h1>
            )}
            <div className="flex items-center  justify-between  ">
              {lessons.attachments &&
                lessons.attachments.map((attachment: any) => (
                  <div
                    className=" mt-7 flex flex-col items-center rounded-3xl border bg-white shadow"
                    style={{ width: '130px', height: '160px' }}
                  >
                    <img src={toAbsoluteUrl('assets/icons/OpenFolder.svg')} className="mt-4" />
                    <p className="  text-blue-900" style={{ fontWeight: '500' }}>
                      {' '}
                      { }{' '}
                    </p>
                    <span className=" font-segoe-ui text-gray-500" style={{ fontSize: '10px' }}>
                      {new Date(attachment.updatedAt).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'long',
                      })}
                      <span
                        className=" font-segoe-ui ml-2 text-gray-500"
                        style={{ fontSize: '10px' }}
                      >
                        {new Date(attachment.updatedAt).toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </span>
                    </span>
                    <div className=" mt-4 w-24 border-b border-gray-300"></div>

                    <div className="flex items-center justify-between">
                      {/* <img
                        src={toAbsoluteUrl('assets/icons/CoursTelecherge.svg')}
                        onClick={() => downloadCourseAttachment(attachment.fileKey)}
                        className="mx-2"
                      />{' '} */}
                      {/* <img src={toAbsoluteUrl('assets/icons/CoursSupprime.svg')} className='mx-2' /> */}
                      <img src={toAbsoluteUrl('assets/icons/CoursSave.svg')} className="mx-2" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <h1
            className=" mt-20  text-lg leading-loose text-cyan-600"
            style={{ fontWeight: '500', fontSize: '125%' }}
          >
            {' '}
            References{' '}
          </h1>
          {lessons.references &&
            lessons.references.map((reference: any) => (
              <p className="leading-loose text-sky-900">{reference}</p>
            ))}
        </div>
      </div>
    </div>
  )
}
