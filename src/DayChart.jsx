import React from 'react'
//import TimeSlot from './WeekBoard';


const dayNames=["Monday","Tuesday", "Wednesday", "Thursday", "Friday"]

const TimeSlot = (di,ti,ds,de) =>{
  
  return (<div className="TimeSlot" key={ti}>{di} - {ti}</div>)
}

const genTimeslots = (di,amount) => {
  const ts = []
  for (let i = 0; i < 5; i++) {
    ts.push(TimeSlot(di,i)) 
  }
  return ts;
}

const DayChart = ({dayindex}) => {
  return (
    <div className="DayChart">
     <div className="DayHeadder">{dayNames[dayindex]}</div>
     <div className="DayTimeSlots">{genTimeslots(dayindex,5)}</div>
    </div>
  )
}
export default DayChart
