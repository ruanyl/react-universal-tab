import React, { Component } from 'react'
import update from 'react/lib/update'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import { Tab } from './DraggableTab'
import { CustomDragLayer } from './CustomDragLayer'
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
    let activeTab = this.state.activeTab

    if (activeTab.id === closedTab.id) {
      const indexOfClosedTab = this.state.tabs.findIndex(tab => tab.id === closedTab.id)
      activeTab = tabs[indexOfClosedTab]
      activeTab = activeTab || tabs[tabs.length - 1]
      this.onSelect(activeTab)
    }

    setTimeout(() => this.setState({ tabs }), 120)
  }

  moveTab = (dragIndex, hoverIndex) => {
    const { tabs } = this.state
    const dragTab = tabs[dragIndex]

    this.setState(update(this.state, {
      tabs: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragTab],
        ],
      },
    }))
  }

  render() {
    const { tabs, activeTab } = this.state
    return (
      <div>
        <div className={styles.tabbar}>
          {tabs.map((tab, i) => <Tab moveTab={this.moveTab} index={i} key={`${tab.id}`} active={tab.id === activeTab.id} tab={tab} onSelect={this.onSelect} onClose={this.onClose} updateActiveTabOnClose={this.updateActiveTabOnClose} />)}
        </div>
        <CustomDragLayer />
      </div>
    )
  }
}

export const TabBar = DragDropContext(HTML5Backend)(TabBarComponent)
