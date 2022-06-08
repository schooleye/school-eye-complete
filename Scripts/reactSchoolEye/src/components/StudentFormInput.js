import React from 'react';
import FormRow from '../components/FormRow';
import { useState } from 'react';
// chart-container , chart-container-ministry
const currentState = {
  firstName: '',
  givenName: '',
  IDNumber: '',
  DOB: '',
  combination: '',
};
const StudentFormInput = () => {
  const [state, setState] = useState(currentState);
  const handleChange = (e) => {
    let name = e.target.name;
    if (name === 'first name') {
      name = 'firstName';
    } else if (name === 'given name') {
      name = 'givenName';
    } else if (name === 'ID number') {
      name = 'IDNumber';
    }
    setState((current) => {
      return { ...current, [name]: e.target.value };
    });
  };
  return (
    <section className='chart-container-student'>
      <FormRow
        type='name'
        name='first name'
        value={state.firstName}
        handleChange={handleChange}
      />
      <FormRow
        type='name'
        name='given name'
        value={state.givenName}
        handleChange={handleChange}
      />
      <FormRow
        type='text'
        name='ID number'
        value={state.IDNO_}
        handleChange={handleChange}
      />
      <FormRow
        type='text'
        name='combination'
        value={state.combination}
        handleChange={handleChange}
      />
      <FormRow
        type='date'
        name='DOB'
        value={state.DOB}
        handleChange={handleChange}
      />
    </section>
  );
};

export default StudentFormInput;
