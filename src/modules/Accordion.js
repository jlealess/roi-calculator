import React from 'react';
import Table from './Table';
import Subtotal from './Subtotal';
import styled from 'styled-components';

const StyledAccordion = styled.div`
    margin-bottom: 45px;
    position: relative;

  .accordion-toggle {
    align-items: baseline;
    background-color: transparent;
    border: none;
    bottom: -25px;
    color: #4a4a4a;
    display: flex;
    font-size: 11px;
    padding: 0;
    position: absolute;
    right: 0;
    text-transform: uppercase;
  }

  .accordion-toggle:after {
    content: "";
  }

  .chevron::before {
    border-style: solid;
    border-width: 0.135em 0.135em 0 0;
    color: #4a4a4a;
    content: "";
    display: inline-block;
    height: 0.45em;
    margin: 1px 0 0 5px;
    position: relative;
    transform: rotate(-45deg);
    /* vertical-align: top; */
    width: 0.45em;
  }

  .chevron.bottom:before {
    top: -3px;
    transform: rotate(135deg);
  }
`;

class Accordion extends React.Component {
  constructor() {
    super();
    this.state = {
      accordionOpen: false
    }
    this.toggleAccordion = this.toggleAccordion.bind(this);
  }
  toggleAccordion() {
    this.setState({
      accordionOpen: !this.state.accordionOpen
    });
  }

  render() {
      return (
          <StyledAccordion>
              <div className="card">
                <Subtotal
                  label={this.props.cardHeadingLabel}
                  value={this.props.cardHeadingValue}
                />
                {
                  this.state.accordionOpen && 
                  <Table
                    rows={this.props.rows}
                    manualTotal={this.props.manualTotal}
                    resolverTotal={this.props.resolverTotal}
                  />
                }
              </div>
              <button className="accordion-toggle" onClick={this.toggleAccordion}>
                  {this.state.accordionOpen ? "Collapse details" : "Expand details"}
                  <span className={`chevron ${this.state.accordionOpen ? "" : "bottom"}`}></span>
              </button>
          </StyledAccordion>
      )
  }
}

export default Accordion;