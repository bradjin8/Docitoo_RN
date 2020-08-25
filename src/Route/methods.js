import React, {useState, useEffect} from 'react';
import {Screens} from '@/constants/Navigation';
import {useStores} from '@/hooks';

let initState = {};

function useViewModel() {
  const [isInitializing, setInitializing] = useState(true);
  const store = useStores();

  // On Component did mount
  useEffect(() => {
    const init = async function () {
      try {
        await store.initialize();
        console.log('Store Initialized', store);
        // Setup appropriate route
        initState = getInitialState(store);
      } catch (e) {
        console.log('Error Occurred while initializing');
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
    initState
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

  if (1 /*user.isValid*/) {
    return _getRoutes([Screens.home])
  }

  return _getRoutes([Screens.home])
}

export default useViewModel;
