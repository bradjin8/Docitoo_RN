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
export const Review = types.model('Review', {
    author: defString,
    doctor: defString,
    rating: defNumber,
    description: defString,
});
export const Hospital = types.model('Hospital', {
    name: defString,
    location: defString,
    description: defString,
    images: types.array(defString)
});
export const AvailableTime = types.model('AvailableTime', {
    from: defNumber,
    to: defNumber,
});
export const ReviewOverview = types.model('ReviewOverview', {
    reviewCount: defNumber,
    averageRating: defNumber
});
export const Doctor = types.model('Doctor', {
    id: defString,
    fullName: defString,
    avatarUrl: defString,
    email: defString,
    phoneNumber: defString,
    street: defString,
    city: defString,
    country: defString,
    speciality: defString,
    // reviewOverview: ReviewOverview,
    hospital: Hospital,
    reviews: types.array(Review),
    availableTime: AvailableTime,
});
export const defPillReminders = types.array(PillReminder);
export default {
    defString,
    defNumber,
    defObjString,
    PillReminder,
    defPillReminders,
    Doctor,
};
