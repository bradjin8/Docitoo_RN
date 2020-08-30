/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar, SafeAreaView, StyleSheet
} from 'react-native';
import Route from '@/Route';
import StoreProvider from '@/mst/StoreProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      {/*<SafeAreaView style={styles.container}>*/}
        <StoreProvider>
          <Route/>
        </StoreProvider>
      {/*</SafeAreaView>*/}
    </>
  );
};


export default App;
