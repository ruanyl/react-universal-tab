import React, { Component } from 'react'
import classNames from 'classnames'

import styles from './tab.scss'

export class TabComponent extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    tab: React.PropTypes.object,
    onClose: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    active: React.PropTypes.bool,
  }

  static defaultProps = {
    title: 'New Tab',
  }

  onSelect = () => {
    this.props.onSelect(this.props.tab)
  }

  render() {
    const { style, className, active } = this.props
    const tabClassNames = classNames(className, styles.tab, { [styles.active]: active })

    return (
      <div onClick={this.onSelect} className={tabClassNames} style={style}>
        <span className={styles.title}>{this.props.title}</span>
        <span className={styles.left} />
        <span className={styles.right} />
        <span onClick={this.props.onClose} className={styles.close} />
      </div>
    )
  }
}
