import React from 'react'


class Dropdown extends React.Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = { value: 'coconut' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        if (!props.options) {
            props.options = [];
            this.optionElements = [(<option>DropDown with no Options!</option>)];
        } else {
            this.optionElements = props.options.map((V,I) => (<option value={V[0]} key={I}>{V[1]}</option>))
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
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


const Options = () => {
    return (
        <div className="OptionsBar">
            <Dropdown options={[[0,0],[1,1],[2,2]]}/>
        </div>
    )
}
export default Options
