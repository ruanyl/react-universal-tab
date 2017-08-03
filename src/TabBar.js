import React, { Component } from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import { Tab } from './Tab'
import { randomKey } from './utils'

import styles from './tabbar.scss'

const tabsAfterClose = (tabs, closedTab) => {
  let remainingTabs = tabs.filter(tab => tab.id !== closedTab.id)
  remainingTabs = remainingTabs.length ? remainingTabs : [{ id: randomKey(), title: 'New Tab' }]
  return remainingTabs
}

class TabBarComponent extends Component {
  static propTypes = {
    initialTabs: React.PropTypes.array,
    onTabChange: React.PropTypes.func,
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
  }

  onSelect = tab => {
    this.setState({ activeTab: tab })
    this.props.onTabChange(tab)
  }

  onClose = closedTab => {
    const tabs = tabsAfterClose(this.state.tabs, closedTab)
    this.setState({ tabs })
  }

  updateActiveTabOnClose = closedTab => {
    const tabs = tabsAfterClose(this.state.tabs, closedTab)
    let activeTab = this.state.activeTab

    if (activeTab.id === closedTab.id) {
      const indexOfClosedTab = this.state.tabs.findIndex(tab => tab.id === closedTab.id)
      activeTab = tabs[indexOfClosedTab]
      activeTab = activeTab || tabs[tabs.length - 1]
      this.onSelect(activeTab)
    }
  }

  render() {
    const { tabs, activeTab } = this.state
    return (
      <div className={styles.tabbar}>
        {tabs.map(tab => <Tab key={`${tab.id}`} title={tab.title} active={tab.id === activeTab.id} tab={tab} onSelect={this.onSelect} onClose={this.onClose} updateActiveTabOnClose={this.updateActiveTabOnClose} />)}
      </div>
    )
  }
}

export const TabBar = DragDropContext(HTML5Backend)(TabBarComponent)