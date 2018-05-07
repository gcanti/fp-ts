import * as assert from 'assert'
import { Moore, unfoldMoore } from '../examples/Moore'
import { Option, none, some } from '../src/Option'

type Reducer<S, A> = (s: S, a: A) => S

const fromReducer = <S, A>(reducer: Reducer<S, A>): ((s: S) => Moore<A, S>) =>
  unfoldMoore<S, A, S>(s => [s, a => reducer(s, a)])

interface User {
  name: string
}

interface State {
  user: Option<User>
  loggedIn: boolean
}

interface DidLogIn {
  type: 'didLogIn'
  user: User
}

interface DidLogOut {
  type: 'didLogOut'
}

type Action = DidLogIn | DidLogOut

describe('Moore', () => {
  it('fromReducer', () => {
    const start = fromReducer<State, Action>((s, a) => {
      switch (a.type) {
        case 'didLogIn':
          return { user: some(a.user), loggedIn: true }
        case 'didLogOut':
          return { user: none, loggedIn: false }
      }
    })
    const r1 = start({ user: none, loggedIn: false })
      .step({ type: 'didLogIn', user: { name: 'bob' } })
      .step({ type: 'didLogIn', user: { name: 'jan' } })
      .step({ type: 'didLogOut' })
    assert.deepEqual(r1.extract(), { user: none, loggedIn: false })
  })
})
