import {applySnapshot, flow, types} from "mobx-state-tree";
import {observable} from "mobx";
import {isEmpty} from 'lodash';
import {defNumber, defString} from './Types';
import 'mobx-react-lite/batchingForReactDom';

// import * as Api from '@services/Api';

const tag = 'MST.User::';
let statusCode = 0;
const User = types
  .model('User', {
    id: 0,
    email: defString,
    fullName: defString,
    token: defString,
    profilePicture: defString,
    hadSignedUp: false,
    statusCode: 0,
    doctor: defString,
  })
  .views((self) => ({
    get isValid() {
      return self.id > 0 && !isEmpty(self.token)
    },
    get getStatusCode() {
      return self.statusCode;
    },
    get getDoctor(){
      return self.doctor;
    }
  }))
  .actions((self) => {
    const load = (snapshot) => {
      try {
        applySnapshot(self, snapshot);
      } catch (e) {
        console.log('User.actions.load(): Load from snapshot failed');
      }
    };

    const updateDoctor = (v) => {
      self.doctor = v;
    };
    return {load, updateDoctor}
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
