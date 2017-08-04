import React, { Component } from 'react'
import shouldPureComponentUpdate from './shouldPureComponentUpdate'
import { TabComponent } from './Tab'

export default class TabDragPreview extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <TabComponent {...this.props} active />
    )
  }
}
