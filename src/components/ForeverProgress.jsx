import React from 'react';
import PropTypes from 'prop-types';

export default class ForeverProgress extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    increment: PropTypes.number,
    delay: PropTypes.number,
    onComplete: PropTypes.func,
  }

  static defaultProps = {
    increment: 10,
    delay: 1000,
    onComplete: () => {}
  }

  componentWillMount() {
    this.setState({
      progress: 0,
      interval: setInterval(() => {
        if (this.state.progress === 100) {
          this.props.onComplete();
          this.setState({
            progress: this.props.increment
          });
        } else {
          this.setState({
            progress: this.state.progress + this.props.increment
          });
        }
      }, this.props.delay)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <p>
        {this.props.title}{' '}
        <progress value={this.state.progress || 0} max="100" />
      </p>
    );
  }
}
