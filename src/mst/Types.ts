import {types} from 'mobx-state-tree';
import {isString} from 'lodash';
// import moment, {Moment} from 'moment';

export const defString = types.optional(types.string, '', [null, undefined]);
export const defNumber = types.optional(types.number, 0, [null, undefined]);
export const defObjString = types.optional(types.string, '{}', [null, undefined]);
export const PillReminder = types.model('PillReminder', {
    id: types.string,
    medicineName: types.string,
    dosage: types.string,
    frequency: types.string,
    timeToTake: types.number,
});
export const defPillReminders = types.array(PillReminder);
export default {
    defString,
    defNumber,
    defObjString,
    PillReminder,
    defPillReminders
};
