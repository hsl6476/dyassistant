import { createStore, combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import room from './reducer/room'

const allReducer = combineReducers({
  room
})

// 配置持久化的key， 这里默认使用loacl storage 做持久化的
const persistConfig = {
  key: 'interact',
  storage: storage
}

const rootReducer = persistReducer(persistConfig, allReducer)

export const store = createStore(rootReducer)

// 构建持久化
export const persis = persistStore(store)