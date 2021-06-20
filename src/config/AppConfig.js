// const ServerURL = 'http://192.168.101.246:3010';
// const ServerURL = 'https://docitoo.com/api-v1'; //https://docitoo.com/api-v1
const ServerURL = 'https://docitoo.herokuapp.com'; //https://docitoo.com/api-v1

export default {
  appBaseUrl: ServerURL,
  apiBaseUrl: ServerURL + '/api/',
  specialityUrlPrefix: ServerURL + '/images/speciality/',
  hospitalUrlPrefix: ServerURL + '/images/hospital/',
  oneSignalAppID: '59c80d9f-7824-4202-9ddb-83a4d779926e',
  oneSignalUserIDStorageKey: 'DeviceUserID',
  linkScheme: 'docitoo://',

  twilio: {
    SID: 'AC3efa3295efbd6bdcbf207788df32af3d',
    AUTH_TOKEN: '10686f02ffa7586cc483f992a714ddf9',
    VERIFICATION_SERVICE_SID: 'VA3aa9ccab43e8a8b11c5a47f2dedfc178'
  },

  googleSignIn: {
    androidClientId: '940405994956-3smnc8geto5vk0d6q20v4880lofk9o7i.apps.googleusercontent.com',
    iosClientId: '756867398063-hd39m6ruq0apfmoliudua8998vbq7s2l.apps.googleusercontent.com',
    webClient: {
      id: '273549588931-82uof57ltb69oqo0ob316pp1541la2ei.apps.googleusercontent.com',
      secret: 'uMIUD4VOWcT67sxFFItOt1-7',
    },
    scopes: [
      'profile',
      'email',
      // 'https://www.googleapis.com/auth/profile.agerange.read',
      // 'https://www.googleapis.com/auth/profile.language.read',
      // 'https://www.googleapis.com/auth/user.addresses.read',
      // 'https://www.googleapis.com/auth/user.birthday.read',
      // 'https://www.googleapis.com/auth/user.gender.read',
      // 'https://www.googleapis.com/auth/user.phonenumbers.read',
    ],
  },
  facebookLogin: {
    appId: '996548157529077',
    scopes: [
      'public_profile',
      'email',
      // 'user_address',
      // 'user_mobile_phone',
      // 'user_gender'
    ],
  },
  googleMap: {
    apiKey: 'AIzaSyASl1GnSrkVt9L2Zxu3tXRzPuOXdXgUAR4',
  },
};
