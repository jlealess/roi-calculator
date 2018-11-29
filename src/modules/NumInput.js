import React from 'react';
import styled from "styled-components";

const StyledField = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;

  &:last-of-type {
    margin-bottom: 0;
  }

  @supports (display: grid) {
    grid-template-columns: 1fr 100px;
  }

  input {
    -moz-appearance: textfield;
    -webkit-appearance: textfield;
    appearance: textfield;
    border: 1px solid #cccccc;
    border-radius: 3px;
    box-sizing: border-box;
    color: #757575;
    font-weight: 300;
    font-size: 1em;
    height: 45px;
    line-height: 1.25;
    margin-left: 20px;
    max-width: 90px;
    padding: 0 8px;
    text-align: center;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
`;

const NumInput = ({ handleInputChange, labelText, name, value }) => (
  <StyledField>
    <label htmlFor={name} className="form__label">
      {labelText}
    </label>
    <input
      type="number"
      name={name}
      id={name}
      onChange={handleInputChange}
      value={value}
      min="0"
      max="99999"
    />
  </StyledField>
);

export default NumInput;