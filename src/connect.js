import { createFactory, Component } from 'react'
import { ReplaySubject, BehaviorSubject } from 'rx'
import { trace } from './utils'

export default (mapWorldToProps, ComposedComponent, world) =>
  createFactory(class extends Component {
    componentWillMount() {
      if (typeof world === 'undefined') {
        world = window.world
      }

      this.unmount$ =
        new ReplaySubject()

      this.props$ =
        new BehaviorSubject(this.props)

      const state$ =
        mapWorldToProps(world, this.props$)

      state$
        .takeUntil(this.unmount$)
        .subscribe((state) => this.setState(state))
    }
    componentWillReceiveProps(nextProps) {
      this.props$.onNext(nextProps)
    }
    componentWillUnmount() {
      this.unmount$.onNext(1)
    }
    render() {
      return ComposedComponent({ ...this.props, ...this.state })
    }
  })
