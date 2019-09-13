import React from 'react';
import WeekBoard from './WeekBoard';
import Options from './Options';
import Backlog from './BackLog';
import './App.css';
import { Sync, onUpdate, GetEvents } from './data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timeslices: 32, days: 5 };
    this.setGlobalState = this.setGlobalState.bind(this);
    this.state.events = [];
    this.state.showbacklog = true;
    this.state.showTimeInSlots = false;
    onUpdate(() => { this.setGlobalState("events", GetEvents()) })
    Sync();
  }
  setGlobalState(prop, val) {
    let aa = {}
    aa[prop] = val;
    this.setState(aa);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        {this.state.showbacklog &&
          <Backlog events={this.state.events} />
        }
        <WeekBoard
          timeslices={this.state.timeslices}
          days={this.state.days}
          small={this.state.showbacklog}
          events={this.state.events}
          showTimeInSlots={this.state.showTimeInSlots}
        />
        <Options setGlobalState={this.setGlobalState} bl={this.state.showbacklog} />
      </div>
    );
  }
}

export default App;
