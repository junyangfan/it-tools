import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'


const store = createPinia()

store.use(
  createPersistedState({
    storage: localStorage,
  }),
)

export default store

export {  }

// 重置所有仓库状态
export const resetStore = () => {

}
