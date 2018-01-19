import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { earnGold, spendGold } from '../actions/general';
import { hireWarrior } from '../actions/team';

import WarriorForeverProgress from './WarriorForeverProgress';

class Tween {
  constructor(options) {
    this.options = {
      duration: 1000,
      interval: 10,
      onComplete: () => {},
      onUpdate: () => {},
      ...options
    }

    this.begin();
  }

  begin() {
    this.start = Date.now();
    this.end = this.start + this.options.duration;
    this.interval = setInterval(() => {
      const now = Date.now();
      const timePassed = now - this.start;
      if (now >= this.end) {
        clearInterval(this.interval);
        this.options.onUpdate(timePassed, 1.0);
        this.options.onComplete();
      } else {
        const percent = timePassed / this.options.duration;
        this.options.onUpdate(timePassed, percent);
      }
    }, this.options.interval);
  }
}

export class Playspace extends React.Component {
  static propTypes = {
    debug: PropTypes.bool,
    gold: PropTypes.number.isRequired,
    totalGold: PropTypes.number.isRequired,
    earnGold: PropTypes.func.isRequired,
    spendGold: PropTypes.func.isRequired,
    hireWarrior: PropTypes.func.isRequired,
  }

  static defaultProps = {
    debug: false
  }

  state = {
    currentTask: "idling around"
  }

  componentWillUpdate(nextProps, nextState) {
    // currentTask will always default to 'idling around'
    if (!nextState.currentTask) {
      nextState.currentTask = "idling around";
    }
  }

  startTask = (name, onComplete) => {
    // cannot start a new task if we're already working on one
    if (this.state.progress) {
      return;
    }

    new Tween({
      duration: this.props.debug ? 500 : 5000,
      interval: 100,
      onUpdate: (timePassed, percent) => {
        this.setState({
          currentTask: name,
          progress: percent
        });
      },
      onComplete: () => {
        this.setState({
          progress: null,
          currentTask: null,
        });

        onComplete();
      }
    });
  }

  adventure = () => {
    this.startTask("adventuring", () => {
      this.props.earnGold(1);
    });
  }

  hireWarrior = () => {
    // cannot hire a warrior unless we can afford to
    if (this.props.gold < 5) {
      return;
    }

    this.props.spendGold(5);

    this.startTask("hiring a warrior", () => {
      this.props.hireWarrior();
    });
  }

  render() {
    return (
      <div>
        <header>
          <h4>Total Gold: {this.props.gold}</h4>
          <h4>Current Task: {this.state.currentTask}</h4>
          <p><progress value={this.state.progress || 0} max="1" /></p>
        </header>
        <main>
          <p>
            <button disabled={this.state.progress} onClick={this.adventure}>
              go on an adventure (5s)
            </button>
          </p>
          {/*
            once we have earned at least 5 lifetime gold, display the 'hire
            warrior' button forever (even if our current gold drops below 5)
          */}
          {this.props.totalGold >= 5 &&
            <p>
              <button disabled={this.state.progress} onClick={this.hireWarrior}>
                hire a warrior (5s, 5g)
              </button>
            </p>
          }
          <WarriorForeverProgress />
        </main>
        <footer>
          <h5>Total Lifetime Gold: {this.props.totalGold}</h5>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  debug: state.general.debug,
  gold: state.general.gold,
  totalGold: state.general.totalGold,
});

const mapDispatchToProps = {
  earnGold,
  spendGold,
  hireWarrior,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playspace)
