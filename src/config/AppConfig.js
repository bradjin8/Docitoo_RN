export default {
  // apiBaseUrl: 'https://docitoo.herokuapp.com/api/',
  // apiBaseUrl: 'http://127.0.0.1:3000/api/',
  apiBaseUrl: 'http://192.168.101.92:3000/api/',
  oneSignalAppID: '59c80d9f-7824-4202-9ddb-83a4d779926e',

  googleSignIn: {
    androidClientId: '756867398063-p47pmev7i6it18d9f9pd45givnasidch.apps.googleusercontent.com',
    iosClientId: '756867398063-hd39m6ruq0apfmoliudua8998vbq7s2l.apps.googleusercontent.com',
    webClient: {
      id: '273549588931-82uof57ltb69oqo0ob316pp1541la2ei.apps.googleusercontent.com',
      secret: 'uMIUD4VOWcT67sxFFItOt1-7'
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
    ]
  }
};
