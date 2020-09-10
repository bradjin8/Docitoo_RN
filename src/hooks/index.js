import React from 'react';
import {StoreContext} from '@/mst/StoreProvider';
import {DoctorStackScreens} from "@/constants/Navigation";
import {CommanActions} from '@react-navigation/native';

export const useStores = () => React.useContext(StoreContext);

export const useGotoMain = (nav) => {
  return () => {
    return () => {
      nav.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: DoctorStackScreens.doctorsByCategory}],
        }),
      );
    };
  }
};
