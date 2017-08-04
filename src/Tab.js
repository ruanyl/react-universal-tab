import React, { Component } from 'react'

import styles from './tab.scss'

export class TabComponent extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    tab: React.PropTypes.object,
    onClose: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    style: React.PropTypes.object,
  }

  static defaultProps = {
    title: 'New Tab',
  }

  onSelect = () => {
    this.props.onSelect(this.props.tab)
  }

  render() {
    const { style } = this.props

    return (
      <div onClick={this.onSelect} className={styles.tab} style={style}>
        <span className={styles.title}>{this.props.title}</span>
        <span className={styles.left} />
        <span className={styles.right} />
        <span onClick={this.props.onClose} className={styles.close} />
      </div>
    )
  }
}
