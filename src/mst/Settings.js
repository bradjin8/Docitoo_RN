import {applySnapshot, flow, types} from "mobx-state-tree";
import {observable} from "mobx";
import {isEmpty} from 'lodash';
import {defNumber, defString} from './Types';
import 'mobx-react-lite/batchingForReactDom';

const tag = 'MST.Settings::';
let statusCode = 0;
const Settings = types
  .model('Settings', {
    lang: defString
  })
  .views((self) => ({
    get lang() {
      return self.lang;
    }
  }))
  .actions((self) => {
    const load = (snapshot) => {
      try {
        applySnapshot(self, snapshot);
      } catch (e) {
        console.log('Settings.actions.load(): Load from snapshot failed');
      }
    };

    const setLang = (lang) => {
      self.lang = lang;
    };

    return {load, setLang}
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
