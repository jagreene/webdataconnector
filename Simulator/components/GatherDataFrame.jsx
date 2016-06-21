import React, { Component, PropTypes } from 'react';

class GatherDataFrame extends Component {
  render() {
    return (
      <iframe
        style={{ display: 'none' }}
        src={this.props.wdcUrl}
        ref={this.props.setWindowAsGatherFrame}
      />
    );
  }

}

GatherDataFrame.propTypes = {
  wdcUrl: PropTypes.string.isRequired,
  setWindowAsGatherFrame: PropTypes.func.isRequired,
};

export default GatherDataFrame;
