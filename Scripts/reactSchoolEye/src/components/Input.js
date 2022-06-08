import React, { useState } from 'react';
import inputTopics from '../assets/layup';
import { useGlobalContext } from '../context/appContext';
const Input = ({ handleRadioChange, SubjectDOM }) => {
  const { subjects } = useGlobalContext();
  const { SubjectDOM1, SubjectDOM2, SubjectDOM3 } = SubjectDOM;
  const checkSubject = (variable) => {
    if (variable === 'math') {
      return SubjectDOM1;
    } else if (variable === 'physics') {
      return SubjectDOM2;
    } else {
      return SubjectDOM3;
    }
  };
  // const [checkColor,setCheckColor] = useState('red');
  return (
    <section>
      {subjects.map((subject, index) => {
        return (
          <article
            key={index}
            className='subject'
            ref={checkSubject(subject.subject)}
          >
            <h2>{subject.subject}</h2>
            <div className='coverage-input'>
              {subject.topics.map((topic, index) => {
                return topic.map((topic, index) => {
                  return (
                    <fieldset key={index}>
                      <legend>{topic.title}</legend>
                      <input
                        type='radio'
                        name={topic.title}
                        id='red'
                        value='0%'
                        onChange={handleRadioChange}
                        className='flex'
                      />
                      <label htmlFor='red'>0%</label>
                      <input
                        type='radio'
                        name={topic.title}
                        id='blue'
                        value='25%'
                        onChange={handleRadioChange}
                        className='flex'
                      />
                      <label htmlFor='blue'>25%</label>
                      <input
                        type='radio'
                        name={topic.title}
                        id='orange'
                        value='75%'
                        onChange={handleRadioChange}
                        className='flex'
                      />
                      <label htmlFor='orange'>75%</label>
                      <input
                        type='radio'
                        name={topic.title}
                        id='green'
                        value='100%'
                        onChange={handleRadioChange}
                        className='flex'
                      />
                      <label htmlFor='green'>100%</label>
                      <p>current percentage: {topic.topicCoverage}</p>
                    </fieldset>
                  );
                });
              })}
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Input;
