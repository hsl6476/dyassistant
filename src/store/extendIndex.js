import { createStore, combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { box, setting, version } from './reducer/extend'

const allReducer = combineReducers({
  box,
  setting,
  version
})

// 配置持久化的key， 这里默认使用loacl storage 做持久化的
const persistConfig = {
  key: 'dyconfig',
  storage: storage
}

const rootReducer = persistReducer(persistConfig, allReducer)

const store = createStore(rootReducer)

window.store = store

export {store}

// 构建持久化
export const persis = persistStore(store)