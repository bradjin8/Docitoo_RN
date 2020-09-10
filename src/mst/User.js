import {applySnapshot, flow, types} from "mobx-state-tree";
import {observable} from "mobx";
import {isEmpty} from 'lodash';
import {defNumber, defString} from './Types';
import 'mobx-react-lite/batchingForReactDom';
import * as Api from '@/Services/Api';

// import * as Api from '@services/Api';

const tag = 'MST.User::';
let statusCode = 0;
const User = types
  .model('User', {
    sessionToken: defString,
    id: defString,
    email: defString,
    fullName: defString,
    gender: defString,
    avatarUrl: defString,
    phoneNumber: defString,
    city: defString,
    street: defString,
    language: defString,
    bloodType: defString,
    accountType: defString,
    hadSignedUp: false,
    statusCode: 0,
    createdAt: defString,
  })
  .views((self) => ({
    get isValid() {
      return !isEmpty(self.id) && !isEmpty(self.sessionToken)
    },
    get getStatusCode() {
      return self.statusCode;
    },
  }))
  .actions((self) => {
    const _updateFromLoginResponse = (data) => {
      // Copy data to store
      const {userDetails, sessionToken} = data;
      self.sessionToken = sessionToken;
      if (userDetails) {
        self.id = userDetails.id;
        self.fullName = userDetails.fullName;
        self.gender = userDetails.gender;
        self.email = userDetails.email;
        self.phoneNumber = userDetails.phoneNumber;
        self.avatarUrl = userDetails.avatarUrl;
        self.bloodType = userDetails.bloodType;
        self.language = userDetails.language;
        self.city = userDetails.city;
        self.street = userDetails.street;
        self.createdAt = userDetails.createdAt;
      }
    };

    const logIn = flow(function* logIn(email, password) {
      self.setLoggingIn(true);
      try {
        const response = yield Api.logIn(email, password);
        console.log(tag, 'Response from Login', response);
        const {data, ok} = response;
        self.setLoggingIn(false);
        if (!ok) {
          return;
        }
        _updateFromLoginResponse(data);
      } catch (e) {
        console.log(tag, 'Login Filed --', e.message)
      } finally {
        self.setLoggingIn(false);
      }
    });

    const logOut = flow(function* logOut() {
      try {
        const response = yield Api.logOut(self.sessionToken);
        console.log(tag, 'Response from Logout', response)
      } catch (e) {

      }

      // Just simply apply snapshot of empty object
      applySnapshot(self, {
        hadSignedUp: true,
      });
    });

    const signUp = flow(function* signUp(email, fullName, password, phoneNumber = "") {
      if (self.isValid) {
        yield logOut()
      }

      self.setLoggingIn(true);
      try {
        const response = yield Api.register(email, fullName, password, phoneNumber);
        console.log(tag, 'Response from SignUp', response);
        const {data, ok} = response;
        self.setLoggingIn(false);
        if (!ok) {
          self.statusCode = response.status;
          return;
        }
        _updateFromLoginResponse(data);
      } catch (e) {
        console.log(tag, 'SignUp Failed --', e.message);
      } finally {
        self.setLoggingIn(false);
      }
    });

    const updateProfile = flow(function* updateProfile(
      avatarSource,
      gender,
      bloodType,
      fullName,
      email,
      phoneNumber,
      language,
      password
    ) {

      self.setLoggingIn(true);
      try {
        const response = yield Api.updateProfile(fullName, email, phoneNumber, password, gender, bloodType, language, avatarSource);
        console.log(tag, 'Response from updateProfile', response);
        const {data, ok} = response;
        self.setLoggingIn(false);
        if (!ok) {
          self.statusCode = response.status;
          return;
        }
        _updateFromLoginResponse(data);
      } catch (e) {
        console.log(tag, 'UpdateProfile Failed --', e.message);
      } finally {
        self.setLoggingIn(false);
      }

    });

    const load = (snapshot) => {
      try {
        applySnapshot(self, snapshot);
      } catch (e) {
        console.log('User.actions.load(): Load from snapshot failed');
      }
    };

    return {logIn, logOut, signUp, load}
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

export default User;
