import React, { Component, PropTypes } from 'react';
import {
  FormGroup,
  FormControl,
  InputGroup,
  ControlLabel,
  Button } from 'react-bootstrap';

class AddressBar extends Component {
  constructor(props) {
    super(props);
    this.handleWdcUrlChange = this.handleWdcUrlChange.bind(this);
  }

  handleWdcUrlChange(e) {
    this.props.setWdcUrl(e.target.value);
  }

  render() {
    return (
      <FormGroup>
        <ControlLabel> Connector URL </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            disabled={this.props.disabled}
            label="WDC URL"
            value={this.props.wdcUrl}
            onChange={this.handleWdcUrlChange}
          />
          <InputGroup.Button>
            <Button onClick={this.props.resetSimulator}> Reset </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

AddressBar.prototypes = {
  wdcUrl: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  setWdcUrl: PropTypes.func.isRequired,
  resetSimulator: PropTypes.func.isRequired,
};

export default AddressBar;
