import Config from '@/config/AppConfig';
import apisauce from 'apisauce';
import ApiUrl from '@/constants/Api';


const api = apisauce.create({
  baseURL: Config.apiBaseUrl,
  headers: {
    'Cache-Control': 'no-cache',
  },
  timeout: 10000,
});


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

export const getPillReminders = (userToken) => api.get(ApiUrl.getPillReminders, {}, {headers: {userToken}});
