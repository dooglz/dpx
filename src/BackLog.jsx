import React from 'react'
import { DropTarget } from 'react-dnd'
import { NewEvent, GetEvents } from './data'
import Event from './Event'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Sync } from './data'

class BacklogList extends React.Component {
    RenderEvent() {
        console.info("RenderEvent", this.props)
        if (this.props.events) {
            let a = this.props.events.filter((V) => !V.allocated);
            console.info("RenderEvent2", a)
            return a.map((V) => (<Event eventData={V} />))
        }
    }
    render() {
        const { isOver, canDrop, connectDropTarget } = this.props
        console.info("BacklogList render", this.props)
        return connectDropTarget(<div className="backlogList" >{this.RenderEvent()}</div>)
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



class BackLog extends React.Component {

    render() {
        const BLDT_DropHandler = {
            drop(props, monitor, component) {

                if (monitor.didDrop()) {
                    return
                }
                // Obtain the dragged item
                const item = monitor.getItem()
                console.log("Hello drop", this, item, props);
                item.eventData.allocated = false;
                Sync();
                return { moved: true }
            }
        }
        let BLDT = DropTarget('toy', BLDT_DropHandler, collect)(BacklogList);
        console.info("BackLog render", this.props)
        return (
            <div className="backlog">
                <div className="backlogHeadder">
                    <button type="button" onClick={NewEvent}>New</button> Backlog
                </div>
                <DndProvider backend={HTML5Backend}>
                    <BLDT events={this.props.events} />
                </DndProvider>
            </div>
        );
    }
}

export default BackLog