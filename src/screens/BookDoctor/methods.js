import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, Screens} from '@/constants/Navigation';
import {mockDoctors} from '@/constants/MockUpData';
import __ from '@/assets/lang';

const tag = 'Screens::ViewDoctor::PickADate';
const mockDoctor = mockDoctors[0];


function useViewModel(props) {
  const nav = useNavigation();

  const MODE = {DATE: 'DATE', TIME: 'TIME'};

  const [date, setDate] = useState(new Date());
  const [doctor, setDoctor] = useState(mockDoctor);
  const [mode, setMode] = useState(MODE.DATE);
  const [confirmCaption, setConfirmCaption] = useState(__('confirm_selection'));
  const [title, setTitle] = useState(__('pick_a_date'));
  const [timeSlots, setTimeSlots] = useState(null);

  const onPressBack = () => {
    if (mode === MODE.DATE) {
      if (nav.canGoBack()) {
        nav.goBack();
      }
    } else if (mode === MODE.TIME) {
      _toggleMode();
    }
  };

  const onPressConfirm = () => {
    console.log(tag, 'onPressConfirm()', mode, date);
    if (mode === MODE.DATE) {
      _toggleMode();
    }
    if (mode === MODE.TIME) {
      nav.navigate(DoctorStackScreens.doctors)
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

  const selectTimeSlot = (hour) => {
    let newTimeSlots = {..._deselectAllTimeSlots(timeSlots)};

    if (newTimeSlots[hour].available) {
      newTimeSlots[hour].selected = true;
    }

    setTimeSlots(newTimeSlots);
    console.log(tag, 'SelectTimeSlot()', newTimeSlots[hour]);
  };

  useEffect(() => {
    if (doctor) {
      let initTimeSlots = {};
      for (let i = parseInt(doctor.availableTime.from); i < parseInt(doctor.availableTime.to); i += 0.5) {
        initTimeSlots[i.toString()] = {
          hour: i,
          label: _getLabel(i),
          available: true,
          selected: false,
        };
      }
      setTimeSlots(initTimeSlots)
    }
  }, [doctor]);

  return {
    date, setDate,
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
