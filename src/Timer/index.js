import React from "react";

const MS = 1000;
const SEC = 60;
const MINS = 60;
const HR = 24;

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.initialTime = props.initialTime || 0;
    this.state = {
      time: props.initialTime || 0,
    };
    this.intervalRef = null;
  }

  componentDidMount() {
    this.intervalRef = setInterval(() => {
      const remainingTime = this.state.time - 1000;
      this.setState({ time: remainingTime });

      if (remainingTime < 1000) {
        if (this.props.onComplete) this.props.onComplete();
        this.clearTimer();
      }
    }, 1000);
  }

  clearTimer = () => {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
      this.intervalRef = null;
    }
  };

  componentWillUnmount() {
    this.clearTimer();
  }

  serializeTimer = (timerInMS) => {
    return {
      noOfDays: Math.floor(timerInMS / (1000 * 60 * 60 * 24)),
      noOfHours: Math.floor((timerInMS / (1000 * 60 * 60)) % 24),
      noOfMins: Math.floor((timerInMS / 1000 / 60) % 60),
      noOfSecs: Math.floor((timerInMS / 1000) % 60),
    };
  };

  render() {
    const time = this.serializeTimer(this.state.time);
    return <React.Fragment>{this.props.children(time)}</React.Fragment>;
  }
}
