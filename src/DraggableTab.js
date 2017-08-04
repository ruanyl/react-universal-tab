import React, { Component } from 'react'
import classNames from 'classnames'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import ItemTypes from './ItemTypes'
import { TabComponent } from './Tab'

import styles from './tab.scss'

const getStyles = props => {
  const { isDragging, maxWidth } = props

  return {
    opacity: isDragging ? 0 : 1,
    maxWidth,
  }
}

export class DraggableTabComponent extends Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func,
    connectDragPreview: React.PropTypes.func,
    isDragging: React.PropTypes.bool,
    updateActiveTabOnClose: React.PropTypes.func,
    onClose: React.PropTypes.func,
    tab: React.PropTypes.object,
    maxWidth: React.PropTypes.number,
  }

  static defaultProps = {
    maxWidth: 150,
  }

  constructor(props) {
    super(props)
    this.state = {
      removing: false,
    }
  }

  onClose = e => {
    e.stopPropagation()
    this.setState({ removing: true })
    this.props.updateActiveTabOnClose(this.props.tab)

    setTimeout(() => {
      this.setState({ removing: false })
      this.props.onClose(this.props.tab)
    }, 120)
  }

  render() {
    const { connectDragSource, connectDragPreview, isDragging, ...props } = this.props
    const tabClassNames = classNames(styles.draggableTab, { [styles.removing]: this.state.removing })
    connectDragPreview(getEmptyImage())

    return connectDragSource(
      <div className={tabClassNames} style={getStyles(this.props)}>
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
