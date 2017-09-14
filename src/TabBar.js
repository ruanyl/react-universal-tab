import React, { Component } from 'react'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'

import shouldPureComponentUpdate from './shouldPureComponentUpdate'
import { Tab } from './DraggableTab'
// import { TabComponent } from './Tab'
// import { CustomDragLayer } from './CustomDragLayer'
import { randomKey } from './utils'

import styles from './tabbar.scss'

const tabsAfterClose = (tabs, closedTab) => {
  let remainingTabs = tabs.filter(tab => tab.id !== closedTab.id)
  remainingTabs = remainingTabs.length ? remainingTabs : [{ id: randomKey(), title: 'New Tab' }]
  return remainingTabs
}

export class TabBar extends Component {
  static propTypes = {
    initialTabs: React.PropTypes.array,
    onTabChange: React.PropTypes.func,
    width: React.PropTypes.number,
  }

  static defaultProps = {
    initialTabs: [],
    onTabChange: () => true,
  }

  constructor(props) {
    super(props)
    const tabs = props.initialTabs.length ? props.initialTabs.map(tab => ({ ...tab, id: randomKey() })) : [{ id: randomKey(), title: 'New Tab' }]

    let activeTab = tabs.find(tab => tab.active)
    activeTab = activeTab ? { id: randomKey(), ...activeTab } : tabs[tabs.length - 1]

    this.state = {
      tabs,
      activeTab,
    }

    this.marginLeft = 32
    this.maxTabWidth = 150
    this.minTabWidth = 40
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  onSelect = tab => {
    this.setState({ activeTab: tab })
    this.props.onTabChange(tab)
  }

  onClose = closedTab => {
    const tabs = tabsAfterClose(this.state.tabs, closedTab)
    let activeTab = this.state.activeTab

    if (activeTab.id === closedTab.id) {
      const indexOfClosedTab = this.state.tabs.findIndex(tab => tab.id === closedTab.id)
      activeTab = tabs[indexOfClosedTab]
      activeTab = activeTab || tabs[tabs.length - 1]
      this.onSelect(activeTab)
    }

    setTimeout(() => this.setState({ tabs }), 120)
  }

  calTabContentWidth() {
    const { width } = this.props
    const { tabs } = this.state
    let tabWidth = (width / tabs.length) - this.marginLeft
    if (tabWidth > this.maxTabWidth) {
      tabWidth = this.maxTabWidth
    } else if (tabWidth < this.minTabWidth) {
      tabWidth = this.minTabWidth
    }
    return tabWidth
  }

  render() {
    const { tabs, activeTab } = this.state
    const tabContentWidth = this.calTabContentWidth()
    const tabWidth = tabContentWidth + this.marginLeft
    return (
      <div className={styles.tabbar} style={{ width: this.props.width }} ref={node => { this.tabBar = node }}>
        {tabs.map((tab, i) => <Tab key={`${tab.id}`} tabContentWidth={tabContentWidth} style={{ transform: `translateX(${tabWidth * i}px)` }} active={tab.id === activeTab.id} tab={tab} onSelect={this.onSelect} onClose={this.onClose} updateActiveTabOnClose={this.updateActiveTabOnClose} />)}
      </div>
    )
  }
}

export const AutoSizerTabBar = props => (
  <AutoSizer disableHeight>
    {({ width }) => <TabBar width={width} {...props} /> }
  </AutoSizer>
)
