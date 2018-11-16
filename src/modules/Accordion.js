import React from 'react';
import Table from './Table';
import Subtotal from './Subtotal';

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
            <div className="accordion">
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
                </button>
            </div>

        )
    }
}

export default Accordion;