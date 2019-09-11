import React from 'react'
import Event from './Event'
import { useDrop } from 'react-dnd'
import { DropTarget } from 'react-dnd'

//import TimeSlot from './WeekBoard';

let Events = [];
function getEventAtThisTime(di, ti){
  return Events.find((v,i)=>v.startDay=== di && v.startTime=== ti );
}
function getEventsOverlappingThisTime(di, ti){
  return Events.find((v,i)=>v.startDay=== di && (v.startTime <= ti && v.startTime + v.duration >= ti ) );
}
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const getSegmentedTime = (division, i) => {
  const dd = new Date(0);
  dd.setHours(9);
  let d2 = new Date(dd);
  d2.setHours(17);
  return new Date(dd.getTime() + (i * ((d2 - dd)) / division))
}

class TimeSlot extends React.Component {
  render() {
    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = this.props

    const sty = { height: this.props.hgt + '%', minHeight: this.props.hgt + '%' }
    const timeLabel = this.props.st.toISOString().slice(11, 16);
    let aa = this.RenderEvent(this.props.di, this.props.ti);
    if (!aa) {
      aa = (
        <div className="TimeSlotLabel">
          {this.props.di} - {this.props.ti} - {timeLabel}
        </div>
      )
    }
    /*return (
      <div className="TimeSlot" style={sty} key={this.props.ti}>
        {aa}
      </div>)*/

    return connectDropTarget(
      <div className="TimeSlot" style={sty} key={this.props.ti}>
        {isOver && canDrop && "G"}
        {!isOver && canDrop && "R"}
        {isOver && !canDrop && "B"}
        {aa}
      </div>,
    )

  }
  RenderEvent(di, ti) {
    const e = getEventAtThisTime(di,ti);
    return e ? <Event eventData={e} /> : null
  }
}

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  }
}
const chessSquareTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return
    }

    // Obtain the dragged item
    const item = monitor.getItem()
    console.log("Hello drop", this, item, props);
    item.eventData.startDay = props.di;
    item.eventData.startTime = props.ti;
    // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position)

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true }
  }
}

let DTTS = DropTarget('toy', chessSquareTarget, collect)(TimeSlot)

const genTimeslots = (di, amount) => {
  const ts = []
  const hgt = Math.floor(100.0 / amount);

  for (let i = 0; i < amount; i++) {
    ts.push(<DTTS di={di} ti={i} hgt={hgt} key={i} st={getSegmentedTime(amount, i)} />)
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

