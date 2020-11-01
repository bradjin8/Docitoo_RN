import React, {useState, useEffect} from 'react';
import {useStores} from "@/hooks";
// import RNLocation from 'react-native-location';
//
// RNLocation.configure({
//   distanceFilter: 0.5
// });

function useViewModel(props) {
  const [doctorName, setDoctorName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [location, setLocation] = useState({latitude: 33.3, longitude: 43.7, latitudeDelta: 0.25, longitudeDelta: 0.25});
  const [isLocationMode, setLocationMode] = useState(false);
  const {user, data} = useStores();

  const onPressFilterResults = () => {
    const filter = {
      name: doctorName,
      speciality,
      location
    };

    props.onPressOK(filter);
  };

  useEffect(() => {
    // RNLocation.requestPermission({
    //   ios: "whenInUse",
    //   android: {
    //     detail: "coarse"
    //   }
    // }).then(granted => {
    //   if (granted) {
    //     this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
    //       const {longitude, latitude} = locations;
    //       if (!location) {
    //         setLocation({latitude, longitude})
    //       }
    //     })
    //   } else {
    //     setLocation({latitude: 37.7, longitude: -112.4})
    //   }
    // });
  }, []);

  return {
    doctorName, setDoctorName,
    speciality, setSpeciality,
    location, setLocation,
    isLocationMode, setLocationMode,
    specialities: data.specialities,
    data,
    onPressFilterResults
  }
}

export default useViewModel;
