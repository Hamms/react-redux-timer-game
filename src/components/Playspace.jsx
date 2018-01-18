import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

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
    debug: PropTypes.bool
  }

  static defaultProps = {
    debug: false
  }

  state = {
    gold: 0,
    warriors: 0,
    currentTask: "idling around"
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.currentTask) {
      nextState.currentTask = "idling around";
    }
  }

  startTask = (name, onComplete) => {
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
      this.setState({
        gold: this.state.gold + 1
      });
    });
  }

  hireWarrior = () => {
    if (this.state.gold < 5) {
      return;
    }

    this.setState({
      gold: this.state.gold - 5
    });

    this.startTask("hiring a warrior", () => {
      const newState = {
        warriors: this.state.warriors + 1
      }

      if (!this.state.warriors) {
        newState.warriorProgress = 0;
        newState.warriorInterval = setInterval(() => {
          if (this.state.warriorProgress === 100) {
            this.setState({
              gold: this.state.gold + this.state.warriors,
              warriorProgress: 0
            });
          } else {
            this.setState({
              warriorProgress: this.state.warriorProgress + 10
            });
          }
        }, 1000);
      }

      this.setState(newState);
    });
  }

  render() {
    return (
      <div style={{padding: 10}}>
        <header>
          <h4>Total Gold: {this.state.gold}</h4>
          <h4>Current Task: {this.state.currentTask}</h4>
          <p><progress value={this.state.progress || 0} max="1" /></p>
        </header>
        <main>
          <p>
            <button disabled={this.state.progress} onClick={this.adventure}>
              go on an adventure (5s)
            </button>
          </p>
          {this.state.gold >= 5 && 
            <p>
              <button disabled={this.state.progress} onClick={this.hireWarrior}>
                hire a warrior (5s, 5g)
              </button>
            </p>
          }
          {this.state.warriors > 0 &&
          <p>{this.state.warriors} Warriors: <progress value={this.state.warriorProgress || 0} max="100">your warrior is adventuring</progress></p>
          }
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  debug: state.general.debug
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Playspace)
