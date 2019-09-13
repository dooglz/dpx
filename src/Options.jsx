import React from 'react'

import Dropdown from './utils/DropDown'

class Options extends React.Component {
    render() {
        let fcb = (v) => this.props.setGlobalState("timeslices", v.value)
        return (
            <div className="OptionsBar">
                <div><Dropdown options={[[8, "Hourly"], [16, "Half-hourly"], [32, "15 Mins"]]} changeCallback={fcb} label="Time Division" /></div>
                <div><input type="checkbox" name="ShowBacklog" onChange={(event) => this.props.setGlobalState("showbacklog", event.target.checked)} checked={this.props.bl ? (true) : (false)} />Show Backlog</div>
                <div><input type="checkbox" name="showTimeInSlots" onChange={(event) => this.props.setGlobalState("showTimeInSlots", event.target.checked)} />Show Time In Slots</div>
            </div>
        )
    }
}
export default Options
