import React from 'react';
import styled from "styled-components";

const StyledField = styled.div`
  display: flex;
  justify-content: space-between;
  input {
    -moz-appearance: textfield;
    -webkit-appearance: textfield;
    appearance: textfield;
    box-sizing: border-box;
    font-size: 1em;
    line-height: 1.25;
    text-align: right;
    width: 100px;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
`;

const handleKeypress = (e) => {
    if (e.which < 48 || e.which > 57) {
        e.preventDefault();
    }
}

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
      onKeyPress={handleKeypress}
      value={value}
      min="0"
      max="1000"
    />
  </StyledField>
);

export default NumInput;