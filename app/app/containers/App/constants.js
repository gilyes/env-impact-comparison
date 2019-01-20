/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_ELECTRIC_VEHICLES = 'env-impact-comparison/App/LOAD_ELECTRIC_VEHICLES';
export const LOAD_ELECTRIC_VEHICLES_SUCCESS = 'env-impact-comparison/App/LOAD_ELECTRIC_VEHICLES_SUCCESS';
export const LOAD_ELECTRIC_VEHICLES_ERROR = 'env-impact-comparison/App/LOAD_ELECTRIC_VEHICLES_ERROR';
export const LOAD_ICE_VEHICLES = 'env-impact-comparison/App/LOAD_ICE_VEHICLES';
export const LOAD_ICE_VEHICLES_SUCCESS = 'env-impact-comparison/App/LOAD_ICE_VEHICLES_SUCCESS';
export const LOAD_ICE_VEHICLES_ERROR = 'env-impact-comparison/App/LOAD_ICE_VEHICLES_ERROR';
export const LOAD_TNG = 'env-impact-comparison/App/LOAD_TNG';
export const LOAD_TNG_SUCCESS = 'env-impact-comparison/App/LOAD_TNG_SUCCESS';
export const LOAD_TNG_ERROR = 'env-impact-comparison/App/LOAD_TNG_ERROR';
export const DEFAULT_LOCALE = 'en';
