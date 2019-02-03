/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS, toJS } from 'immutable';

import { CHANGE_SELECTED_ELECTRIC_VEHICLE, CHANGE_SELECTED_ICE_VEHICLE, SET_DEFAULT_SELECTED_ELECTRIC_VEHICLE, SET_DEFAULT_SELECTED_ICE_VEHICLE } from './constants';

// The initial state of the App
const initialState = fromJS({
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SELECTED_ELECTRIC_VEHICLE:
      return state.set('selectedElectricVehicle', fromJS(action.vehicle));

    case CHANGE_SELECTED_ICE_VEHICLE:
      return state.set('selectedIceVehicle', fromJS(action.vehicle));

    case SET_DEFAULT_SELECTED_ELECTRIC_VEHICLE:
      if (action.vehicle && !state.get('selectedElectricVehicle')) {
        return state.set('selectedElectricVehicle', fromJS(action.vehicle));
      }
      return state;

    case SET_DEFAULT_SELECTED_ICE_VEHICLE:
      if (action.vehicle && !state.get('selectedIceVehicle')) {
        return state.set('selectedIceVehicle', fromJS(action.vehicle));
      }
      return state;

    default:
      return state;
  }
}

export default homeReducer;
