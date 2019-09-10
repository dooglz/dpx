import React from 'react'


class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'coconut' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        if (!props.options) {
            props.options = [];
            this.optionElements = [(<option>DropDown with no Options!</option>)];
        } else {
            this.optionElements = props.options.map((V, I) => (<option value={V[0]} key={I}>{V[1]}</option>))
        }
        if (!props.changeCallback) {
            this.changeCallback = () => { };
        } else {
            this.changeCallback = props.changeCallback;
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        this.changeCallback({ value: event.target.value })
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite flavor:
            <select value={this.state.value} onChange={this.handleChange}>
                        {this.optionElements}
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class Options extends React.Component {
    constructor(props) {
        super(props);
        console.info(props);
    }
    render() {
        let fcb = (v)=>this.props.setGlobalState("timeslices",v.value)
        return (
            <div className="OptionsBar">
                <Dropdown options={[[12, "Hourly"], [24, "Half-hourly"], [48, "15 Mins"]]} changeCallback={fcb} />
            </div>
        )
    }
}
export default Options
