import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BookingStackScreens, Screens} from '@/constants/Navigation';
import {Platform, PermissionsAndroid} from 'react-native';
import {useStores} from "@/hooks";
import __ from '@/assets/lang';

const tag = 'Screens::Bookings';

function useViewModel(props) {
  const nav = useNavigation(props);


  const [bookings, setBookings] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {user, data, d_data} = useStores();

  const onPressSort = () => {
    // nav.goBack()
    let newBookings = bookings.slice();
    newBookings.sort((a, b) => {
      // Sort by Rating DESC
      if (a.date < b.date) {
        return 1;
      }
      else if (a.date > b.date) {
        return -1;
      }
      // Sub compare is FullName
      else {
        return a.status.localeCompare(b.fullName);
      }
    });

    setBookings(newBookings);
  };

  const toggleModal = () => {
    setSearchVisible(!searchVisible);
  };

  const onPressSearch = () => {
    toggleModal();
  };

  const onPressBooking = (booking) => {
    console.log(tag, 'onPressBooking()', booking.id);
    d_data.selectBooking(booking.id);

    nav.navigate(BookingStackScreens.viewBooking);
  };

  const applyFilter = async (filter) => {
    console.log(tag, 'applyFilter()', filter);
    toggleModal();
    setLoading(true);
    try {
      await d_data.searchBookings(user.sessionToken, filter.name, filter.speciality, filter.address);
      if (d_data.lastStatus == '401') {
        nav.navigate(Screens.logIn);
        user.logOut();
        alert(__('session_expired'));
      }
      setBookings(d_data.bookings);
    } catch (e) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBookings(bookings)
  }, [d_data.bookings]);

  const fetchBookings = async () => {
    setLoading(true);
    await d_data.fetchBookings(user.sessionToken);
    if (d_data.lastStatus == '401') {
      nav.navigate(Screens.logIn);
      user.logOut();
      alert(__('session_expired'));
      return;
    }
    setBookings(d_data.bookings);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings, setBookings,
    searchVisible, setSearchVisible,
    isLoading,
    user, data, d_data,
    onPressSort,
    onPressSearch,
    onPressBooking,
    applyFilter,
    fetchBookings
  }
}

export default useViewModel;
