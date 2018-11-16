import React, { Component } from 'react';
import './App.css';
import Form from './modules/Form';
import Subtotal from "./modules/Subtotal";
import Accordion from './modules/Accordion';
import { data } from './data';

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
      e.target.value = parseInt(e.target.value, 10);
    }
    this.setState({
      [e.target.name]: e.target.value,
    })    
  }

  render() {
    return <div className="App">
        <div>
          <h2>Input your company's details</h2>
          <Form handleInputChange={this.handleInputChange} input1value={this.state.businessUnits} input2value={this.state.riskControlOwners} input3value={this.state.periodicAssessments} />

          <div className="card">
            <Subtotal primary label="Total time saved" units="weeks" value={this.calculateMainTotal()} />
          </div>
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
                rowLabel: "Initial risk and control owner training (group setting, one session / year)",
                manualValue: data.initialRiskTrainingSessionsPerYear,
                resolverValue: data.initialRiskTrainingSessionsPerYear,
              },
              {
                  rowLabel: "Hours spent supporting each risk owners per risk assessment",
                  manualValue: data.hoursPerAssessment.manual,
                  resolverValue: data.hoursPerAssessment.resolver
              },
              {
                rowLabel: "Number of risk / control / issue owners",
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
            cardHeadingLabel="Data aggregation, analysis & reporting" 
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
                rowLabel: "Number of Monthly Reports per year",
                manualValue: data.numMonthlyReportsPerYear,
                resolverValue: data.numMonthlyReportsPerYear
              },
              {
                rowLabel: "Number of ad-hoc reports per year (i.e. emerging risks, loss event analysis, root cause analysis, etc)",
                manualValue: data.numAdhocReportsPerYear,
                resolverValue: data.numAdhocReportsPerYear
              },
              {
                rowLabel: "Number of business units / functions in the organization",
                manualValue: this.state.businessUnits,
                resolverValue: this.state.businessUnits
              },
              {
                rowLabel: "Total Number of Reports per year",
                manualValue: this.calculateTotalReportsPerYear(),
                resolverValue: this.calculateTotalReportsPerYear()
              },
              {
                rowLabel: "Approx.number of hours spent on each report",
                manualValue: data.hoursPerReport.manual,
                resolverValue: data.hoursPerReport.resolver
              }
            ]}
            manualTotal={this.calculateReportingTotal(data.hoursPerReport.manual)}
            resolverTotal={this.calculateReportingTotal(data.hoursPerReport.resolver)}
          />
        </div>
      </div>;
  }
}

export default App;
