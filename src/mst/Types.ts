import {types} from 'mobx-state-tree';
import {isString} from 'lodash';
// import moment, {Moment} from 'moment';

export const defString = types.optional(types.string, '', [null, undefined]);
export const defNumber = types.optional(types.number, 0, [null, undefined]);
export const defObjString = types.optional(types.string, '{}', [null, undefined]);

export default {
    defString,
    defNumber,
    defObjString,
};
