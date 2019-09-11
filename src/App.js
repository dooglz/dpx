import React from 'react';
import WeekBoard from './WeekBoard';
import Options from './Options';
import Backlog from './BackLog';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    //this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    // this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { timeslices: 8, days: 5 };
    this.setGlobalState = this.setGlobalState.bind(this);
  }
  setGlobalState(prop, val) {
    let aa= {}
    aa[prop] = val;
    this.setState(aa);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        {this.state.showbacklog &&
          <Backlog />
        }
        <WeekBoard timeslices={this.state.timeslices} days={this.state.days} small={this.state.showbacklog}/>
        <Options  setGlobalState={this.setGlobalState} />
      </div>
    );
  }
}

export default App;
