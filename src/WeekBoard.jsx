import React from 'react'
import DayChart from './DayChart'
//import { observe } from './Game'
const containerStyle = {
    ///width: 500,
    //height: 500,
    // border: '1px solid gray',
    className: "WeekBoard"
}
/**
 * The Chessboard Tutorial Application
 */

class WeekBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("WB Render", this.props);
        const items = []
        for (let i = 0; i < this.props.days; i++) {
            items.push(<DayChart dayindex={i} key={i} timeslices={this.props.timeslices} />)
        }
        return (
            <div className="WeekBoard">
                {items}
            </div>
        )
    }
}
export default WeekBoard
