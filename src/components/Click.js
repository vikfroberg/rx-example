import { Component, createElement, createFactory } from 'react'
import { findDOMNode } from 'react-dom'
import { div } from '../dom'

export default createFactory(class extends Component {
  handleDocumentClick(e) {
    if (!findDOMNode(this).contains(e.target)) {
      if (this.props.onClickOutside) {
        this.props.onClickOutside(e)
      }
    } else {
      if (this.props.onClickInside) {
        this.props.onClickInside(e)
      }
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false);
  }
  render() {
    return div(this.children)
  }
})
