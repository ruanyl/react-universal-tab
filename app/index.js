import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'

import { App } from './App'

import './style.scss'

const render = Component => {
  ReactDom.render(
    <div>
      <Component />
    </div>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
