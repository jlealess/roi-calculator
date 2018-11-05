import React from 'react';
import TableRow from './TableRow';

class Table extends React.Component {   

    render () {
        const { assumptionsTotalManual, inputBusinessUnits, inputRiskControlOwners, inputPeriodicAssessments } = this.props;

        return <div class="tsc-calc__table">
            <table class="table">
                <thead>
                    <TableRow>
                        <th scope="column">Risk Assessment Planning & Execution</th>
                        <th scope="column">With Manual Process</th>
                        <th scope="column">With Automated ERM Software</th>
                    </TableRow>
                </thead>
                <tbody>
                    <TableRow>
                        <th class="row">
                            Hours Spent Planning and Executing Each Risk Assessment
          </th>
                        <td>1</td>
                        <td>0</td>
                    </TableRow>
                    <TableRow>
                        <th class="row">Number of Risk Assessments per year</th>
                        <td>{inputPeriodicAssessments ? inputPeriodicAssessments : "–"}</td>
                        <td>4</td>
                    </TableRow>
                    <TableRow>
                        <th class="row">Number of Risk/Control/Issue Owners</th>
                        <td>{inputRiskControlOwners ? inputRiskControlOwners : "–"}</td>
                        <td>{inputRiskControlOwners ? inputRiskControlOwners : "–"}</td>
                    </TableRow>
                    <TableRow>
                        <th class="row">
                            Hours spent building automated workflows in Resolver ERM application
          </th>
                        <td>n/a</td>
                        <td>4</td>
                    </TableRow>
                    <TableRow>
                        <th class="row">Total time (hours)</th>
                        <td>{assumptionsTotalManual() ? assumptionsTotalManual() : "–"}</td>
                        <td>{(inputRiskControlOwners * inputPeriodicAssessments * 0) + 4}</td>
                    </TableRow>
                </tbody>
            </table>
        </div>

    }
};

export default Table;