import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { earnGold } from '../actions/general';

import ForeverProgress from './ForeverProgress';
import config from '../config.json';

const MAGE = config.classes.mage;

export class MageForeverProgress extends React.Component {
  static propTypes = {
    mages: PropTypes.number,
    earnGold: PropTypes.func.isRequired,
  }

  static defaultProps = {
    mages: 0,
  }

  handleComplete = () => {
    this.props.earnGold(this.props.mages * MAGE.earns);
  }

  render() {
    if (!this.props.mages) {
      return null;
    }

    return (
      <ForeverProgress
        title={`${this.props.mages} Mages`}
        onComplete={this.handleComplete}
        delay={MAGE.every * 100}
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
