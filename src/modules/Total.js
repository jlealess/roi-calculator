import React from "react";
import styled from "styled-components";

const StyledTotal = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  line-height: 1.3;

  .label {
    font-size: 18px;
  }

  .label,
  .value--num {
    font-weight: bold;
  }

  .value {
    align-items: center;
    display: flex;
  }

  .value--num {
    color: #7ac142;
    font-size: 24px;
  }

  .value--units {
    font-size: ${props => (props.secondary ? "15px" : "20px")};
  }
`;

const hoursToWeeks = hours => {
  return (parseInt(hours) / 40).toFixed(0);
};

const Total = ({ label, value }) => (
  <StyledTotal>
    <span className="label">
      {label}
    </span>
    <div className="value">
      <span className="value--num">
        {hoursToWeeks(value)}
      </span>
      <span className="value--units">
        {" "} Weeks
      </span>
    </div>
  </StyledTotal>
);

export default Total;
