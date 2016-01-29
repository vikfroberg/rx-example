import { Observable } from 'rx'
import { button, input, div } from '../dom'
import { preventDefault, anyPass, curry, compose, targetValue, isEmpty } from '../utils'
import { addItemAction } from '../reducers/items'
import connect from '../connect'
import Input from './Input'

const isActionType = curry((type, action) => action.type === type)

const setInputAction = (text) => {
  return { type: 'SET_INPUT', payload: { text } }
}

const focusInputAction = (text) => {
  return { type: 'FOCUS_INPUT', payload: { text } }
}

const blurInputAction = (text) => {
  return { type: 'BLUR_INPUT', payload: { text } }
}

const reducer = (state, action) => {
  switch (action.type) {
  case 'ADD_ITEM':
    return ''
  case 'SET_INPUT':
    return action.payload.text
  default:
    return state
  }
}

const mapWorldToProps = ({ action$, dispatch }) => {
  const inputValue$ = action$.scan(reducer, '')

  const focusInput$ = action$
    .filter(anyPass([isActionType('ADD_ITEM'), isActionType('FOCUS_INPUT')]))
    .map(() => true)
  const blurInput$ = action$
    .filter(isActionType('BLUR_INPUT'))
    .map(() => false)
  const focusValue$ = focusInput$.merge(blurInput$).startWith(true)

  return Observable.combineLatest(inputValue$, focusValue$,
    (inputValue, focusValue) => {
      const focusInput = () => dispatch(focusInputAction())
      const blurInput = () => dispatch(blurInputAction())
      const setInput = (text) => dispatch(setInputAction(text))
      const addItem = () => dispatch(addItemAction(inputValue))
      return {
        setInput,
        inputValue,
        addItem,
        focusInput,
        blurInput,
        focusValue
      }
    })
}

const Component = ({ setInput, inputValue, addItem, focusValue, focusInput, blurInput }) =>
  div([
    Input({
      type: 'text',
      value: inputValue,
      onFocus: focusInput,
      onBlur: blurInput,
      onChange: compose(setInput, targetValue),
      focus: focusValue
    }),
    button({
      onClick: compose(addItem, preventDefault),
      disabled: isEmpty(inputValue),
    }, 'Add item'),
  ])

export default connect(mapWorldToProps, Component)
