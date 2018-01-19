import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { earnGold } from '../actions/general';

import ForeverProgress from './ForeverProgress';

export class WarriorForeverProgress extends React.Component {
  static propTypes = {
    warriors: PropTypes.number,
    earnGold: PropTypes.func.isRequired,
  }

  static defaultProps = {
    warriors: 0,
  }

  handleComplete = () => {
    this.props.earnGold(this.props.warriors);
  }

  render() {
    if (!this.props.warriors) {
      return null;
    }

    return (
      <ForeverProgress
        title={`${this.props.warriors} Warriors`}
        onComplete={this.handleComplete}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  warriors: state.team.warriors,
});

const mapDispatchToProps = {
  earnGold,
};

export default connect(mapStateToProps, mapDispatchToProps)(WarriorForeverProgress)
