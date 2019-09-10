import React from 'react'
//import TimeSlot from './WeekBoard';


const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

const TimeSlot = (di, ti, hgt, ds, de) => {
  const sty = { height: hgt + '%', minHeight: hgt + '%' }
  return (<div className="TimeSlot" style={sty} key={ti}>{di} - {ti}</div>)
}

const genTimeslots = (di, amount) => {
  const ts = []
  const hgt = Math.floor(100.0 / amount);
  for (let i = 0; i < amount; i++) {
    ts.push(TimeSlot(di, i, hgt))
  }
  return ts;
}

class DayChart extends React.Component {
  render() {
    return (
      <div className="DayChart">
        <div className="DayHeadder">{dayNames[this.props.dayindex]}</div>
        <div className="DayTimeSlots">{genTimeslots(this.props.dayindex, this.props.timeslices)}</div>
      </div>
    )
  }
}
export default DayChart
