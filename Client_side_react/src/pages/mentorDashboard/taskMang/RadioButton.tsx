import React, { useContext, useEffect, useState } from 'react';
import Week from './Week';
import { useParams } from 'react-router';
import { getusersbyprogram } from '../../../api/mentor';
import { selectShaperContext } from '../tasksManagment/MentorProjectManagment';
import { Program, getprogrambyid } from '../../../api/enrollment';


const RadioButton = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [shapersList, setShapersList] = useState([]);
  const [program, setProgram] = useState<Program | null>();
  const [selectedLesson, setSelectedLesson] = useState<string>("");
  const { selectedShaper, setSelectedShaper } = useContext(selectShaperContext);
  // const [program, setprogram] = useState({});
  const handleOptionChange = (option: any) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };


  const { course } = useParams();
  useEffect(() => {
    const fetchShapers = async () => {
      const shapers = await getusersbyprogram(course);
      const program = await getprogrambyid(course);
      setShapersList(shapers)
      setProgram(program)
    };
    fetchShapers();
    console.log(program)
  }, [course]);

  // const handleShaperClick = async (shaperId: any) => {
  //     setSelectedShaper(shaperId);
  // };
  const handleSelectedLesson = (lessonId: any) => {
    setSelectedLesson(lessonId)
  }


  const option1List = (
    <div className={`flex flex-col items-center pl-[200px] ${selectedOption !== 'option1' && 'hidden'}`}>
      {shapersList.map((shaper: any, index) => (
        <div key={index} style={{ color: selectedOption === 'option1' ? '#05445E' : '#808080', fontWeight: '500', cursor: "pointer" }}>
          {shaper.firstName} {shaper.lastName}
        </div>
      ))}
    </div>
  );
  const option2List = (
    <div className={`list-disc ${selectedOption !== 'option2' && 'hidden'}`}>
      <div className='flex flex-col items-start pl-12 py-2'>
        {program?.weeks.map((week: any, weekIndex: any) => (
          <div key={weekIndex} className='flex items-start'>
            <div className="flex flex-start">
              <span className="font-bold mr-2">Week {weekIndex + 1}</span>
              <div className="flex">
                {week?.lessons.map((lesson: any, lessonIndex: any) => (
                  <div key={lessonIndex} className='flex items-center cursor-pointer' onClick={() => setSelectedLesson(lesson.id)}>
                    <span className="mr-2" >Lesson {lessonIndex + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );




  return (
    <div>
      <div className="flex items-center ">
        <div className="pl-2 mt-4">
          <button
            onClick={() => handleOptionChange('option2')}
            className={`mr-2 py-1 px-4 ${selectedOption === 'option2' ? 'text-blue-500' : 'text-gray-500'} focus:ring-transparent`}
            style={{ fontWeight: '400' }}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                <g id="Ellipse_141" data-name="Ellipse 141" fill="#fff" stroke="#05445e" strokeWidth="1">
                  <circle cx="7.5" cy="7.5" r="7.5" stroke="none" />
                  <circle cx="7.5" cy="7.5" r="7" fill="none" />
                </g>
                {selectedOption === 'option2' && (
                  <circle id="Ellipse_143" data-name="Ellipse 143" cx="7.5" cy="7.5" r="4.5" fill="#ffcc29" />
                )}
              </svg>
              <span className={`ml-2 ${selectedOption === 'option2' ? '#45606a' : 'text-gray-400'}`}>Weeks/Lessons</span>
            </div>
          </button>
        </div>

        <div className="flex items-center mt-4">
          <button
            onClick={() => handleOptionChange('option1')}
            className={`mr-2 py-1 px-4 ${selectedOption === 'option1' ? 'ring-2 ring-yellow-500' : ''
              } focus:ring-transparent`}
            style={{ fontWeight: '400' }}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                <g id="Ellipse_141" data-name="Ellipse 141" fill="#fff" stroke="#05445e" strokeWidth="1">
                  <circle cx="7.5" cy="7.5" r="7.5" stroke="none" />
                  <circle cx="7.5" cy="7.5" r="7" fill="none" />
                </g>
                {selectedOption === 'option1' && (
                  <circle id="Ellipse_143" data-name="Ellipse 143" cx="7.5" cy="7.5" r="4.5" fill="#ffcc29" />
                )}
              </svg>
              <span className={`ml-2 ${selectedOption === 'option1' ? 'text-blue-800' : 'text-gray-400'}`}>Shapers Noun</span>
            </div>
          </button>



        </div>
      </div>

      <div className="flex items-center">
        {(selectedOption === 'option1' || selectedOption === null) && option1List}
        {(selectedOption === 'option2' || selectedOption === null) && option2List}
      </div>
    </div>
  );
};

export default RadioButton;
