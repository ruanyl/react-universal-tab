import React, { Component } from 'react'

import { AutoSizerTabBar } from '../src/TabBar'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialTabs: [
        { id: 1, title: 'Google Search' },
        { id: 2, title: 'AlphaSense' },
        { id: 3, title: 'Baidu' },
        { id: 4, title: 'Tesla' },
        { id: 5, title: 'Youtube' },
        { id: 5, title: 'Youtube' },
        { id: 5, title: 'Youtube' },
        { id: 5, title: 'Youtube' },
        { id: 5, title: 'Youtube' },
        { id: 5, title: 'Youtube' },
      ],
    }
  }
  render() {
    return (
      <div style={{ width: 1000, height: 30, marginTop: 10 }}>
        <AutoSizerTabBar initialTabs={this.state.initialTabs} />
      </div>
    )
  }
}
