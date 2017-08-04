import React, { Component } from 'react'
import classNames from 'classnames'
import shouldPureComponentUpdate from './shouldPureComponentUpdate'

import { TabComponent } from './Tab'

import styles from './tabdragpreview.scss'

export default class TabDragPreview extends Component {
  static propTypes = {
    active: React.PropTypes.bool,
    maxWidth: React.PropTypes.number,
    width: React.PropTypes.number,
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { active, maxWidth, width } = this.props
    const previewClassNames = classNames(styles.preview, { [styles.active]: active })

    return (
      <TabComponent className={previewClassNames} style={{ maxWidth, width }} {...this.props} />
    )
  }
}
