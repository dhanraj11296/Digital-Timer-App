import {Component} from 'react'
import './index.css'
const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState
  componentWillUnmount() {
    this.clearTimerInterval()
  }
  clearTimerInterval = () => clearInterval(this.intervalId)
  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }
  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0
    return (
      <div className="timerLimitControllerContainer">
        <p className="LimitLabel">Set Timer limit</p>
        <div className="timerLimitController">
          <button
            className="limitControllerButton"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limitLabelValueContainer">
            <p className="limitValue">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limitControllerButton"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }
  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }
  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }
  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSeconds, timerLimitInMinutes} =
      this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }
  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPasuseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timerControllerContainer">
        <button
          className="timerCOntrollerBtn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPasuseAltText}
            className="timerControllerIcon"
            src={startOrPauseImageUrl}
          />
          <p className="timerControllerLabel">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timerContollerBtn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timerControllerIcon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timerControllerLabel">Reset</p>
        </button>
      </div>
    )
  }
  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinus = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinus}:${stringifiedSeconds}`
  }
  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="appContainer">
        <h1 className="heading">Digital Timer</h1>
        <div className="digitalTimerConvertor">
          <div className="timerDisplayCOntainer">
            <div className="ElapsedTimeContainer">
              <h1 className="elapsedTime">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timerState">{labelText}</p>
            </div>
          </div>
          <div className="controlsContainer">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
