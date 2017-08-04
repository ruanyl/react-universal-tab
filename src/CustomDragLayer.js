import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragLayer } from 'react-dnd'
import ItemTypes from './ItemTypes'
import TabDragPreview from './TabDragPreview'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }

  const transform = `translate(${currentOffset.x}px, ${initialOffset.y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

class _CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
  };

  renderItem(type, item) {
    switch (type) {
      case ItemTypes.TAB:
        return (<TabDragPreview {...item} />)
      default:
        return null
    }
  }

  render() {
    const { item, itemType, isDragging, initialOffset, currentOffset } = this.props

    if (!isDragging) {
      return null
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles({ initialOffset, currentOffset })}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    )
  }
}

export const CustomDragLayer = DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(_CustomDragLayer)
