import React from 'react'
import { DragSource } from 'react-dnd'
import { DeleteEvent } from './data'


const Types = {
    ITEM: 'toy'
}
const sourceSpec = {
    beginDrag(props) {
        console.log("begin drag", this, props);
        return { eventData: props.eventData }
    }
}
const sourceCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Event extends React.Component {
    sty = { background: "red" };
    render() {
        const { /*isDragging,*/ connectDragSource } = this.props;
        let deleteBtn;
        if (!this.props.eventData.allocated) {
            deleteBtn = (<div className="EventDeletebutton"><button type="button" onClick={() => { DeleteEvent(this.props.eventData); }}>X</button></div>);
        }
        return connectDragSource(
            <div className="Event" style={this.sty} >
                <div className="EventTitle">{this.props.eventData.text}</div>
                {deleteBtn}
            </div>
        )
    }

}

export default DragSource(Types.ITEM, sourceSpec, sourceCollect)(Event)