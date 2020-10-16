import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, PillStackScreens, Screens} from '@/constants/Navigation';
import {useStores} from "@/hooks";
import {SPECIALITIES} from '@/constants/MockUpData';
import Config from '@/config/AppConfig';


function useViewModel(props) {
  const tag = 'Screens::DoctorsByCategory';

  const nav = useNavigation(props);

  const [searchString, setSearchString] = useState('');
  const [specialities, setSpecialities] = useState();
  const [filteredSpecialities, setFilteredSpecialities] = useState();
  const {user, data} = useStores();


  const handleSearchByCategory = async (category) => {
    await data.fetchDoctorsByCategory(user.sessionToken, category);
    console.log(tag, 'SELECT_CATEGORY', category);
    if (data.lastStatus == '401') {
      nav.navigate(Screens.logIn);
      user.logOut();
      alert('Session expired');
    } else {
      nav.navigate(DoctorStackScreens.doctors);
    }
  };

  const fetchSpecialities = async () => {
    try {
      await data.fetchSpecialities(user.sessionToken);
      setSpecialities(data.specialities);
      if (data.lastStatus == '401') {
        nav.navigate(Screens.logIn);
        user.logOut();
      }
    } catch (e) {
      console.log(tag, 'FETCH_SPECIALITY_EXCEPTION', e.message)
    }
  };

  const groupSpecialities = () => {
    let groups = [];
    let validSpecialities = [];
    for (let item of specialities) {
      if (searchString && item.value.toString().indexOf(searchString.toLowerCase()) < 0) {
        continue;
      }
      validSpecialities.push(item);
    }
    for (let i = 0; i < validSpecialities.length; i += 2) {
      if (validSpecialities[i + 1]) {
        groups.push([
          validSpecialities[i], validSpecialities[i + 1]
        ])
      } else {
        groups.push([
          validSpecialities[i]
        ])
      }
    }
    return groups;
  };

  useEffect(() => {
    fetchSpecialities();
  }, []);

  useEffect(() => {
    // console.log(tag, 'Search String', searchString);
    if (specialities) {
      setFilteredSpecialities(groupSpecialities())
    }
  }, [searchString, specialities]);

  return {
    searchString, setSearchString,
    filteredSpecialities,
    data,
    handleSearchByCategory,
  }
}

export default useViewModel;
