import {applySnapshot, flow, types} from "mobx-state-tree";
import {observable} from "mobx";
import {isEmpty} from 'lodash';
import {defNumber, Booking, defString, Doctor, Speciality} from './Types';
import 'mobx-react-lite/batchingForReactDom';
import * as Api from '@/Services/Api';
import {Alert} from "react-native";
import Config from '@/config/AppConfig';
import __ from '@/assets/lang';
import {getBookings} from "@/Services/Api";

const tag = 'MST.DData';
let statusCode = 0;
const DData = types
  .model('DData', {
    bookings: types.array(Booking),
    users: types.array(Doctor),
    specialities: types.array(Speciality),
    lastStatus: defNumber,
    selectedBookingId: defString,
  })
  .views((self) => ({
  }))
  .actions((self) => {
    const _updateSpecialities = (specialities) => {
      self.specialities = specialities;
    };

    const _updateBookings = (data) => {
      let bookings = [];
      for (let booking of data.bookings) {
        if (booking.user) {
          booking.user.avatarUrl = Config.appBaseUrl + booking.user.avatarUrl;
        }
        bookings.push(booking);
      }
      self.bookings = bookings;
    };

    const fetchBookings = flow(function* (
      userToken
    ) {
      self.setProcessing(true);
      try {
        const {ok, data, status} = yield Api.getBookings(userToken);
        self.lastStatus = status;
        if (!data) {
          alert(__('can_not_connect_server'));
        }
        if (ok) {
          _updateBookings(data)
        }
      } catch (e) {

      } finally {
        self.setProcessing(false)
      }
    });

    const selectBooking = function (bookingId) {
      self.selectedBookingId = bookingId;
    };

    const rejectBooking = flow(function* (
      userToken, bookingId
    ) {
      self.setProcessing(true);
      try {
        const response = yield Api.rejectBooking(userToken, bookingId);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from RejectBooking API', data);
        if (ok) {
          yield getBookings(userToken);
        }
        if (!data) {
          alert(__('can_not_connect_server'));
        }
      } catch (e) {

      } finally {
        self.setProcessing(false);
      }

    });

    const acceptBooking = flow(function* (
      userToken, bookingId
    ) {
      self.setProcessing(true);
      try {
        const response = yield Api.acceptBooking(userToken, bookingId);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from RejectBooking API', data);
        if (ok) {
          yield getBookings(userToken);
        }
        if (!data) {
          alert(__('can_not_connect_server'));
        }
      } catch (e) {

      } finally {
        self.setProcessing(false);
      }

    });

    const fetchSpecialities = flow(function* fetchSpecialities(
      userToken
    ) {
      self.setProcessing(true);
      try {
        const {data, ok, status} = yield Api.fetchSpecialities(userToken);
        self.lastStatus = status;

        if (ok) {
          let temp = [];
          console.log(tag, 'FETCH_SPECIALITY', data.specialities);
          for (let speciality of data.specialities) {
            temp.push({
              label: speciality.label,
              value: speciality.value,
              id: speciality._id,
              iconUrl: Config.specialityUrlPrefix + speciality.iconName,
            })
          }
          _updateSpecialities(temp);
        }
        if (!data) {
          alert(__('can_not_connect_server'));
        }
      } catch (e) {

      } finally {
        self.setProcessing(false);
      }
    });

    return {
      fetchBookings,
      selectBooking,
      rejectBooking,
      acceptBooking,
      fetchSpecialities
    }
  })
  .extend((self) => {
    const localState = observable.box(false);
    return {
      views: {
        get isProcessing() {
          return localState.get();
        },
      },
      actions: {
        setProcessing(value) {
          localState.set(value)
        },
      },
    };
  });

export default DData;
