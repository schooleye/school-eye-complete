import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../context/appContext';
import Input from '../components/Input';
import NavBar from '../components/NavBar';
import BarChart from '../components/BarChart';
import PieChart from '../components/Pie';
import topics from '../assets/layup';
import { useNavigate, Navigate } from 'react-router-dom';
import TopBtn from '../components/TopBtn';
function Dashboard() {
  const navigate = useNavigate();
  const SubjectDOM1 = useRef(); 
  const SubjectDOM2 = useRef();
  const SubjectDOM3 = useRef();
  const linkNavigate = (e) => {
    e.preventDefault();
    const mathOffset = SubjectDOM1.current.offsetTop;
    const physicsOffset = SubjectDOM2.current.offsetTop;
    const chemistryOffset = SubjectDOM3.current.offsetTop;
    const targetSubject = e.target.textContent;
    // console.log(SubjectDOM1.);

    if (targetSubject === 'math') {
      window.scrollTo({
        top: mathOffset,
        left: 0,
        behavior: 'smooth',
      });
    }
    if (targetSubject === 'physics') {
      window.scrollTo({
        top: physicsOffset,
        left: 0,
        behavior: 'smooth',
      });
    }
    if (targetSubject === 'chemistry') {
      window.scrollTo({
        top: chemistryOffset,
        left: 0,
        behavior: 'smooth',
      });
    }
  };
  const {
    isLoading,
    showAlert,
    // fetchJobs,
    // createJob,
    getLocalStorage,
    setLocalStorage,
    user,
    subjects,
    updateTopicCoverage,
  } = useGlobalContext();
  const [math, physics, chemistry] = subjects;
  const mathTopics = math.topics;
  const physicsTopics = physics.topics;
  const chemistryTopics = chemistry.topics;
  // coverage per topic
  const mathCoverage = [...mathTopics[0].map((topic) => topic.topicCoverage)];
  const physicsCoverage = [
    ...physicsTopics[0].map((topic) => topic.topicCoverage),
  ];
  const chemistryCoverage = [
    ...chemistryTopics[0].map((topic) => topic.topicCoverage),
  ];
  // 3 arrays of subject coverage per topic also in number formate
  // console.log(mathCoverage, physicsCoverage, chemistryCoverage);
  const findAverage = (arr) => {
    const avg = arr.reduce((sum, curr) => sum + Number(curr), 0) / arr.length;
    return avg;
  };
  const findAmount = (arr, target) => {
    const targetArr = [...arr.filter((coverage) => coverage <= target)];
    return targetArr.length;
  };
  //amount of topics cleared
  const mathRed = findAmount(mathCoverage, 0);
  const mathBlue = findAmount(mathCoverage, 25);
  const mathOrange = findAmount(mathCoverage, 75);
  const mathGreen = findAmount(mathCoverage, 100);
  const mathDataSetData = [mathRed, mathBlue, mathOrange, mathGreen];
  // console.log(mathDataSetData);
  // physics
  const physicsRed = findAmount(physicsCoverage, 0);
  const physicsBlue = findAmount(physicsCoverage, 25);
  const physicsOrange = findAmount(physicsCoverage, 75);
  const physicsGreen = findAmount(physicsCoverage, 100);
  const physicsDataSetData = [
    physicsRed,
    physicsBlue,
    physicsOrange,
    physicsGreen,
  ];

  // chemistry
  const chemistryRed = findAmount(chemistryCoverage, 0);
  const chemistryBlue = findAmount(chemistryCoverage, 25);
  const chemistryOrange = findAmount(chemistryCoverage, 75);
  const chemistryGreen = findAmount(chemistryCoverage, 100);
  const chemistryDataSetData = [
    chemistryRed,
    chemistryBlue,
    chemistryOrange,
    chemistryGreen,
  ];

  // average coverage per subject
  const mathAverageCoverage = findAverage(mathCoverage);
  const physicsAverageCoverage = findAverage(physicsCoverage);
  const chemistryAverageCoverage = findAverage(chemistryCoverage);

  const handleSubmit = (e) => {
    e.preventDefault();
   const localStorage = getLocalStorage('localStorage')
   const institution = user.institution
   console.log(localStorage);
   try {
     const targetSchool = localStorage.find((school)=> school.institution === institution)
     let newSchoolCoverage = ''
     if(targetSchool){

        newSchoolCoverage = [...localStorage.map((school)=>{
         if (school.institution === institution) {
           return {
             institution,subjects
           }
           
         }
         return school
       })]
     }else{
newSchoolCoverage = [...localStorage,{institution,subjects}]
     }
    setLocalStorage('localStorage',newSchoolCoverage)
    const submitCoverage = setTimeout(()=>{
      window.location.reload()
      return clearTimeout(submitCoverage)

    },500)
  } catch (error) {
    console.log(error);
  }
  };
  const redirect = (user) => {
    if (user.institution === 'MOES') {
      // return navigate('/super');
      return <Navigate to='/super' replace />;
    }
  };
  // FORM INPUT SUBJECT COVERAGE
  const getSubjectTopics = (arr) => {
    return arr.map((topic) => topic.title);
  };

  const mathSingleTopics = getSubjectTopics(mathTopics[0]);
  const physicsSingleTopics = getSubjectTopics(physicsTopics[0]);
  const chemistrySingleTopics = getSubjectTopics(chemistryTopics[0]);
  const allSchoolTopics = [
    ...mathSingleTopics,
    ...physicsSingleTopics,
    ...chemistrySingleTopics,
  ];
  const currentStateValues = [
    ...allSchoolTopics.map((topic) => {
      return { name: topic, coverage: 0 };
    }),
  ];
  const [values, setValues] = useState(currentStateValues);

  const handleRadioChange = (e) => {
    const updatedTopics = [
      ...values.map((value) => {
        if (value.name === e.target.name) {
          return { ...value, coverage: parseInt(e.target.value) };
        } else {
          return value;
        }
      }),
    ];
    const arrToUpdate = [
      ...mathTopics[0],
      ...physicsTopics[0],
      ...chemistryTopics[0],
    ];
    const mathLength = mathTopics[0].length;
    const physicsLength = physicsTopics[0].length;
    const chemistryLength = chemistryTopics[0].length;
    const lengths = { mathLength, physicsLength, chemistryLength };
    updateTopicCoverage(updatedTopics, arrToUpdate, lengths);
    setValues((state) => {
      return [...updatedTopics];
    });
  };
  const displayAverageColor = (number) => {
    if (number <= 25) {
      return '#8b0000';
    } else if (number <= 50) {
      return '#00008b';
    } else if (number <= 75) {
      return '#ff8c00';
    } else {
      return '#00ff00';
    }
  };
  const displayAmountOfAverageCoverage = (number, subject) => {
    if (number <= 25 && subject === 'math') {
      return mathRed;
    } else if (number <= 50 && subject === 'math') {
      return mathBlue;
    } else if (number <= 75 && subject === 'math') {
      return mathOrange;
    } else if (number <= 100 && subject === 'math') {
      return mathGreen;
    } else if (number <= 25 && subject === 'physics') {
      return physicsRed;
    } else if (number <= 50 && subject === 'physics') {
      return physicsBlue;
    } else if (number <= 75 && subject === 'physics') {
      return physicsOrange;
    } else if (number <= 100 && subject === 'physics') {
      return physicsGreen;
    } else if (number <= 25 && subject === 'chemistry') {
      return chemistryRed;
    } else if (number <= 50 && subject === 'chemistry') {
      return chemistryBlue;
    } else if (number <= 75 && subject === 'chemistry') {
      return chemistryOrange;
    } else if (number <= 100 && subject === 'chemistry') {
      return chemistryGreen;
    }
  };
  // console.log(handleRadioChange)
  // useEffect(() => {
  //   // authenticateSuperUser()
  //   if (user && user.email === 'permasec@education.go.ug') {
  //     return navigate('/super');
  //     // return <Navigate to='/super' replace />;
  //   }
  // }, []);
  return (
    <>
      {user && redirect(user)}
      <NavBar />

      <div className='center-div'>
        <h3>input form</h3>
      </div>
      <div className='links-container'>
        <a href='#' onClick={linkNavigate}>
          math
        </a>
        <a href='#' onClick={linkNavigate}>
          physics
        </a>
        <a href='#' onClick={linkNavigate}>
          chemistry
        </a>
      </div>
      <Wrapper className='page'>
        {showAlert && (
          <div className='alert alert-danger'>
            there was an error, please try again
          </div>
        )}
        <form className='job-form' onSubmit={handleSubmit}>
          {/* position */}
          <Input
            handleRadioChange={handleRadioChange}
            SubjectDOM={{ SubjectDOM1, SubjectDOM2, SubjectDOM3 }}
          />
          <button type='submit' className='btn' disabled={isLoading}>
            {isLoading ? 'submitting' : 'submit'}
          </button>
        </form>
        <section>
          <article className='chart-container'>
            <div className='single-chart'>
              <PieChart
                pieTitle='Math Coverage'
                chartData={{
                  labels: ['0%', '25%', '75%', '100%'],

                  datasets: [
                    {
                      label: 'math',
                      data: [...mathDataSetData],
                      backgroundColor: [
                        '#8b0000',
                        '#00008b',
                        '#ff8c00',
                        '#00ff00',
                      ],
                      borderWidth: 0,
                    },
                  ],
                }}
              />
            </div>
            <div className='single-chart'>
              <PieChart
                pieTitle='Chemistry Coverage'
                chartData={{
                  labels: ['0%', '25%', '75%', '100%'],

                  datasets: [
                    {
                      label: 'chemistry',
                      data: [...chemistryDataSetData],

                      backgroundColor: [
                        '#8b0000',
                        '#00008b',
                        '#ff8c00',
                        '#00ff00',
                      ],
                      borderWidth: 0,
                    },
                  ],
                }}
              />
            </div>
            <div className='single-chart'>
              <PieChart
                pieTitle='Physics Coverage'
                chartData={{
                  labels: ['0%', '25%', '75%', '100%'],

                  datasets: [
                    {
                      label: 'physics',
                      data: [...physicsDataSetData],

                      backgroundColor: [
                        '#8b0000',
                        '#00008b',
                        '#ff8c00',
                        '#00ff00',
                      ],
                      borderWidth: 0,
                    },
                  ],
                }}
              />
            </div>
          </article>
          <BarChart
            myLabels={{ y: 'Number of topics', x: 'Subjects' }}
            pieTitle='Average Coverage per Subject'
            chartData={{
              labels: ['Mathematics', 'Physics', 'Chemistry'],

              datasets: [
                {
                  label: 'Number of Subjects',
                  data: [
                    displayAmountOfAverageCoverage(mathAverageCoverage, 'math'),
                    displayAmountOfAverageCoverage(
                      physicsAverageCoverage,
                      'physics'
                    ),
                    displayAmountOfAverageCoverage(
                      chemistryAverageCoverage,
                      'chemistry'
                    ),
                  ],

                  backgroundColor: [
                    displayAverageColor(mathAverageCoverage),
                    displayAverageColor(physicsAverageCoverage),
                    displayAverageColor(chemistryAverageCoverage),
                  ],
                  borderWidth: 0,
                },
              ],
            }}
          />
          <div className='legend-container'>
            <ul className='legend'>
              <li className='red'>
                <span>Red</span> 0% - 25
              </li>

              <li className='blue'>
                <span>Blu:</span> 25% - 50%
              </li>

              <li className='orange'>
                <span>Ora:</span> 50% - 75%
              </li>

              <li className='green'>
                <span>Gre:</span> 75% - 100%
              </li>
            </ul>
          </div>
        </section>
        <TopBtn />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  padding: 3rem 0;
  margin-top: -170px;

  .job-form {
    background: var(--white);
    margin-bottom: 3rem;
    border-radius: var(--borderRadius);
    padding: 1.5rem;
    .form-input {
      padding: 0.75rem;
    }

    .form-input:focus {
      outline: 1px solid var(--primary-500);
    }
    .form-row {
      margin-bottom: 0;
    }
    .btn {
      height: 100%;
      padding: 0.75rem;
      margin-top: 0.7rem;
    }
    @media (min-width: 776px) {
      grid-template-columns: 1fr 1fr auto;
      .btn {
        height: 100%;
        padding: 1rem 2rem;
        font-size: 1.2rem;
      }
      column-gap: 2rem;
    }
  }
  .alert {
    max-width: var(--max-width);
    margin-bottom: 1rem;
  }
`;

export default Dashboard;
