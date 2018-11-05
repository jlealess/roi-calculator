import React from "react";
import styled from "styled-components";


const StyledTotal = styled.div`
  display: flex;
  font-weight: bold;
  border-top: 1px solid black;
  font-size: 1.125em;
  justify-content: space-between;
  line-height: 2.5;
  margin-top: 5px;
`;

const hoursToWeeks = hours => {
  return (parseInt(hours) / 40).toFixed(0);
};

const Total = ({ label, value }) => (
  <StyledTotal>
    <span>
      {label}
    </span>
    <span>
      {hoursToWeeks(value)} weeks ({value} hours)
    </span>
  </StyledTotal>
);

export default Total;
