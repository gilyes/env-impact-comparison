import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createLoadingSelector, createErrorSelector, createElectricVehicleSelector, createIceVehicleSelector, createTNGForDisplaySelector } from 'containers/App/selectors';
import { loadElectricVehicles, loadIceVehicles, loadTNG } from '../App/actions';
import { changeSelectedElectricVehicle, changeSelectedIceVehicle } from './actions';
import {
  createSelectedElectricVehicleSelector,
  createSelectedIceVehicleSelector,
  createElectricVehicleCarbonEquivalentEmittedSelector,
  createElectricVehicleFuelConsumptionSelector,
  createIceVehicleCarbonEquivalentEmittedSelector,
  createIceVehicleFuelConsumptionSelector,
} from './selectors';
import reducer from './reducer';
import { electricVehiclesSaga, iceVehiclesSaga, tngSaga } from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onInitialLoad: () => {
    dispatch(loadTNG());
    dispatch(loadElectricVehicles());
    dispatch(loadIceVehicles());
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
  selectedElectricVehicleCarbonEquivalentEmitted: createElectricVehicleCarbonEquivalentEmittedSelector(),
  selectedElectricVehicleFuelConsumption: createElectricVehicleFuelConsumptionSelector(),
  selectedIceVehicleCarbonEquivalentEmitted: createIceVehicleCarbonEquivalentEmittedSelector(),
  selectedIceVehicleFuelConsumption: createIceVehicleFuelConsumptionSelector(),
  tng: createTNGForDisplaySelector(),
  error: createErrorSelector(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withElectricVehiclesSaga = injectSaga({ key: 'home_ev', saga: electricVehiclesSaga });
const withIceVehiclesSaga = injectSaga({ key: 'home_ice', saga: iceVehiclesSaga });
const withTNGSaga = injectSaga({ key: 'home_tng', saga: tngSaga });

export default compose(withReducer, withElectricVehiclesSaga, withIceVehiclesSaga, withTNGSaga, withConnect)(HomePage);
export { mapDispatchToProps };
