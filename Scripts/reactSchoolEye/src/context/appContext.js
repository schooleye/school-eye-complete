import axios from 'axios';
import '../axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Navigate } from 'react-router-dom';
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_ERROR,
  CLEAR_ERROR_MESSAGE,
  SET_FILTERED_SCHOOLS,
  SET_USER,
  UPDATE_SCHOOLS_COVERAGE,
  STOP_LOADING,
  LOAD_SCHOOLS,
  MINISTRY_LOGGED_IN,
  SHOW_CURRENT_COVERAGE
} from './actions';
import reducer from './reducer';
// import Schools from '../assets/sampleSchools';
import topics from '../assets/layup';

const initialState = {
  user: null,
  isLoading: false,
  isMinistry: false,
  filteredSchools: [],
  showAlert: false,
  editItem: null,
  singleJobError: false,
  editComplete: false,
  subjects: topics,
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const regions = ['central', 'western', 'eastern', 'northern'];
  // let Schools = getLocalStorage('schools');

  const [state, dispatch] = useReducer(reducer, initialState);
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };
  const stopLoading = () => {
    dispatch({ type: STOP_LOADING });
  };
  const getLocalStorage = (key) => {
    const storageData = JSON.parse(localStorage.getItem(key));
    return storageData ? storageData : [];
  };
  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const Schools = getLocalStorage('schools');

  const getAllUsers = async () => {
    setLoading();
    try {
      let { data } = await axios.get('/home/schools_api');
      // data = data.filter((school) => school.username !== 'MOES');
      // data = data.filter((school) => school.username !== 'moes');
      // data = data.filter((school) => school.username !== 'eyes');
      // data = data.filter((school) => school.username !== 'eye_admin');
      const schoolsCoverage = [25, 50, 75, 100];
      const updatedData = data.map((school) => {
        const randomNumber = Math.floor(Math.random() * regions.length);
        const randomNumber1 = Math.floor(Math.random() * regions.length);
        const randomNumber2 = Math.floor(Math.random() * regions.length);
        const randomNumber3 = Math.floor(Math.random() * regions.length);
        const newName = school.username.split('_').join(' ');

        return {
          ...school,
          name: newName,
          region: regions[randomNumber],
          coverage: schoolsCoverage[randomNumber],
          math: schoolsCoverage[randomNumber1],
          physics: schoolsCoverage[randomNumber2],
          chemistry: schoolsCoverage[randomNumber3],
        };
      });
      setLocalStorage('schools', updatedData);
      dispatch({ type: LOAD_SCHOOLS, payload: updatedData });
      stopLoading();
    } catch (error) {
      console.log(error);
      stopLoading();
    }
  };
  const displaySchools = (filteredArr) => {
    setLoading();
    dispatch({ type: SET_FILTERED_SCHOOLS, payload: filteredArr });
    stopLoading();
  };
  const updateTopicCoverage = (
    updatedTopicsAndCoverage,
    currentTopicsAndCoverage,
    lengths
  ) => {
    const { mathLength, physicsLength, chemistryLength } = lengths;
    const updatedList = [
      ...currentTopicsAndCoverage.map((thisTopic, index) => {
        return {
          ...thisTopic,
          topicCoverage: updatedTopicsAndCoverage[index].coverage,
        };
      }),
    ];
    const mathUpdated = updatedList.slice(0, mathLength);
    const physicsUpdated = updatedList.slice(
      mathLength,
      mathLength + physicsLength
    );
    const chemistryUpdated = updatedList.slice(
      mathLength + physicsLength,
      chemistryLength + mathLength + physicsLength
    );

    // console.log(mathUpdated, physicsUpdated, chemistryUpdated);
    const updatedSubject = state.subjects.map((subject) => {
      if (subject.subject === 'math') {
        return { ...subject, topics: [mathUpdated] };
      } else if (subject.subject === 'physics') {
        return { ...subject, topics: [physicsUpdated] };
      } else if (subject.subject === 'chemistry') {
        return { ...subject, topics: [chemistryUpdated] };
      }
      return subject;
    });

    dispatch({ type: UPDATE_SCHOOLS_COVERAGE, payload: updatedSubject });
  };

  const authenticateSuperUser = (user, navigate) => {
    const minUser = state.user;
    if (!minUser) {
      dispatch({ type: REGISTER_USER_ERROR });
      const timeOut = setTimeout(() => {
        dispatch({ type: CLEAR_ERROR_MESSAGE });
        return clearTimeout(timeOut);
      }, 2000);
      navigate('/register');
    } else {
      if (user.institution !== 'MOES') {
        dispatch({ type: REGISTER_USER_ERROR });

        const timeOut = setTimeout(() => {
          dispatch({ type: CLEAR_ERROR_MESSAGE });
          return clearTimeout(timeOut);
        }, 2000);
        navigate('/register');
      } else {
        return;
      }
    }
  };
  // register
  const register = async (userInput) => {
    setLoading();
    // Local storage Code
    // let users = getLocalStorage('users');

    // const { institution, email, password } = userInput;
    // if (!institution || !password || !email) {
    //   dispatch({ type: REGISTER_USER_ERROR });
    //   const timeOut = setTimeout(() => {
    //     dispatch({ type: CLEAR_ERROR_MESSAGE });
    //     return clearTimeout(timeOut);
    //   }, 1000);
    // } else {
    //   const user = users.find((user) => user.email === email);
    //   if (user) {
    //     localStorage.setItem('user', JSON.stringify(user));
    //     dispatch({
    //       type: REGISTER_USER_SUCCESS,
    //       payload: { institution: user.institution, email: user.email },
    //     });
    //   } else {
    //     users = [...users, { institution, email, password }];
    //     localStorage.setItem('users', JSON.stringify(users));
    //     localStorage.setItem('user', JSON.stringify({ institution, email }));
    //     dispatch({
    //       type: REGISTER_USER_SUCCESS,
    //       payload: { institution, email },
    //     });
    //   }
    // }
    // Axios code
    try {
      let {
        data: {
          token,
          user: { id, username, email },
        },
      } = await axios.post(`/home/register/`, {
        ...userInput,
      });
      username = username.split('_').join(' ');
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { institution: username, email, id, token },
      });
      localStorage.setItem(
        'user',
        JSON.stringify({ institution: username, email, id, token })
      );
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR });
      const timeOut = setTimeout(() => {
        dispatch({ type: CLEAR_ERROR_MESSAGE });
        return clearTimeout(timeOut);
      }, 2000);
    }
  };

  // login
  const login = async (userInput, navigate) => {
    setLoading();
    // Local storage code
    // const { password, email } = userInput;
    // if (!password || !email) {
    //   dispatch({ type: REGISTER_USER_ERROR });
    //   const timeOut = setTimeout(() => {
    //     dispatch({ type: CLEAR_ERROR_MESSAGE });
    //     return clearTimeout(timeOut);
    //   }, 1000);
    // }
    // const users = getLocalStorage('users');
    // const user = users.find((user) => user.email === email);
    // if (!user) {
    //   dispatch({ type: REGISTER_USER_ERROR });
    //   const timeOut = setTimeout(() => {
    //     dispatch({ type: CLEAR_ERROR_MESSAGE });
    //     return clearTimeout(timeOut);
    //   }, 1000);
    // } else {
    //   if (user.password === password) {
    //     localStorage.setItem('user', JSON.stringify(user));
    //     dispatch({
    //       type: REGISTER_USER_SUCCESS,
    //       payload: { institution: user.institution, email: user.email },
    //     });
    //   } else {
    //     dispatch({ type: REGISTER_USER_ERROR });
    //     const timeOut = setTimeout(() => {
    //       dispatch({ type: CLEAR_ERROR_MESSAGE });
    //       return clearTimeout(timeOut);
    //     }, 1000);
    //   }
    // }

    try {
      const {
        data: { token },
      } = await axios.post(`/users/login_api/`, {
        ...userInput,
      });
      // more data please
      // rectify username/institution to come from server
      const { username } = userInput;
      if (username === 'MOES') {
        dispatch({ type: MINISTRY_LOGGED_IN });
      }
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { institution: username, token },
      });
      localStorage.setItem(
        'user',
        JSON.stringify({ institution: username, token })
      );
      if (state.user && state.user.name === 'MOES') {
        return navigate('/super');
      }
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR });
      const timeOut = setTimeout(() => {
        dispatch({ type: CLEAR_ERROR_MESSAGE });
        return clearTimeout(timeOut);
      }, 2000);
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('schools');
    dispatch({ type: LOGOUT_USER });
    return <Navigate to='/register' replace />;
  };

  // // fetch jobs
  // const fetchJobs = async () => {
  //   setLoading()
  //   try {
  //     const { data } = await axios.get(`/jobs`)
  //     dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs })
  //   } catch (error) {
  //     dispatch({ type: FETCH_JOBS_ERROR })
  //     logout()
  //   }
  // }

  // // create job
  // const createJob = async (userInput) => {
  //   setLoading()
  //   try {
  //     const { data } = await axios.post(`/jobs`, {
  //       ...userInput,
  //     })

  //     dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job })
  //   } catch (error) {
  //     dispatch({ type: CREATE_JOB_ERROR })
  //   }
  // }
  // const deleteJob = async (jobId) => {
  //   setLoading()
  //   try {
  //     await axios.delete(`/jobs/${jobId}`)

  //     fetchJobs()
  //   } catch (error) {
  //     dispatch({ type: DELETE_JOB_ERROR })
  //   }
  // }

  // const fetchSingleJob = async (jobId) => {
  //   setLoading()
  //   try {
  //     const { data } = await axios.get(`/jobs/${jobId}`)
  //     dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job })
  //   } catch (error) {
  //     dispatch({ type: FETCH_SINGLE_JOB_ERROR })
  //   }
  // }
  // const editJob = async (jobId, userInput) => {
  //   setLoading()
  //   try {
  //     const { data } = await axios.patch(`/jobs/${jobId}`, {
  //       ...userInput,
  //     })
  //     dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job })
  //   } catch (error) {
  //     dispatch({ type: EDIT_JOB_ERROR })
  //   }
  // }

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      const newUser = JSON.parse(user);
      // const newSubjects = currentCoverage.find((school)=> school.institution === newUser.institution)
      // // console.log(newSubjects.subjects);
      // if(newSubjects.subjects){

      //   dispatch({type:SHOW_CURRENT_COVERAGE,payload:newSubjects.subjects})
      // }
      dispatch({ type: SET_USER, payload: newUser });
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        logout,
        login,
        Schools,
        displaySchools,
        register,
        authenticateSuperUser,
        updateTopicCoverage,
        getAllUsers,
        getLocalStorage,
        setLoading,
        stopLoading,
        setLocalStorage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
