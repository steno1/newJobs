import { Alert, FormRow } from '../../components';

import React from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useAppContext } from '../../context/appContext';
import { useState } from 'react';

const ProFile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();
  const [name, setName] = useState(user?.name); // State variable for storing the name
  const [email, setEmail] = useState(user?.email); // State variable for storing the email
  const [lastName, setLastName] = useState(user?.lastName); // State variable for storing the last name
  const [location, setLocation] = useState(user?.location); // State variable for storing the location

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert(); // Display alert if any field is empty
      return;
    }
    updateUser({ name, email, lastName, location }); // Call updateUser function to update user details
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />} {/* Display alert component if showAlert is true */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='lastName'
            labelText='Last Name'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          /> {/* FormRow component for the last name input field */}

          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          /> {/* FormRow component for the name input field */}

          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          /> {/* FormRow component for the email input field */}

          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          /> {/* FormRow component for the location input field */}

          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'Save Changes'}
          </button> {/* Submit button to save changes */}
        </div>
      </form>
    </Wrapper>
  );
};

export default ProFile;
