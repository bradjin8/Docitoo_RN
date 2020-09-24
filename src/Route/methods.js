import React, {useState, useEffect} from 'react';
import {Screens} from '@/constants/Navigation';
import {useStores} from '@/hooks';

let initState = {};

function useViewModel() {
  const [isInitializing, setInitializing] = useState(true);
  const store = useStores();
  const tag = 'Route::';

  // On Component did mount
  useEffect(() => {
    const init = async function () {
      try {
        await store.initialize();
        console.log(tag, 'Store Initialized', store);
        // Setup appropriate route
        initState = getInitialState(store);
        console.log(tag, 'Initial State', initState)
      } catch (e) {
        console.log(tag, 'Error Occurred while initializing');
      } finally {
        setInitializing(false);
      }
    };
    // Call init
    // noinspection JSIgnoredPromiseFromCall
    init();
  }, []);

  return {
    isInitializing,
    initState,
    store,
  }
}

// Determine the initial screen from store
export function getInitialState(store) {
  const {user} = store;

  const _getRoutes = (screenNames) => {
    return {
      routes: screenNames.map((name) => ({name})),
    };
  };

  if (user.isValid) {
    return _getRoutes([Screens.home])
  }

  return _getRoutes([Screens.logIn])
}

export default useViewModel;
