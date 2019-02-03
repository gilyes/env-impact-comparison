import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createLoadingSelector, createErrorSelector, createElectricVehicleSelector, createIceVehicleSelector, createTNGForDisplaySelector } from 'containers/App/selectors';
import { loadElectricVehicles, loadIceVehicles, loadTNG, loadConfig } from '../App/actions';
import { changeSelectedElectricVehicle, changeSelectedIceVehicle } from './actions';
import {
  createSelectedElectricVehicleSelector,
  createSelectedIceVehicleSelector,
  createElectricVehicleCarbonEquivalentEmittedSelector,
  createElectricVehicleEfficiencySelector,
  createElectricVehicleGHGSelector,
  createIceVehicleCarbonEquivalentEmittedSelector,
  createIceVehicleEfficiencySelector,
  selectAnnualDistanceDriven,
  selectFuelCost,
  selectElectricityRate,
  createElectricVehicleAnnualCostSelector,
  createIceVehicleAnnualCostSelector,
  createDefaultElectricVehicleSelector,
  createDefaultIceVehicleSelector
} from './selectors';
import reducer from './reducer';
import { electricVehiclesSaga, iceVehiclesSaga, tngSaga, configSaga } from './saga';
import HomePage from './HomePage';
import { createConfigSelector } from '../App/selectors';

const mapDispatchToProps = (dispatch) => ({
  onInitialLoad: () => {
    dispatch(loadTNG());
    dispatch(loadElectricVehicles());
    dispatch(loadIceVehicles());
    dispatch(loadConfig());
  },
  onSelectedElectricVehicleChanged: (vehicle) => {
    dispatch(changeSelectedElectricVehicle(vehicle));
  },
  onSelectedIceVehicleChanged: (vehicle) => {
    dispatch(changeSelectedIceVehicle(vehicle));
  },
  onReloadTNGRequested: () => {
    dispatch(loadTNG());
  }
});

const mapStateToProps = createStructuredSelector({
  loading: createLoadingSelector(),
  electricVehicles: createElectricVehicleSelector(),
  iceVehicles: createIceVehicleSelector(),
  selectedElectricVehicle: createSelectedElectricVehicleSelector(),
  selectedIceVehicle: createSelectedIceVehicleSelector(),
  defaultElectricVehicle: createDefaultElectricVehicleSelector(),
  defaultIceVehicle: createDefaultIceVehicleSelector(),
  selectedElectricVehicleCarbonEquivalentEmitted: createElectricVehicleCarbonEquivalentEmittedSelector(),
  selectedElectricVehicleEfficiency: createElectricVehicleEfficiencySelector(),
  selectedElectricVehicleGHG: createElectricVehicleGHGSelector(),
  selectedIceVehicleCarbonEquivalentEmitted: createIceVehicleCarbonEquivalentEmittedSelector(),
  selectedIceVehicleEfficiency: createIceVehicleEfficiencySelector(),
  tng: createTNGForDisplaySelector(),
  annualDistanceDriven: selectAnnualDistanceDriven,
  fuelCost: selectFuelCost,
  electricityRate: selectElectricityRate,
  electricVehicleAnnualCost: createElectricVehicleAnnualCostSelector(),
  iceVehicleAnnualCost: createIceVehicleAnnualCostSelector(),
  config: createConfigSelector(),
  error: createErrorSelector(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withElectricVehiclesSaga = injectSaga({ key: 'home_ev', saga: electricVehiclesSaga });
const withIceVehiclesSaga = injectSaga({ key: 'home_ice', saga: iceVehiclesSaga });
const withTNGSaga = injectSaga({ key: 'home_tng', saga: tngSaga });
const withConfigSaga = injectSaga({ key: 'home_config', saga: configSaga });

export default compose(withReducer, withElectricVehiclesSaga, withIceVehiclesSaga, withTNGSaga, withConfigSaga, withConnect)(HomePage);
export { mapDispatchToProps };
