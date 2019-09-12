import React from 'react'
import DayChart from './DayChart'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const containerStyle = {
    ///width: 500,
    //height: 500,
    // border: '1px solid gray',
    className: "WeekBoard"
}

class WeekBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("WB Render", this.props);
        const items = []
        for (let i = 0; i < this.props.days; i++) {
            items.push(<DayChart events={this.props.events} dayindex={i} key={i} timeslices={this.props.timeslices} />)
        }
        const width=(this.props.small? "68%":"98%");
        return (
            <DndProvider backend={HTML5Backend}>
            <div className="WeekBoard" style={{width:width}}>
                {items}
            </div>
            </DndProvider>
        )
    }
}
export default WeekBoard
