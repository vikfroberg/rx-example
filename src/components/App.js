import { hr, div } from '../dom'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

export default () =>
  div([
    TodoForm(),
    hr(),
    TodoList({ nid: 1 }),
  ])
