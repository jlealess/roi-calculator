import React from 'react';
import styled from "styled-components";

const StyledTable = styled.table`
  margin: 25px -25px -25px;
  width: calc(100% + 50px);

  td,
  th {
    border: 1px solid #dfdfdf;
    padding: 15px;
  }

  tbody th {
    text-align: left;
    font-weight: 400;
  }

  thead th {
    border-left: none;
    border-right: none;
    font-weight: 700;
  }

  thead th,
  tbody td {
    text-align: center;
  }

  tbody th,
  thead th:first-of-type {
    border-left: none;
    padding-left: 25px;
  }

  tbody td:last-of-type,
  thead th:last-of-type {
    border-right: none;
    padding-right: 25px;
  }

  tr:last-of-type td,
  tr:last-of-type th {
    border-bottom: none;
  }

  tr:nth-of-type(even) {
    background-color: #f6f6f9;
  }

  tr.table-total td,
  tr.table-total th {
    font-weight: 700;
  }

  @media (max-width: 500px) {
    font-size: 14px;
    margin: 20px -20px -20px;
    width: calc(100% + 40px);

    td,
    th {
      padding: 10px;
    }

    tbody th,
    thead th:first-of-type {
      padding-left: 20px;
    }

    tbody td:last-of-type,
    thead th:last-of-type {
      padding-right: 20px;
    }
  }
`;

const Table = (props) => (
    <StyledTable>
        <thead>
            <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">With manual process</th>
                <th scope="col">With automated ERM software</th>
            </tr>
        </thead>
        <tbody>
            {props.rows.map(row => {
                return <tr>
                    <th scope="row">{row.rowLabel}</th>
                    <td>{row.manualValue}</td>
                    <td>{row.resolverValue}</td>
                </tr>
            })}
            <tr className="table-total">
                <th scope="row">Total time (hours)</th>
                <td>{props.manualTotal}</td>
                <td>{props.resolverTotal}</td>
            </tr>
        </tbody>
    </StyledTable>    
);

export default Table;