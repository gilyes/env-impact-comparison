/*
 * App Actions
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

export function loadElectricVehicles() {
  return {
    type: LOAD_ELECTRIC_VEHICLES
  }
}

export function electricVehiclesLoaded(vehicles) {
  return {
    type: LOAD_ELECTRIC_VEHICLES_SUCCESS,
    vehicles
  }
}

export function electricVehiclesLoadError(error) {
  return {
    type: LOAD_ELECTRIC_VEHICLES_ERROR,
    error
  }
}

export function loadIceVehicles() {
  return {
    type: LOAD_ICE_VEHICLES
  }
}

export function iceVehiclesLoaded(vehicles) {
  return {
    type: LOAD_ICE_VEHICLES_SUCCESS,
    vehicles
  }
}

export function iceVehiclesLoadError(error) {
  return {
    type: LOAD_ICE_VEHICLES_ERROR,
    error
  }
}

export function loadTNG() {
  return {
    type: LOAD_TNG
  }
}

export function tngLoaded(tng) {
  return {
    type: LOAD_TNG_SUCCESS,
    tng
  }
}

export function tngLoadError(error) {
  return {
    type: LOAD_TNG_ERROR,
    error
  }
}

export function loadConfig() {
  return {
    type: LOAD_CONFIG
  }
}

export function configLoaded(config) {
  return {
    type: LOAD_CONFIG_SUCCESS,
    config
  }
}

export function configLoadError(error) {
  return {
    type: LOAD_CONFIG_ERROR,
    error
  }
}
