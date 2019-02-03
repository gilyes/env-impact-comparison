/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { CHANGE_SELECTED_ICE_VEHICLE, CHANGE_SELECTED_ELECTRIC_VEHICLE, SET_DEFAULT_SELECTED_ELECTRIC_VEHICLE, SET_DEFAULT_SELECTED_ICE_VEHICLE } from './constants';

export function changeSelectedElectricVehicle(vehicle) {
  return {
    type: CHANGE_SELECTED_ELECTRIC_VEHICLE,
    vehicle
  };
}

export function changeSelectedIceVehicle(vehicle) {
  return {
    type: CHANGE_SELECTED_ICE_VEHICLE,
    vehicle
  };
}

export function setDefaultSelectedElectricVehicle(vehicle) {
  return {
    type: SET_DEFAULT_SELECTED_ELECTRIC_VEHICLE,
    vehicle
  };
}

export function setDefaultSelectedIceVehicle(vehicle) {
  return {
    type: SET_DEFAULT_SELECTED_ICE_VEHICLE,
    vehicle
  };
}
