/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import Route from '@/Route';
import StoreProvider from '@/mst/StoreProvider';


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <StoreProvider>
        <Route />
      </StoreProvider>
    </>
  );
};


export default App;
