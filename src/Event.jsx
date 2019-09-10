import React from 'react'
import { DragSource, useDrag } from 'react-dnd'



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
        const { isDragging, connectDragSource } = this.props;
        return connectDragSource(
            <div className="Event" style={this.sty} >Hello</div>
        )
    }

}


//export default Event
//export default Event
export default DragSource(Types.ITEM, sourceSpec, sourceCollect)(Event)