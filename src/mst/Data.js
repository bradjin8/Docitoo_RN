import {applySnapshot, flow, types} from "mobx-state-tree";
import {observable} from "mobx";
import {isEmpty} from 'lodash';
import {defNumber, defString, defObjString, PillReminder, Doctor, DoctorDetails} from './Types';
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
    selectedDoctor: types.array(DoctorDetails),
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
      if (self.selectedDoctor && self.selectedDoctor.length > 0)
        return self.selectedDoctor[0];
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
      self.setProcessing(true);
      try {
        const response = yield Api.getPillReminders(userToken);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from GetPillReminders API', typeof response.status);
        if (ok) {
          _updatePillReminders(data);
        }
      } catch (e) {
      }
      finally {
        self.setProcessing(false);
      }
    });

    const addPillReminder = flow(function* addPillReminder(
      userToken,
      medicineName,
      dosage,
      frequency,
      timeToTake
    ) {
      self.setProcessing(true);

      try {
        const response = yield Api.addPillReminder(userToken, medicineName, dosage, frequency, timeToTake);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from AddPillReminder API', data);
        if (ok) {
          yield getPillReminders(userToken);
        }
      } catch (e) {
        console.log(tag, 'Adding Pill Exception', e.message)
      } finally {
        self.setProcessing(false);
      }
    });

    const fetchDoctorsByCategory = flow(function* fetchDoctorsByCategory(
      userToken, category
    ) {
      self.setProcessing(true);

      try {
        const response = yield Api.searchDoctorsByCategory(userToken, category);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from SearchDoctorsByCategory API', data);
        if (ok) {
          _updateDoctors(data);
        }
      } catch (e) {
      } finally {
        self.setProcessing(false);
      }
    });

    const searchDoctors = flow(function* searchDoctors(
      userToken, name, speciality, address
    ) {
      self.setProcessing(true);

      try {
        const response = yield Api.searchDoctors(userToken, name, speciality, address);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from SearchDoctorsByCategory API', data);
        if (ok) {
          _updateDoctors(data);
        }
      } catch (e) {
      } finally {
        self.setProcessing(false);
      }
    });



    const selectDoctor = (id) => {
      self.selectedDoctorId = id;
    };

    const fetchDoctorById = flow(function* fetchDoctorById(userToken, doctorId) {
      try {
        const response = yield Api.fetchDoctorById(userToken, doctorId);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from DoctorByID API', data);
        if (ok) {
          let {doctor} = data;
          doctor.avatarUrl = Config.appBaseUrl + doctor.avatarUrl;
          for (let i = 0; i < doctor.reviews.length; i ++) {
            doctor.reviews[i].author.avatarUrl = Config.appBaseUrl + doctor.reviews[i].author.avatarUrl;
          }
          self.selectedDoctor = [doctor];
        }
      } catch (e) {

      } finally {
        self.setProcessing(false);
      }
    });

    const requestBook = flow(function* requestBook(
      userToken, doctorId, timestamp
    ) {
      try {
        const response = yield Api.requestBook(userToken, doctorId, timestamp);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from RequestBook API', data);
        if (ok) {
        }

      } catch (e) {

      } finally {
        self.setProcessing(false);
      }

    });

    const submitReview = flow(function* submitReview(
      userToken, doctorId, rating, description
    ) {
      try {
        const response = yield Api.submitReview(userToken, doctorId, rating, description);
        const {ok, data} = response;
        self.lastStatus = response.status;
        console.log(tag, 'Response from SubmitReview API', data);
        if (ok) {
          _updateDoctors(data);
          selectDoctor(doctorId);
        }
      } catch (e) {

      } finally {
        self.setProcessing(false);
      }

    });

    return {getPillReminders, addPillReminder, fetchDoctorsByCategory, searchDoctors, selectDoctor, requestBook, submitReview, fetchDoctorById}
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

export default Data;
