import React, {useState, useEffect} from 'react';

function useViewModel(props) {
  const [doctorName, setDoctorName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [location, setLocation] = useState({latitude: 37.7, longitude: -112.4});
  const [isLocationMode, setLocationMode] = useState(false);

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
    isLocationMode, setLocationMode,
    onPressFilterResults
  }
}

export default useViewModel;
