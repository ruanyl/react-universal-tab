import React, { Component } from 'react'
import classNames from 'classnames'

import shouldPureComponentUpdate from './shouldPureComponentUpdate'
import { TabComponent } from './Tab'

import styles from './tab.scss'

export class Tab extends Component {
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
    tabContentWidth: React.PropTypes.number,
    style: React.PropTypes.object,
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

  shouldComponentUpdate = shouldPureComponentUpdate

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
    const { active, maxWidth, tabContentWidth, style, ...props } = this.props
    const tabClassNames = classNames(styles.draggableTab, { [styles.removing]: this.state.removing, [styles.active]: active, [styles.hover]: this.state.hover && !active, [styles.out]: this.state.out && !active })
    const zIndex = active ? 2 : 1

    return (
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={tabClassNames} style={{ maxWidth, zIndex, ...style }}>
        <TabComponent {...props} active={active} onClose={this.onClose} style={{ width: tabContentWidth }} />
      </div>
    )
  }
}
