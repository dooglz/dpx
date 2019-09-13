import React from 'react'
import DayChart from './DayChart'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import EventLogic from './EventLogic'

class WeekBoard extends React.Component {
    constructor(props) {
        super(props);
        this.weekBeginning = EventLogic.startOfWeek();
        this.weekOffset = 0;
    }
    genTimeBar = (amount) => {
        let divs = [];
        const hgt = Math.floor(100.0 / amount);
        const sty = { height: hgt + '%' }
        for (let i = 0; i < amount; i++) {
            let tsStartDate = EventLogic.getSlotStartTime(new Date(), i, amount).toLocaleTimeString().slice(0, 5);
            divs.push(<div className="TimeBarSlot" style={sty} key={i}>{tsStartDate}</div>)
        }
        return (
            <div className="TimeBar" key="TimeBar"><div className="DayHeadder"></div><div className="TimeBarslots">{divs}</div></div>
        )
    }
    render() {
        console.log("WB Render", this.props);

        const items = [];
        if (!this.props.showTimeInSlots) {
            items.push(this.genTimeBar(this.props.timeslices));
        }
        for (let i = 0; i < this.props.days; i++) {
            items.push(<DayChart events={this.props.events} date={EventLogic.getDateForID(i, this.weekOffset)} dayindex={i} key={i} timeslices={this.props.timeslices} showTimeInSlots={this.props.showTimeInSlots} />)
        }
        const width = (this.props.small ? "68%" : "98%");
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="WeekBoard" style={{ width: width }}>
                    {items}
                </div>
            </DndProvider>
        )
    }
}
export default WeekBoard
