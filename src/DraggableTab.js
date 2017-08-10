import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'
import { DragSource, DropTarget } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import ItemTypes from './ItemTypes'
import { TabComponent } from './Tab'

import styles from './tab.scss'

const getStyles = props => {
  const { isDragging } = props

  return {
    opacity: isDragging ? 0 : 1,
  }
}

export class _Tab extends Component {
  static propTypes = {
    active: React.PropTypes.bool,
    connectDragSource: React.PropTypes.func,
    connectDropTarget: React.PropTypes.func,
    connectDragPreview: React.PropTypes.func,
    isDragging: React.PropTypes.bool,
    updateActiveTabOnClose: React.PropTypes.func,
    onClose: React.PropTypes.func,
    tab: React.PropTypes.object,
    maxWidth: React.PropTypes.number,
  }

  static defaultProps = {
    active: false,
    maxWidth: 150,
  }

  constructor(props) {
    super(props)
    this.state = {
      removing: false,
      hover: false,
      out: false,
    }
  }

  onClose = e => {
    e.stopPropagation()
    this.setState({ removing: true })
    this.props.onClose(this.props.tab)
  }

  onMouseLeave = () => {
    this.setState({ hover: false, out: true })
    setTimeout(() => this.setState({ out: false }), 400)
  }

  onMouseEnter = () => {
    this.setState({ hover: true })
  }

  render() {
    const { connectDragSource, connectDropTarget, connectDragPreview, isDragging, active, maxWidth, ...props } = this.props
    const tabClassNames = classNames(styles.draggableTab, { [styles.removing]: this.state.removing, [styles.active]: active, [styles.hover]: this.state.hover && !active, [styles.out]: this.state.out && !active })
    const zIndex = active ? 2 : 1
    connectDragPreview(getEmptyImage())

    return connectDropTarget(connectDragSource(
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={tabClassNames} style={{ ...getStyles(this.props), maxWidth, zIndex }}>
        <TabComponent {...props} active={active} onClose={this.onClose} />
      </div>
    ))
  }
}

const tabSource = {
  beginDrag(props, monitor, component) {
    return {
      tab: props.tab,
      index: props.index,
      maxWidth: props.maxWidth || 150,
      active: props.active,
      width: findDOMNode(component).offsetWidth,
    }
  },
}

/* eslint-disable no-useless-return, react/no-find-dom-node, no-param-reassign */
const tabTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex !== hoverIndex) {
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientX = clientOffset.x - hoverBoundingRect.left

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return
      }

      props.moveTab(dragIndex, hoverIndex)
      monitor.getItem().index = hoverIndex
    }
  },
}

const DraggableTab = DragSource(ItemTypes.TAB, tabSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))(_Tab)

export const Tab = DropTarget(ItemTypes.TAB, tabTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(DraggableTab)
