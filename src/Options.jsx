import React from 'react'

import Dropdown from './utils/DropDown'

class Options extends React.Component {
    constructor(props) {
        super(props);
        console.info(props);
    }
    render() {
        let fcb = (v)=>this.props.setGlobalState("timeslices",v.value)
        return (
            <div className="OptionsBar">
                <div> <Dropdown options={[[8, "Hourly"], [16, "Half-hourly"], [24, "15 Mins"]]} changeCallback={fcb} label="Time Division"/></div>
                <div> <input type="checkbox" name="ShowBacklog" onChange={(event)=>this.props.setGlobalState("showbacklog",event.target.checked)}/>Show Backlog</div>
            </div>
        )
    }
}
export default Options
