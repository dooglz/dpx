import React from 'react';
import WeekBoard from './WeekBoard';
import Options from './Options';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    //this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    // this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { timeslices: 12, days: 5 };
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
        <WeekBoard timeslices={this.state.timeslices} days={this.state.days}/>
        <Options  setGlobalState={this.setGlobalState} />
      </div>
    );
  }
}

export default App;
