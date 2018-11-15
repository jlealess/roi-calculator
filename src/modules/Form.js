import React from 'react';
import NumInput from './NumInput';
import styled from 'styled-components';

const StyledForm = styled.form`
  font-size: 18px;
  font-weight: 700;
`; 

const Form = ({
    handleInputChange,
    input1value,
    input2value,
    input3value,
}) => (
  <div className="tsc-calc__form card">
    <StyledForm>
      <NumInput
        name="businessUnits"
        labelText="Number of business units/functions in the organization"
        handleInputChange={handleInputChange}
        value={input1value}
      />
      <NumInput
        name="riskControlOwners"
        labelText="Number of risk/control/issue owners"
        handleInputChange={handleInputChange}
        value={input2value}
      />
      <NumInput
        name="periodicAssessments"
        labelText="Number of periodic assessments per year"
        handleInputChange={handleInputChange}
        value={input3value}
      />
    </StyledForm>
  </div>
);

export default Form;