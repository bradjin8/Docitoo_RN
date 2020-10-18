import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, Screens} from '@/constants/Navigation';
import {mockDoctors} from '@/constants/MockUpData';
import __ from '@/assets/lang';
import {useStores} from "@/hooks";

const tag = 'Screens::ViewDoctor::PickADate';
const mockDoctor = mockDoctors[0];


function useViewModel(props) {
  const nav = useNavigation(props);

  const MODE = {DATE: 'DATE', TIME: 'TIME'};

  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(-1);

  const [doctor, setDoctor] = useState(null);
  const [mode, setMode] = useState(MODE.DATE);
  const [confirmCaption, setConfirmCaption] = useState(__('confirm_selection'));
  const [title, setTitle] = useState(__('pick_a_date'));
  const [timeSlots, setTimeSlots] = useState({});
  const {user, data} = useStores();

  const onPressBack = () => {
    if (mode === MODE.DATE) {
      if (nav.canGoBack()) {
        nav.goBack();
      }
    } else if (mode === MODE.TIME) {
      _toggleMode();
    }
  };

  const onPressConfirm = async () => {
    console.log(tag, 'onPressConfirm()', mode, date, hour);
    if (mode === MODE.DATE) {
      _toggleMode();
    }
    if (mode === MODE.TIME) {
      // request Book ...
      if (hour < 0) {
        return;
      }

      const selectedDate = new Date(date);
      let bookDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), Math.floor(hour), (hour - Math.floor(hour)) * 60);
      try {
        console.log(tag, 'bookDate', bookDate.getTime(), bookDate.getTimezoneOffset())
        await data.requestBook(user.sessionToken, doctor.id, bookDate.getTime());
        if (data.lastStatus == '401') {
          nav.navigate(Screens.logIn);
          await user.logOut();
          alert(__('session_expired'));
          return;
        }
      } catch (e) {

      }

      nav.navigate(DoctorStackScreens.doctors);
    }
  };

  const _toggleMode = () => {
    if (mode === MODE.DATE) {
      setMode(MODE.TIME);
    } else if (mode === MODE.TIME) {
      setMode(MODE.DATE);
    }
  };

  useEffect(() => {
    if (mode === MODE.DATE) {
      setConfirmCaption(__('confirm_selection'));
      setTitle(__('pick_a_date'));
    } else if (mode === MODE.TIME) {
      setConfirmCaption(__('book_appointment'));
      setTitle(__('pick_a_time'));
    }
  }, [mode]);

  const _appendZero = (val) => {
    if (val < 10) {
      val = '0' + val;
    }
    return val;
  };

  const _getLabel = (hour) => {
    let _hour = Math.floor(hour);
    let _hourAP = 'AM';
    if (_hour > 12) {
      _hourAP = 'PM';
    }
    if (_hour === 0) {
      _hour = 12;
    }
    _hour = _appendZero(_hour);

    let _min = parseInt((hour - _hour) * 60);
    _min = _appendZero(_min);

    return `${_hour}:${_min} ${_hourAP}`;
  };

  const _deselectAllTimeSlots = (valSlot) => {
    Object.keys(valSlot).map((key) => {
      valSlot[key].selected = false;
    });
    return valSlot;
  };

  const _formatKey = (val, length) => {
    while (val.length < length) {
      val = '0' + val;
    }
    return val;
  };

  const selectTimeSlot = (hour) => {
    let newTimeSlots = {..._deselectAllTimeSlots(timeSlots)};

    if (newTimeSlots[hour].available) {
      newTimeSlots[hour].selected = true;
    }

    setTimeSlots(newTimeSlots);
    setHour(newTimeSlots[hour].hour);
    console.log(tag, 'SelectTimeSlot()', newTimeSlots[hour]);
  };

  const updateTimeSlots = () => {
    if (doctor) {
      let availableTimeSlot = {};

      let from = doctor.availableTime.from;
      const cd = new Date();
      const sd = new Date(date);
      if (
        sd.getFullYear() === cd.getFullYear() &&
        sd.getMonth() === cd.getMonth() &&
        sd.getDate() === cd.getDate() &&
        cd.getHours() > from
      ) {
        from = cd.getHours() + 1;
      }

      for (let i = parseInt(from); i < parseInt(doctor.availableTime.to); i += 0.5) {
        availableTimeSlot[_formatKey((i * 10).toString(), 3)] = {
          hour: i,
          label: _getLabel(i),
          available: true,
          selected: false,
        };
      }
      console.log(tag, 'UpdateTimeSlots', availableTimeSlot);
      setTimeSlots(availableTimeSlot)
    }
  };

  useEffect(() => {
    updateTimeSlots();
  }, [date]);

  useEffect(() => {
    setDoctor(data.getSelectedDoctor);
    updateTimeSlots();
  }, []);

  return {
    date, setDate,
    hour, setHour,
    doctor, setDoctor,
    mode, setMode,
    confirmCaption, setConfirmCaption,
    title, setTitle,
    timeSlots, setTimeSlots,
    MODE,
    onPressBack,
    onPressConfirm,
    selectTimeSlot,
  }
}

export default useViewModel;
