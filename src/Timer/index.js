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
      const remainingTime = this.state.time - MS;
      this.setState({ time: remainingTime });

      if (remainingTime < MS) {
        if (this.props.onComplete) this.props.onComplete();
        this.clearTimer();
      }
    }, MS);
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
      noOfDays: Math.floor(timerInMS / (MS * SEC * MINS * HR)),
      noOfHours: Math.floor((timerInMS / (MS * SEC * MINS)) % HR),
      noOfMins: Math.floor((timerInMS / MS / SEC) % MINS),
      noOfSecs: Math.floor((timerInMS / MS) % SEC),
    };
  };

  render() {
    const time = this.serializeTimer(this.state.time);
    return <div>{this.props.children(time)}</div>;
  }
}
