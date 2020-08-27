import {applySnapshot, flow, types} from "mobx-state-tree";
import {observable} from "mobx";
import {isEmpty} from 'lodash';
import {defNumber, defString, defObjString} from './Types';
import 'mobx-react-lite/batchingForReactDom';

const tag = 'MST.Settings::';
let statusCode = 0;
const Settings = types
  .model( 'Settings', {
    lang: defString,
    doctor: defNumber,
  })
  .views((self) => ({
    get lang() {
      return self.lang;
    },
    get getDoctor() {
      return self.doctor;
    },

  }))
  .actions((self) => {
    const load = (snapshot) => {
      try {
        self.doctor = 1;
        applySnapshot(self, snapshot);
      } catch (e) {
        console.log('Settings.actions.load(): Load from snapshot failed');
      }
    };

    const updateDoctor = (json) => {
      self.doctor = 1;
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

export default Settings;
