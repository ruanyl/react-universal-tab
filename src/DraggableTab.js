import React, { Component } from 'react'
import classNames from 'classnames'
import { DragSource } from 'react-dnd'
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

export class DraggableTabComponent extends Component {
  static propTypes = {
    active: React.PropTypes.bool,
    connectDragSource: React.PropTypes.func,
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
    const { connectDragSource, connectDragPreview, isDragging, active, maxWidth, ...props } = this.props
    const tabClassNames = classNames(styles.draggableTab, { [styles.removing]: this.state.removing, [styles.active]: active, [styles.hover]: this.state.hover && !active, [styles.out]: this.state.out && !active })
    const zIndex = active ? 2 : 1
    connectDragPreview(getEmptyImage())

    return connectDragSource(
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={tabClassNames} style={{ ...getStyles(this.props), maxWidth, zIndex }}>
        <TabComponent {...props} onClose={this.onClose} />
      </div>
    )
  }
}

const tabSource = {
  beginDrag(props) {
    return {
      ...props.tab,
    }
  },
}

export const Tab = DragSource(ItemTypes.TAB, tabSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))(DraggableTabComponent)
