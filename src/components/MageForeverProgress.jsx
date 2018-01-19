import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { earnGold } from '../actions/general';

import ForeverProgress from './ForeverProgress';

export class MageForeverProgress extends React.Component {
  static propTypes = {
    mages: PropTypes.number,
    earnGold: PropTypes.func.isRequired,
  }

  static defaultProps = {
    mages: 0,
  }

  handleComplete = () => {
    this.props.earnGold(this.props.mages * 5);
  }

  render() {
    if (!this.props.mages) {
      return null;
    }

    return (
      <ForeverProgress
        title={`${this.props.mages} Mages`}
        onComplete={this.handleComplete}
        delay={2000}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  mages: state.team.mages,
});

const mapDispatchToProps = {
  earnGold,
};

export default connect(mapStateToProps, mapDispatchToProps)(MageForeverProgress)
