import { BehaviorSubject } from 'rx'
import { render } from 'react-dom'
import { trace } from './utils'
import reducer from './reducer'
import App from './components/App'

const createIntentMiddleWare = (intent) => {
  const subject = new ReplaySubject(1)
  const intent$ = intent(subject)

  return store => {
    intent$.subscribe(action => store.dispatch(action))

    return next => action => {
      subject.onNext(action)
      next(action)
    }
  }
}

// Reducers imported from Containers
// Middleware (controllers) imported from Containers
// Maybe send reducer / middleware func

const intentMiddleware =
  createIntentMiddleWare(intent)

const createStoreWithMiddleware =
  applyMiddleWare(intentMiddleware)(createStore)

const store =
  createStoreWithMiddleware(reducer)

const store$ =
  Observable.fromStore(store)


const action$ = new BehaviorSubject({ type: 'NOOP' })
action$.subscribe(trace)

const store$ = action$.scan(reducer, {});

window.world = {
  action$,
  store$,
  dispatch: (action) => action$.onNext(action),
}

const node = document.getElementById('app')

render(App(), node)

