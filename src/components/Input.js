import { Component, createElement, createFactory } from 'react'
import { findDOMNode } from 'react-dom'
import { compose, tap } from '../utils'

var i = 0

export default createFactory(class extends Component {
  constructor() {
    super()
    this.refKey = 'inputRef' + i++
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.focus) {
      findDOMNode(this.refs[this.refKey]).focus();
    } else {
      findDOMNode(this.refs[this.refKey]).blur();
    }
  }
  onEnterPress(fn) => (e) {
    if (e.key === 'Enter') {
      fn(e)
    }
  }
  render() {
    const { ref, autoFocus, ...props } = this.props
    return createElement('input', {
      ref: this.refKey,
      autoFocus: this.props.focus,
      onKeyPress: compose(tap(props.onKeyPress), tap(props.onEnterPress))
      ...this.props
    })
  }
})
