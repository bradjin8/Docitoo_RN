import Config from '@/config/AppConfig';
import apisauce from 'apisauce';
import ApiUrl from '@/constants/Api';
import {Platform} from 'react-native';

const api = apisauce.create({
  baseURL: Config.apiBaseUrl,
  headers: {
    'Cache-Control': 'no-cache',
  },
  timeout: 30000,
});

const createFormData = (avatarSource, body) => {
  const data = new FormData();

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  if (avatarSource && avatarSource.uri) {
    const uriSnippet = avatarSource.uri.split('/');
    const fileName = uriSnippet[uriSnippet.length - 1];
    const file = {
      name: fileName + '.jpg',
      type: avatarSource.type,
      uri: Platform.OS === 'android' ? avatarSource.uri : avatarSource.uri.replace('file://', ''),
    };
    console.log(file);
    data.append('avatar', file);
    data.append('Content-Type', avatarSource.type);
  }
  return data;
};

export const logIn = (email, password, deviceUserId, deviceType) => api.post(ApiUrl.logIn, {
  email,
  password,
  deviceUserId,
  deviceType,
});

export const logInWithPhone = (phoneNumber, deviceUserId, deviceType) => api.post(ApiUrl.logIn, {
  email: '',
  password: '',
  deviceUserId,
  deviceType,
  phoneNumber,
});

export const logOut = (userToken) =>
  api.post(
    ApiUrl.logOut,
    {},
    {
      headers:
        {userToken: userToken},
    },
  );

export const register = (email, fullName, password, phoneNumber, deviceUserId, deviceType) =>
  api.post(
    ApiUrl.register,
    {
      email,
      fullName,
      password,
      phoneNumber,
      deviceUserId,
      deviceType,
    },
  );

export const _updateProfile = async (
  userToken,
  fullName, email, phoneNumber, password, gender, bloodType, language, avatarUrl, avatarSource,
) => {
  return new Promise(async (resolve, reject) => {
    let body = {
      fullName,
      email,
      phoneNumber,
      password,
      gender,
      bloodType,
      language,
      avatarUrl,
    };

    let params = createFormData(avatarSource, body);

    //return api.post(ApiUrl.details, params, {headers: {'Accept': 'multipart/form-data', 'Content-Type': 'multipart/form-data', userToken}})
    fetch(Config.apiBaseUrl + ApiUrl.details, {
      method: 'POST',
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
        userToken: userToken,
      },
      body: params,
    }).then((response) => response.json())
      .then((data) => {
        console.log('Service/Api/updateProfile', 'Success', data);
        resolve({ok: true, data: data});
      }).catch(err => {
      console.log('Service/Api/updateProfile', 'Failed', err.message);
      resolve({ok: false, data: err});
    });
  });
};

export const updateProfile = (userToken, fullName, email, phoneNumber, password, gender, bloodType, language, avatarUrl) =>
  api.post(ApiUrl.details, {
    fullName,
    email,
    phoneNumber,
    password,
    gender,
    bloodType,
    language,
    avatarUrl,
  }, {headers: {userToken}});

export const getPillReminders = (userToken) => api.get(ApiUrl.pillReminder, {}, {headers: {userToken}});

export const addPillReminder = (userToken, medicineName, dosage, frequency, timeToTake) => api.post(ApiUrl.pillReminder, {
  medicineName,
  dosage,
  frequency,
  timeToTake,
}, {headers: {userToken}});

export const getNotifications = (userToken) => api.get(ApiUrl.notification, {}, {headers: {userToken}});

export const setNotificationAsRead = (userToken, id) => api.delete(ApiUrl.notification + '/' + id, {}, {headers: {userToken}});

export const searchDoctorsByCategory = (userToken, category) => api.post(ApiUrl.searchDoctorsByCategory, {category}, {headers: {userToken}});

export const searchDoctors = (userToken, name, speciality, address) => api.post(ApiUrl.searchDoctors, {
  name,
  speciality,
  address,
}, {headers: {userToken}});

export const requestBook = (userToken, doctorId, timestamp) => api.put(ApiUrl.userDoctor + '/' + doctorId + '/booking', {timestamp}, {headers: {userToken}});

export const submitReview = (userToken, doctorId, rating, description) => api.put(ApiUrl.userDoctor + '/' + doctorId + '/review', {
  rating,
  description,
}, {headers: {userToken}});

export const fetchDoctorById = (userToken, doctorId) => api.get(ApiUrl.userDoctor + '/' + doctorId, {}, {headers: {userToken}});

export const fetchSpecialities = (userToken) => api.get(ApiUrl.fetchSpecialities, {}, {headers: {userToken}});

export const getBookings = (userToken) => api.get(ApiUrl.doctorUser + '/booking', {}, {headers: {userToken}});
export const getUserBookings = (userToken) => api.get(ApiUrl.userDoctor + '/booking', {}, {headers: {userToken}});
export const acceptBooking = (userToken, bookingId) => api.post(`${ApiUrl.doctorUser}/booking/${bookingId}/accepted`, {}, {headers: {userToken}});
export const rejectBooking = (userToken, bookingId) => api.post(`${ApiUrl.doctorUser}/booking/${bookingId}/rejected`, {}, {headers: {userToken}});

export const sendMessage = (subject, message) => api.post(`${ApiUrl.sendMessage}`, {
  subject,
  message,
});

export const sendCodeSMS = (phoneNumber) => api.post(ApiUrl.sendCodeSMS, {phoneNumber});
export const checkCode = (phoneNumber, code) => api.post(ApiUrl.checkCode, {phoneNumber, code});