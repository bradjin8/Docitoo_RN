import Config from '@/config/AppConfig';
import apisauce from 'apisauce';
import ApiUrl from '@/constants/Api';
import {Platform} from 'react-native';

const api = apisauce.create({
  baseURL: Config.apiBaseUrl,
  headers: {
    'Cache-Control': 'no-cache',
  },
  timeout: 10000,
});

const createFormData = (avatarSource, body) => {
  const data = new FormData();
  if (avatarSource) {
    const uriSnippet = avatarSource.uri.split('/');
    const fileName = uriSnippet[uriSnippet.length - 1];

    data.append("avatar", {
      name: fileName,
      type: avatarSource.type,
      uri: Platform.OS === 'android' ? avatarSource.uri : avatarSource.uri.replace('file://', '')
    });
  }

  Object.keys(body).forEach(key => {
    data.append(key, body[key])
  });

  return data;
};

export const logIn = (email, password) => api.post(ApiUrl.logIn, {email, password});

export const logOut = (userToken) =>
  api.post(
    ApiUrl.logOut,
    {},
    {
      headers:
        {userToken: userToken}
    }
  );

export const register = (email, fullName, password, phoneNumber) =>
  api.post(
    ApiUrl.register,
    {
      email,
      fullName,
      password,
      phoneNumber
    }
  );

export const updateProfile = (
  fullName, email, phoneNumber, password, gender, bloodType, language, avatarSource
) => {
  let body = {
    fullName,
    email,
    phoneNumber,
    password,
    gender,
    bloodType,
    language
  };


  return api.patch(ApiUrl.details, createFormData(avatarSource, body), {headers: {'Content-TYpe': 'multipart/form-data'}})
};

export const getPillReminders = (userToken) => api.get(ApiUrl.getPillReminders, {}, {headers: {userToken}});

