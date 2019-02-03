/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_ELECTRIC_VEHICLES,
  LOAD_ELECTRIC_VEHICLES_SUCCESS,
  LOAD_ELECTRIC_VEHICLES_ERROR,
  LOAD_ICE_VEHICLES,
  LOAD_ICE_VEHICLES_SUCCESS,
  LOAD_ICE_VEHICLES_ERROR,
  LOAD_TNG,
  LOAD_TNG_SUCCESS,
  LOAD_TNG_ERROR,
  LOAD_CONFIG,
  LOAD_CONFIG_SUCCESS,
  LOAD_CONFIG_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  data: {
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ELECTRIC_VEHICLES:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['data', 'electricVehicles'], []);

    case LOAD_ELECTRIC_VEHICLES_SUCCESS:
      return state
        .setIn(['data', 'electricVehicles'], action.vehicles)
        .set('loading', false);

    case LOAD_ELECTRIC_VEHICLES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);

    case LOAD_ICE_VEHICLES:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['data', 'iceVehicles'], []);

    case LOAD_ICE_VEHICLES_SUCCESS:
      return state
        .setIn(['data', 'iceVehicles'], action.vehicles)
        .set('loading', false);

    case LOAD_ICE_VEHICLES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);

    case LOAD_TNG:
      return state
        .set('loading', true)
        .set('error', false);

    case LOAD_TNG_SUCCESS:
      return state
        .setIn(['data', 'tng'], action.tng)
        .set('loading', false);

    case LOAD_TNG_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);

    case LOAD_CONFIG:
      return state
        .set('loading', true)
        .set('error', false);

    case LOAD_CONFIG_SUCCESS:
      return state
        .setIn(['data', 'config'], action.config)
        .set('loading', false);

    case LOAD_CONFIG_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);

    default:
      return state;
  }
}

export default appReducer;
