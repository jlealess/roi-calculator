import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Form from './modules/Form';
import Subtotal from "./modules/Subtotal";
import Accordion from './modules/Accordion';
import { data } from './data';

const StyledApp = styled.div`
  font-family: "Nunito Sans", Arial, sans-serif;
  font-size: 15px;

  h2 {
    font-weight: 300;
    margin: 40px 0 20px;
  }

  .card {
    background-color: #fefefe;
    border: 1px solid #dae0e0;
    border-radius: 3px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    padding: 25px;
  }

  @media (max-width: 500px) {
    .card {
      padding: 20px;
    }
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      businessUnits: 15, 
      periodicAssessments: 4,
      riskControlOwners: 40, 
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  calculateAssumptionsTotal(planningHours, numAssessments) {
    return (parseInt(this.state.riskControlOwners) * parseInt(this.state.periodicAssessments * planningHours)) + parseInt(numAssessments);
  }

  calculateTotalReportsPerYear() {
    return data.numCriticalRiskReportsPerYear +
    data.numIssueReportsPerYear + (
      data.numQuarterlyReportsPerYear * this.state.businessUnits
    ) + data.numMonthlyReportsPerYear + data.numAdhocReportsPerYear
  }

  calculateMainTotal() {
    return parseInt(this.diffRiskOwnerTrainingTotals()) + parseInt(this.diffAssumptionsTotals()) + parseInt(this.diffReportingTotals());
  }

  calculateReportingTotal(hoursPerReport) {
    const TotalNumReportsPerYear = data.numCriticalRiskReportsPerYear + data.numIssueReportsPerYear + (data.numQuarterlyReportsPerYear * this.state.businessUnits) + data.numMonthlyReportsPerYear + data.numAdhocReportsPerYear;
    return parseInt(hoursPerReport * TotalNumReportsPerYear);
  }

  calculateRiskOwnerTrainingTotal(hoursPerAssessment) {
    return data.initialRiskTrainingSessionsPerYear + hoursPerAssessment * this.state.riskControlOwners * this.state.periodicAssessments;
  }

  diffAssumptionsTotals() {
    const diff = this.calculateAssumptionsTotal(data.planningHours.manual, data.numAssessments.manual) - this.calculateAssumptionsTotal(data.planningHours.resolver, data.numAssessments.resolver);
    return (diff > 0 ? diff : 0);
  }

  diffReportingTotals() {
    const diff = (this.calculateReportingTotal(data.hoursPerReport.manual) - this.calculateReportingTotal(data.hoursPerReport.resolver)).toFixed(0);
    return diff;
  }

  diffRiskOwnerTrainingTotals() {
    const diff = this.calculateRiskOwnerTrainingTotal(data.hoursPerAssessment.manual) - this.calculateRiskOwnerTrainingTotal(data.hoursPerAssessment.resolver);
    return diff;
  }

  handleInputChange(e) {
    if (e.target.type === "number") {
      e.target.value = Number(e.target.value);

      if (e.which < 48 || e.which > 57) {
        e.preventDefault();
      }

      e.target.value = (e.target.value.length > 5) ? e.target.value.substring(0, 5) : e.target.value;
    } 
    this.setState({
      [e.target.name]: e.target.value
    })    
  }

  render() {
    return <StyledApp>
      <section className="input">
          <h2>Input your company's details</h2>
          <Form handleInputChange={this.handleInputChange} input1value={this.state.businessUnits} input2value={this.state.riskControlOwners} input3value={this.state.periodicAssessments} />
          <div className="card">
            <Subtotal primary label="Total time saved" units="weeks" value={this.calculateMainTotal()} />
          </div>
      </section>
      <section className="output">
        <h2>How we calculate your time savings</h2>
        <Accordion
          cardHeadingLabel="Risk assessment planning & execution"
          cardHeadingValue={this.diffAssumptionsTotals()}
          rows={[
            {
              rowLabel: "Hours spent planning and executing each risk assessment",
              manualValue: data.planningHours.manual,
              resolverValue: data.planningHours.resolver
            },
            {
              rowLabel: "Number of risk assessments per year",
              manualValue: this.state.periodicAssessments,
              resolverValue: this.state.periodicAssessments
            },
            {
              rowLabel: "Number of risk/control/issue owners",
              manualValue: this.state.riskControlOwners,
              resolverValue: this.state.riskControlOwners
            },
            {
              rowLabel: "Hours spent building automated workflows in Resolver ERM application",
              manualValue: (data.numAssessments.manual ? data.numAssessments.manual : "n/a"),
              resolverValue: data.numAssessments.resolver
            }
          ]}
          manualTotal={this.calculateAssumptionsTotal(
            data.planningHours.manual,
            data.numAssessments.manual
          )}
          resolverTotal={this.calculateAssumptionsTotal(
            data.planningHours.resolver,
            data.numAssessments.resolver
          )}
        />
        <Accordion
          rows={[
            {
              rowLabel: "Initial risk and control owner training (group setting, one session/year)",
              manualValue: data.initialRiskTrainingSessionsPerYear,
              resolverValue: data.initialRiskTrainingSessionsPerYear,
            },
            {
              rowLabel: "Hours spent supporting each risk owners per risk assessment",
              manualValue: data.hoursPerAssessment.manual,
              resolverValue: data.hoursPerAssessment.resolver
            },
            {
              rowLabel: "Number of risk/control/issue owners",
              manualValue: this.state.riskControlOwners,
              resolverValue: this.state.riskControlOwners
            },
            {
              rowLabel: "Number of periodic assessments per year",
              manualValue: this.state.periodicAssessments,
              resolverValue: this.state.periodicAssessments
            }

          ]}
          cardHeadingLabel="Initial and ongoing risk owner training"
          cardHeadingValue={this.diffRiskOwnerTrainingTotals()}
          manualTotal={this.calculateRiskOwnerTrainingTotal(
            data.hoursPerAssessment.manual)}
          resolverTotal={this.calculateRiskOwnerTrainingTotal(
            data.hoursPerAssessment.resolver)}
        />
        <Accordion
          cardHeadingLabel="Data aggregation, analysis and reporting"
          cardHeadingValue={this.diffReportingTotals()}
          rows={[
            {
              rowLabel: "Number of critical risk reports per year",
              manualValue: data.numCriticalRiskReportsPerYear,
              resolverValue: data.numCriticalRiskReportsPerYear
            },
            {
              rowLabel: "Number of issue reports per year",
              manualValue: data.numIssueReportsPerYear,
              resolverValue: data.numIssueReportsPerYear
            },
            {
              rowLabel: "Number of quarterly reports (quarterly report per business unit per year",
              manualValue: data.numQuarterlyReportsPerYear,
              resolverValue: data.numQuarterlyReportsPerYear
            },
            {
              rowLabel: "Number of monthly reports per year",
              manualValue: data.numMonthlyReportsPerYear,
              resolverValue: data.numMonthlyReportsPerYear
            },
            {
              rowLabel: "Number of ad-hoc reports per year (i.e. emerging risks, loss event analysis, root cause analysis, etc.)",
              manualValue: data.numAdhocReportsPerYear,
              resolverValue: data.numAdhocReportsPerYear
            },
            {
              rowLabel: "Number of business units/functions in the organization",
              manualValue: this.state.businessUnits,
              resolverValue: this.state.businessUnits
            },
            {
              rowLabel: "Total number of reports per year",
              manualValue: this.calculateTotalReportsPerYear(),
              resolverValue: this.calculateTotalReportsPerYear()
            },
            {
              rowLabel: "Approx. number of hours spent on each report",
              manualValue: data.hoursPerReport.manual,
              resolverValue: data.hoursPerReport.resolver
            }
          ]}
          manualTotal={this.calculateReportingTotal(data.hoursPerReport.manual)}
          resolverTotal={this.calculateReportingTotal(data.hoursPerReport.resolver)}
        />      
        </section>
    </StyledApp>;
  }
}

export default App;
