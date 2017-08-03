import React, { Component } from 'react'
import classNames from 'classnames'
import { DragSource } from 'react-dnd'

import styles from './tab.scss'

class TabComponent extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    maxWidth: React.PropTypes.number,
    active: React.PropTypes.bool,
    tab: React.PropTypes.object,
    onClose: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    connectDragSource: React.PropTypes.func,
    isDragging: React.PropTypes.bool,
    updateActiveTabOnClose: React.PropTypes.func,
  }

  static defaultProps = {
    title: 'New Tab',
    maxWidth: 150,
    active: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      removing: false,
    }
  }

  onSelect = () => {
    this.props.onSelect(this.props.tab)
  }

  onClose = e => {
    e.stopPropagation()
    this.setState({ removing: true })
    this.props.updateActiveTabOnClose(this.props.tab)

    setTimeout(() => {
      this.setState({ removing: false })
      this.props.onClose(this.props.tab)
    }, 200)
  }

  render() {
    const { active, maxWidth, connectDragSource, isDragging } = this.props
    const backgroundColor = active ? '#f6f6f6' : '#d0d0d0'
    const zIndex = active ? 2 : 1
    const opacity = isDragging ? 0 : 1
    const tabClassNames = classNames(styles.tab, { [styles.removing]: this.state.removing })

    return connectDragSource(
      <div onClick={this.onSelect} className={tabClassNames} style={{ maxWidth, backgroundColor, zIndex, opacity }}>
        <span className={styles.title}>{this.props.title}</span>
        <span className={styles.left} style={{ backgroundColor }} />
        <span className={styles.right} style={{ backgroundColor }} />
        <span onClick={this.onClose} className={styles.close} />
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

export const Tab = DragSource('tab', tabSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(TabComponent)
