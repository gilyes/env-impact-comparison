import React from 'react';
import { reduxForm, Field } from 'redux-form/immutable';

const CostComparisonForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <span className="cost-comparison-header">
        Annual Cost Comparison
      </span>
      <div className="cost-comparison-inputs">
        <label htmlFor='annual-distance-driven'>Annual distance driven (km):</label>
        <Field name='annualDistanceDriven' id='annual-distance-driven' component='input' type='text' />

        <label htmlFor='fuel-cost'>Fuel cost ($/L):</label>
        <Field name='fuelCost' id='fuel-cost' component='input' type='text' />

        <label htmlFor='electricity-rate'>Electricity rate (¢/kWh)</label>
        <Field name='electricityRate' id='electricity-rate' component='input' type='text' />
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'costComparisonForm',
  enableReinitialize: true
})(CostComparisonForm);
