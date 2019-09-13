import React from 'react'
import Event from './Event'
import { DropTarget } from 'react-dnd'
import { Sync } from './data'
import EventLogic from './EventLogic'
//import TimeSlot from './WeekBoard';

class TimeSlot extends React.Component {

  render() {
    const { isOver, canDrop, connectDropTarget } = this.props
    const sty = { height: this.props.hgt + '%' }
    let aa = this.RenderEvent(this.props.di, this.props.ti);
    if (!aa && this.props.showTimeInSlots) {
      aa = (
        <div className="TimeSlotLabel">
          {this.props.di} - {this.props.ti} - {this.props.startDate.toISOString().slice(11, 16)}
        </div>
      )
    }
    const className = "TimeSlot" + (!isOver && canDrop ? " candrop" : "") + (isOver && canDrop ? " drophover" : "")
    return connectDropTarget(
      <div className={className} style={sty} key={this.props.ti}>
        {aa}
      </div>,
    )

  }
  RenderEvent(di, ti) {
    const e = EventLogic.getEventForMe(this.props.startDate, this.props.events);
    return e ? <Event eventData={e} /> : null
  }
}

function TimeSlotDropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  }
}
const TimeSlotDropHandle = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return
    }
    // Obtain the dragged item
    const item = monitor.getItem()
    console.log("Hello drop", this, item, props);
    //item.eventData.startDay = props.di;
    item.eventData.startTime = props.startDate;
    item.eventData.allocated = true;
    Sync();
    return { moved: true }
  }
}

let TimeSlotDropTarget = DropTarget('toy', TimeSlotDropHandle, TimeSlotDropCollect)(TimeSlot)




class DayChart extends React.Component {
  genTimeslots = (di, amount) => {
    const ts = []
    const hgt = Math.floor(100.0 / amount);
    for (let i = 0; i < amount; i++) {
      let tsStartDate = EventLogic.getSlotStartTime(this.props.date, i, amount);
      //let tdEndDate = EventLogic.getSlotEndTime(this.props.date,i,amount);
      ts.push(<TimeSlotDropTarget events={this.props.events} startDate={tsStartDate} di={di} ti={i} hgt={hgt} key={i} showTimeInSlots={this.props.showTimeInSlots} />)
    }
    return ts;
  }
  render() {
    let DYcn = "DayHeadder" + (EventLogic.isThisCurrentDay(this.props.date) ? " today" : "");
    return (
      <div className="DayChart">
        <div className={DYcn}>{EventLogic.getDayLabel(this.props.date)}</div>
        <div className="DayTimeSlots">{this.genTimeslots(this.props.dayindex, this.props.timeslices)}</div>
      </div>
    )
  }
}
export default DayChart

