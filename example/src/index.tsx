import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { onAuthStateChanged } from './initFirebase'
import store from './store'
import Theme from './theme'
import App from './App'

const renderApp = () => {
  const container = document.getElementById('root')!
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Theme>
          <App />
        </Theme>
      </Provider>
    </React.StrictMode>
  )
}

onAuthStateChanged(store.dispatch, () => renderApp())
