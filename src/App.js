import React, { Component } from 'react';
import './App.css';
import Form from './modules/Form';
import Subtotal from './modules/Subtotal';
import Total from './modules/Total';
import { data } from './data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      businessUnits: "15", 
      periodicAssessments: "4",
      riskControlOwners: "40", 
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  calculateAssumptionsTotal(planningHours, numAssessments) {
    return (parseInt(this.state.riskControlOwners) * parseInt(this.state.periodicAssessments * planningHours)) + parseInt(numAssessments);
  }

  calculateMainTotal() {
    return parseInt(this.diffRiskOwnerTrainingTotals()) + parseInt(this.diffAssumptionsTotals()) + parseInt(this.diffReportingTotals());
  }

  calculateReportingTotal(hoursPerReport) {
    const TotalNumReportsPerYear = data.numCriticalRiskReportsPerYear + data.numIssueReportsPerYear + (data.numQuarterlyReportsPerYear * this.state.businessUnits) + data.numMonthlyReportsPerYear + data.numAdhocReportsPerYear;
    return hoursPerReport * TotalNumReportsPerYear;
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
          <Form 
            handleInputChange={this.handleInputChange} 
            input1value={this.state.businessUnits} 
            input2value={this.state.riskControlOwners} 
            input3value={this.state.periodicAssessments} 
          />
          <Total 
            label="Total time saved"
            value={this.calculateMainTotal()}
          />
        <Subtotal
          label="Risk assessment planning & execution"
          value={this.diffAssumptionsTotals()}
        />
        <Subtotal
          label="Initial and ongoing risk owner training"
          value={this.diffRiskOwnerTrainingTotals()}
        />
        <Subtotal
          label="Data aggregation, analysis & reporting"
          value={this.diffReportingTotals()}
        />

        </div>
      </div>;
  }
}

export default App;
