import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, Screens} from '@/constants/Navigation';
import {Platform, PermissionsAndroid} from 'react-native';
import {useStores} from "@/hooks";

const tag = 'Screens::Doctors';

function useViewModel(props) {
  const nav = useNavigation(props);


  const [doctors, setDoctors] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const {user, data} = useStores();

  const onPressSort = () => {
    // nav.goBack()
    let newDoctors = doctors.slice();
    newDoctors.sort((a, b) => {
      let _getAverageRating = (_doc) => {
        let _total = 0;
        for (let _item of _doc.reviews) {
          _total += _item.rating;
        }
        return _total > 0 ? _total / _doc.reviews.length : _total;
      };

      const a_R = _getAverageRating(a);
      const b_R = _getAverageRating(b);

      // Sort by Rating DESC
      if (a_R < b_R) {
        return 1;
      }
      else if (a_R > b_R) {
        return -1;
      }
      // Sub compare is FullName
      else {
        return a.fullName.localeCompare(b.fullName);
      }
    });

    setDoctors(newDoctors);
  };

  const toggleModal = () => {
    setSearchVisible(!searchVisible);
  };

  const onPressSearch = () => {
    toggleModal();
  };

  const onPressDoctor = (doctor) => {
    console.log(tag, 'onPressDoctor()', doctor.id);
    data.selectDoctor(doctor.id);

    nav.navigate(DoctorStackScreens.viewDoctor);
  };

  const applyFilter = (filter) => {
    console.log(tag, 'applyFilter()', filter);
    toggleModal();
  };

  useEffect(() => {
    if (data.lastStatus == '401') {
      nav.navigate(Screens.logIn);
      user.logOut();
      alert('Session expired');
    }
    setDoctors(data.doctors);
  }, []);

  return {
    doctors, setDoctors,
    searchVisible, setSearchVisible,
    user, data,
    onPressSort,
    onPressSearch,
    onPressDoctor,
    applyFilter,
  }
}

export default useViewModel;
