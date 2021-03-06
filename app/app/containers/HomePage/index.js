import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  createLoadingSelector, createErrorSelector, createElectricVehicleSelector, createIceVehicleSelector,
  createTNGForDisplaySelector, createConfigSelector, createProvincesSelector
} from 'containers/App/selectors';
import { loadElectricVehicles, loadIceVehicles, loadTNG, loadConfig } from '../App/actions';
import { changeSelectedElectricVehicle, changeSelectedIceVehicle, changeSelectedProvince } from './actions';
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
  createDefaultIceVehicleSelector,
  createExplanationTextSelector,
  createSelectedProvinceSelector,
  createDefaultSelectedProvinceSelector,
} from './selectors';
import reducer from './reducer';
import { electricVehiclesSaga, iceVehiclesSaga, tngSaga, configSaga } from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onInitialLoad: () => {
    dispatch(loadElectricVehicles());
    dispatch(loadIceVehicles());
    // NOTE: loadConfig also triggers a loadTNG
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
  },
  onSelectedProvinceChanged: (province) => {
    dispatch(changeSelectedProvince(province))
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
  explanationText: createExplanationTextSelector(),
  provinces: createProvincesSelector(),
  selectedProvince: createSelectedProvinceSelector(),
  defaultSelectedProvince: createDefaultSelectedProvinceSelector(),
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
