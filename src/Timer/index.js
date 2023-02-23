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
    let timerRef = timerInMS;

    const msInADay = HR * MINS * SEC * MS;

    const noOfDays = parseInt(timerInMS / msInADay) || 0;
    if (noOfDays) {
      timerInMS = timerRef - noOfDays * msInADay;
    }
    const msInAHour = MINS * SEC * MS;
    const noOfHours = parseInt(timerInMS / msInAHour) || 0;
    if (noOfHours) {
      timerInMS = timerRef - noOfHours * msInAHour;
    }

    const msInAMin = SEC * MS;
    const noOfMins = parseInt(timerInMS / msInAMin) || 0;
    if (noOfMins) {
      timerInMS = timerRef - noOfMins * msInAMin;
    }

    const noOfSecs = parseInt(timerRef / MS) % SEC || 0;

    return {
      noOfDays,
      noOfHours,
      noOfMins,
      noOfSecs,
    };
  };

  render() {
    const time = this.serializeTimer(this.state.time);
    return <React.Fragment>{this.props.children(time)}</React.Fragment>;
  }
}
