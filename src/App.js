import React from 'react';
import WeekBoard from './WeekBoard';
import Options from './Options';
import Backlog from './BackLog';
import './App.css';
import {Sync,onUpdate, GetEvents} from './data';

class App extends React.Component {
  constructor(props) {
    super(props);
    //this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    // this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { timeslices: 8, days: 5 };
    this.setGlobalState = this.setGlobalState.bind(this);
    this.state.events =[];
    onUpdate(()=>{console.log(GetEvents(),this.state);this.setGlobalState("events",GetEvents())})
    Sync();
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
          <Backlog events={this.state.events}/>
        }
        <WeekBoard timeslices={this.state.timeslices} days={this.state.days} small={this.state.showbacklog} events={this.state.events}/>
        <Options  setGlobalState={this.setGlobalState} />
      </div>
    );
  }
}

export default App;
