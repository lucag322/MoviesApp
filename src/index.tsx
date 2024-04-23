import 'index.css'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from '@/components/App'

import store from '../src/stores/store'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
