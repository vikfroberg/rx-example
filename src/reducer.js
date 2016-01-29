import { trace } from './utils'
import items from './reducers/items'

export default (state = {}, action) => {
  return {
    items: items(state.items, action)
  }
}
