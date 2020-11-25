import en from './en';
import kd from './kd';
import ar from './ar';

import React, {useState} from "react";
import {useStores} from '@/hooks';
import AsyncStorage from '@react-native-community/async-storage';

function __(key) {
  let source = en;
  const {user} = useStores();

  const {language} = user;
  if (language.toLowerCase() === 'kurdish') {
    source = kd;
  } else if (language.toLowerCase() === 'arabic') {
    source = ar;
  }

  return source[key] || key;
}

export default __;
