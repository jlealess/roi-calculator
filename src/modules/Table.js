import React from 'react';

const Table = (props) => (
    <table>
        <thead>
            <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">With Manual Process</th>
                <th scope="col">With Automated ERM Software</th>
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
                <th scope="row">Total Time (hours)</th>
                <td>{props.manualTotal}</td>
                <td>{props.resolverTotal}</td>
            </tr>
        </tbody>
    </table>    
);

export default Table;