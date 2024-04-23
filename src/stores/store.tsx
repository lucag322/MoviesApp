import { configureStore } from '@reduxjs/toolkit'

import { MovieActionTypes } from '../actions/actions'
import rootReducer from '../reducers/reducers'

export type AppAction = MovieActionTypes

const store = configureStore({
  reducer: rootReducer
})

export default store
