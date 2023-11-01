import React, { Component } from 'react';
import './App.css';
import { flushSync } from 'react-dom';

const TIMEOUT = 500;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerLabel: 'Session',
      timeLeft: 25 * 60, // 25 minutes in seconds
      isRunning: false,
      intervalID: null,
    };
  }

  handleIncrement = (type) => {
    flushSync(() => {
    // setTimeout(() => {
      if (!this.state.isRunning) {
        if (type === 'break' && this.state.breakLength < 60) {
          this.setState((prevState) => ({
            breakLength: prevState.breakLength + 1,
          }));
        } else if (type === 'session' && this.state.sessionLength < 60) {
          this.setState((prevState) => ({
            sessionLength: prevState.sessionLength + 1,
            timeLeft: (prevState.sessionLength + 1) * 60,
          }));
        }
      }      
    // }, TIMEOUT);
    });
  };

  handleDecrement = (type) => {
    flushSync(() => {
    // setTimeout(() => {
      if (!this.state.isRunning) {
        if (type === 'break' && this.state.breakLength > 1) {
          this.setState((prevState) => ({
            breakLength: prevState.breakLength - 1,
          }));
        } else if (type === 'session' && this.state.sessionLength > 1) {
          this.setState((prevState) => ({
            sessionLength: prevState.sessionLength - 1,
            timeLeft: (prevState.sessionLength - 1) * 60,
          }));
        }
      }      
    // }, TIMEOUT);
    });
  };

  handleStartStop = () => {
    flushSync(() => {
    // setTimeout(() => {
      if (this.state.isRunning) {
        clearInterval(this.state.intervalID);
        this.setState({
          isRunning: false,
        });
      } else {
        const intervalID = setInterval(this.tick, 1000);
        this.setState({
          isRunning: true,
          intervalID,
        });
      }  
    // }, TIMEOUT);
    });
  };

  handleReset = () => {
    flushSync(() => {
      // setTimeout(() => {
        clearInterval(this.state.intervalID);
        const audio = document.getElementById('beep');
        audio.pause();
        audio.currentTime = 0;
    
        this.setState({
          breakLength: 5,
          sessionLength: 25,
          timerLabel: 'Session',
          timeLeft: 25 * 60,
          isRunning: false,
          intervalID: null,
        });      
      // }, TIMEOUT);
    });
  };

  tick = () => {
    // setTimeout(() => {
      if (this.state.timeLeft === 0) {
        this.playBeep();
        if (this.state.timerLabel === 'Session') {
          this.setState({
            timerLabel: 'Break',
            timeLeft: this.state.breakLength * 60,
          });
        } else {
          this.setState({
            timerLabel: 'Session',
            timeLeft: this.state.sessionLength * 60,
          });
        }
      } else {
        this.setState((prevState) => ({
          timeLeft: prevState.timeLeft - 1,
        }));
      }      
    // }, TIMEOUT);
  };

  playBeep = () => {
    // setTimeout(() => {
      const audio = document.getElementById('beep');
      audio.currentTime = 0;
      audio.play();      
    // }, TIMEOUT);
  };

  render() {
    return (
      <div className="container text-center mt-4">
        <h1>Pomodoro Clock</h1>
        <div className="row">
          <div className="col">
            <div id="break-label">Break Length</div>
            <button id="break-decrement" onClick={() => this.handleDecrement('break')}>
              Decrement
            </button>
            <div id="break-length">{this.state.breakLength}</div>
            <button id="break-increment" onClick={() => this.handleIncrement('break')}>
              Increment
            </button>
          </div>
          <div className="col">
            <div id="session-label">Session Length</div>
            <button id="session-decrement" onClick={() => this.handleDecrement('session')}>
              Decrement
            </button>
            <div id="session-length">{this.state.sessionLength}</div>
            <button id="session-increment" onClick={() => this.handleIncrement('session')}>
              Increment
            </button>
          </div>
        </div>
        <div id="timer-label">{this.state.timerLabel}</div>
        <div id="time-left">
          {String(Math.floor(this.state.timeLeft / 60)).padStart(2, '0')}:
          {String(this.state.timeLeft % 60).padStart(2, '0')}
        </div>
        <button id="start_stop" className="btn btn-primary" onClick={this.handleStartStop}>
          Start/Stop
        </button>
        <button id="reset" className="btn btn-danger" onClick={this.handleReset}>
          Reset
        </button>
        <audio id="beep" src="./assets/click-124467.mp3"></audio>
        <p>
        Sound Effect by <a href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=124467">UNIVERSFIELD</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=124467">Pixabay</a>
        </p>
      </div>
    );
  }
}

export default App;
