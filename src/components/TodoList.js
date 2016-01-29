import { Observable } from 'rx'
import { filter, trace, path, compose, whereEq } from '../utils'
import { removeItemAction } from '../reducers/items'
import { div, h1 } from '../dom'
import connect from '../connect'

const mapWorldToProps = ({ store$, action$, dispatch }, props$) => {
  const filterNid = (nid) =>
    filter(whereEq({ nid: nid }))

  const itemsByNid = (nid) =>
    compose(filterNid(nid), path(['items']))

  const items$ = Observable.combineLatest(store$, props$,
    (store, props) => {
      return itemsByNid(props.nid)(store)
    })

  return Observable.combineLatest(items$,
    (items) => {
      const addItem = (id) => dispatch(removeItemAction(id))
      return { items, addItem }
    })
}

const TodoList = ({ items, addItem }) => {
  return div(
    items.map(item =>
      div(
        { key: item.id, onClick: () => addItem(item.id) },
        item.title
      )
    )
  )
}

export default connect(mapWorldToProps, TodoList)
