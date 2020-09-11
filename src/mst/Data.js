import {applySnapshot, flow, types} from "mobx-state-tree";
import {observable} from "mobx";
import {isEmpty} from 'lodash';
import {defNumber, defString, defObjString, defPillReminders, PillReminder} from './Types';
import 'mobx-react-lite/batchingForReactDom';
import * as Api from '@/Services/Api';
import {Alert} from "react-native";

const tag = 'MST.Data';
let statusCode = 0;
const Data = types
  .model( 'Data', {
    // doctors: types.frozen,
    pillReminders: types.array(PillReminder),
  })
  .views((self) => ({

    // get getDoctors() {
    //   return self.doctors;
    // },
    get getPills() {
      return self.pillReminders;
    }
  }))
  .actions((self) => {
    const _updatePillReminders = (data) => {
      self.pillReminders = data.pillReminders;
    };

    const getPillReminders = flow(function* updatePillReminders(
      userToken
    ) {
      try {
        const response = yield Api.getPillReminders(userToken);
        const {ok, data} = response;
        console.log(tag, 'Response from GetPillReminders API', data);
        if (!ok) {
          Alert.alert(
            "Error",
            "Getting Failed, try again",
            [
              {
                text: 'OK',
                onPress: () => console.log(tag, 'onPressAdd', 'OK pressed')
              }
            ],
            {cancelable: false}
          );
          return;
        }
        _updatePillReminders(data);

      } catch (e) {

      }
    });

    const addPillReminder = flow(function* addPillReminder(
      userToken,
      medicineName,
      dosage,
      frequency,
      timeToTake
    ) {
      try {
        const response = yield Api.addPillReminder(userToken, medicineName, dosage, frequency, timeToTake);
        const {ok, data} = response;
        console.log(tag, 'Response from AddPillReminder API', data);
        if (!ok) {
          Alert.alert(
            "Error",
            "Adding Failed, try again",
            [
              {
                text: 'OK',
                onPress: () => console.log(tag, 'onPressAdd', 'OK pressed')
              }
            ],
            {cancelable: false}
          );
          return;
        }
        yield getPillReminders(userToken);
      } catch (e) {
        console.log(tag, 'Adding Pill Exception', e.message)
      }
    });

    return {getPillReminders, addPillReminder}
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

export default Data;
