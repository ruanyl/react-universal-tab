import React, { Component } from 'react'
import classNames from 'classnames'

import styles from './tab.scss'

export class TabComponent extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    active: React.PropTypes.bool,
    tab: React.PropTypes.object,
    onClose: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    style: React.PropTypes.object,
  }

  static defaultProps = {
    title: 'New Tab',
    active: false,
  }

  onSelect = () => {
    this.props.onSelect(this.props.tab)
  }

  render() {
    const { active, style } = this.props
    const backgroundColor = active ? '#f6f6f6' : '#d0d0d0'
    const zIndex = active ? 2 : 1
    const tabClassNames = classNames(styles.tab)

    return (
      <div onClick={this.onSelect} className={tabClassNames} style={{ backgroundColor, zIndex, ...style }}>
        <span className={styles.title}>{this.props.title}</span>
        <span className={styles.left} style={{ backgroundColor }} />
        <span className={styles.right} style={{ backgroundColor }} />
        <span onClick={this.props.onClose} className={styles.close} />
      </div>
    )
  }
}
