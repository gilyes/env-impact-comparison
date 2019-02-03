/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_SELECTED_ELECTRIC_VEHICLE = 'env-impact-comparison/Home/CHANGE_SELECTED_ELECTRIC_VEHICLE';
export const CHANGE_SELECTED_ICE_VEHICLE = 'env-impact-comparison/Home/CHANGE_SELECTED_ICE_VEHICLE';
export const SET_DEFAULT_SELECTED_ELECTRIC_VEHICLE = 'env-impact-comparison/Home/SET_DEFAULT_SELECTED_ELECTRIC_VEHICLE';
export const SET_DEFAULT_SELECTED_ICE_VEHICLE = 'env-impact-comparison/Home/SET_DEFAULT_SELECTED_ICE_VEHICLE';
