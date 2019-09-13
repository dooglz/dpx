import React from 'react'
import { DropTarget } from 'react-dnd'
import { NewEvent } from './data'
import Event from './Event'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Sync } from './data'

class BacklogList extends React.Component {
    RenderEvent() {
        if (this.props.events) {
            let a = this.props.events.filter((V) => !V.allocated);
            return a.map((V) => (<Event eventData={V} />))
        }
    }
    render() {
        const { isOver, canDrop, connectDropTarget } = this.props
        const className = "backlogList" + (!isOver && canDrop ? " candrop" : "") + (isOver && canDrop ? " drophover" : "")
        console.info("BacklogList render", this.props)
        return connectDropTarget(<div className={className} >{this.RenderEvent()}</div>)
    }
}



function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
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