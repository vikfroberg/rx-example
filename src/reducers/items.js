import { append, assoc, propEq, reject, trace } from '../utils'

const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

export function addItemAction(title) {
  return { type: ADD_ITEM, payload: { title } }
}

export function removeItemAction(id) {
  return { type: REMOVE_ITEM, payload: { id } }
}

var id = 0
const initialState = [
  {id: id++, title: 'Hej', nid: 1},
  {id: id++, title: 'Hallå', nid: 1},
  {id: id++, title: 'Tjena', nid: 1},
  {id: id++, title: 'Morsning', nid: 2},
]

export default (items = initialState, action) => {
  switch (action.type) {
  case ADD_ITEM:
    const item = { id: id++, title: action.payload.title, nid: 1 }
    return append(item, items)
  case REMOVE_ITEM:
    return reject(propEq('id', action.payload.id), items)
  default:
    return items
  }
}
