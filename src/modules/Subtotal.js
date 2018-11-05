import React from 'react';
import styled from 'styled-components';

const StyledTotal = styled.div`
    display: flex;
    justify-content: space-between;
    line-height: 1.75;
`;


const Subtotal = ({ label, value }) => (
    <StyledTotal>
        <span>{label}</span>
        <span>
            {value} hours
        </span> 
    </StyledTotal>
);

export default Subtotal;