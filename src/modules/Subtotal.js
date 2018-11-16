import React from "react";
import styled from "styled-components";

const StyledTotal = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.125em;
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
    align-items: baseline;
    display: flex;
  }

  .value--num {
    color: #7ac142;
    font-size: 24px;
  }

  .value--units {
    font-size: ${props => (props.primary ? "20px" : "15px")};
    padding-left: 5px;
  }

  @media (max-width: 500px) {
    flex-wrap: wrap;
    justify-content: ${props => (props.primary ? "space-between" : "center")};
    text-align: ${props => (props.primary ? "left" : "center")};

    .label {
      font-size: ${props => (props.primary ? "18px" : "16px")};
    }

    .value {
      padding-top: ${props => (props.primary ? "0" : "5px")};
    }
  }
`;

const hoursToWeeks = hours => {
    return (parseInt(hours) / 40).toFixed(0);
};

const Subtotal = ({ label, value, units: units = "hours saved per year", primary }) => (
    <StyledTotal primary={primary}>
        <span className="label">
            {label}
        </span>
        <div className="value">
            <span className="value--num">
                {units === "weeks" ? hoursToWeeks(value) : value}
            </span>
            <span className="value--units">
                {units}
            </span>
        </div>
    </StyledTotal>
);

export default Subtotal;
