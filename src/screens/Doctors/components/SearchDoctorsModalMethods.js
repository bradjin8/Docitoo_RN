import React, {useState, useEffect} from 'react';

function useViewModel(props) {
  const [doctorName, setDoctorName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [location, setLocation] = useState('');

  const onPressFilterResults = () => {
    const filter = {
      name: doctorName,
      speciality,
      location
    };

    props.onPressOK(filter);
  };

  return {
    doctorName, setDoctorName,
    speciality, setSpeciality,
    location, setLocation,
    onPressFilterResults
  }
}

export default useViewModel;
