import {applySnapshot, flow, types} from "mobx-state-tree";
import {observable} from "mobx";
import {isEmpty} from 'lodash';
import {defNumber, defString, defObjString, PillReminder, Doctor} from './Types';
import 'mobx-react-lite/batchingForReactDom';
import * as Api from '@/Services/Api';
import {Alert} from "react-native";
import Config from '@/config/AppConfig';

const tag = 'MST.Data';
let statusCode = 0;
const Data = types
  .model('Data', {
    // doctors: types.frozen,
    pillReminders: types.array(PillReminder),
    doctors: types.array(Doctor),
    lastStatus: defNumber,
    selectedDoctorId: defString,
  })
  .views((self) => ({

    // get getDoctors() {
    //   return self.doctors;
    // },
    get getPills() {
      return self.pillReminders;
    },
    get getDoctors() {
      return self.doctors;
    },
    get getSelectedDoctor() {
      for (let doctor of self.doctors) {
        if (doctor.id === self.selectedDoctorId) {
          return doctor;
        }
      }
      return null;
    }
  }))
  .actions((self) => {
    const _updatePillReminders = (data) => {
      self.pillReminders = data.pillReminders;
    };

    const _updateDoctors = (data) => {
      let doctors = [];
      for (let doctor of data.doctors) {
        doctor.avatarUrl = Config.appBaseUrl + doctor.avatarUrl;
        doctors.push(doctor);
      }
      self.doctors = doctors;
    };

    const getPillReminders = flow(function* updatePillReminders(
      userToken
    ) {
      try {
        const response = yield Api.getPillReminders(userToken);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from GetPillReminders API', typeof response.status);
        if (!ok) {
          /*Alert.alert(
            "Error",
            "Getting Failed, try again",
            [
              {
                text: 'OK',
                onPress: () => console.log(tag, 'GetPillReminder Error', 'OK pressed')
              }
            ],
            {cancelable: false}
          );*/
          return;
        }
        _updatePillReminders(data);

      } catch (e) {

      }
    });

    const addPillReminder = flow(function* addPillReminder(
      userToken,
      medicineName,
      dosage,
      frequency,
      timeToTake
    ) {
      try {
        const response = yield Api.addPillReminder(userToken, medicineName, dosage, frequency, timeToTake);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from AddPillReminder API', data);
        if (!ok) {
          // Alert.alert(
          //   "Error",
          //   "Adding Failed, try again",
          //   [
          //     {
          //       text: 'OK',
          //       onPress: () => console.log(tag, 'AddPillReminder Error', 'OK pressed')
          //     }
          //   ],
          //   {cancelable: false}
          // );
          return;
        }
        yield getPillReminders(userToken);
      } catch (e) {
        console.log(tag, 'Adding Pill Exception', e.message)
      }
    });

    const fetchDoctorsByCategory = flow(function* fetchDoctorsByCategory(
      userToken, category
    ) {
      try {
        const response = yield Api.searchDoctorsByCategory(userToken, category);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from SearchDoctorsByCategory API', data);
        if (!ok) {
          // Alert.alert(
          //   "Error",
          //   "Getting Failed, try again",
          //   [
          //     {
          //       text: 'OK',
          //       onPress: () => console.log(tag, 'SearchDoctorsByCategory Error', 'OK pressed')
          //     }
          //   ],
          //   {cancelable: false}
          // );
          return;
        }
        _updateDoctors(data);

      } catch (e) {

      }
    });

    const selectDoctor = (id) => {
      self.selectedDoctorId = id;
    };

    const requestBook = flow(function* requestBook(
      userToken, doctorId, timestamp
    ) {
      try {
        const response = yield Api.requestBook(userToken, doctorId, timestamp);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from RequestBook API', data);
        if (!ok) {
          return;
        }
        _updateDoctors(data);
      } catch (e) {

      }

    });

    return {getPillReminders, addPillReminder, fetchDoctorsByCategory, selectDoctor, requestBook}
  })
  .extend((self) => {
    const localState = observable.box(false);
    return {
      views: {
        get isLoggingIn() {
          return localState.get();
        },
      },
      actions: {
        setLoggingIn(value) {
          localState.set(value)
        },
      },
    };
  });

export default Data;
