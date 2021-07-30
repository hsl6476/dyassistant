import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persis, store } from '@/store/extendIndex'
import App from './App'
import './app.css'

export default () => {
  ReactDOM.render(
    <Provider store={store} >
      <PersistGate loading={null} persistor={persis}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById('container'))
}