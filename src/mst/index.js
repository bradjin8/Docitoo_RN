// Just create with empty information at first, and later load from async storage
import * as Storage from '@/utils/AsyncStorage';
import {onSnapshot} from 'mobx-state-tree';
import Store from './Store';
import {toJS} from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";

const store = Store.create({
  user: {},
  data: {},
  d_data: {},
});

const storageKey = 'auth';

// Initialize from store, just return the promise.
store.initialize = async function () {
  return Storage.getObject(storageKey).then((snapshot) => {
    console.log('store.initialize() - Snapshot loaded', snapshot);
    // load from snapshot
    let language = AsyncStorage.getItem("LANG");
    store.user.load(snapshot);
    if (!user.isValid) {
      user.changeLanguage(language);
    }
    // store.settings.load(snapshot);
    console.log('after loading', snapshot)
  })
};

// Write update to storage when something changed on store
export function scheduleWrite2Storage() {
  if (store._saveTimeoutHandler) {
    clearTimeout(store._saveTimeoutHandler);
  }

  // Save to local storage
  store._saveTimeoutHandler = setTimeout(() => {
    try {
      const snap = toJS(store.user);
      console.log(
        'scheduleWrite2Storage(): Saving user data to local storage',
        snap
      );
      Storage.putObject(storageKey, snap)
    } catch (e) {
      console.log('scheduleWrite2Storage():', e);
    }
  }, 300)
}

// When store.user changes, the just schedule write to storage
onSnapshot(store.user, ()=> {
  console.log('User changed, so it should be saved');
  scheduleWrite2Storage();
});

// export created store
export default store;
