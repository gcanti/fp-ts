import { pipe } from '../src/function'
import * as _ from '../src/struct'
import * as U from './util'

describe('struct', () => {
  it('getAssignSemigroup', () => {
    type T = {
      readonly foo?: number
      readonly bar: string
    }
    const foo: T = {
      foo: 123,
      bar: '456'
    }
    const bar: T = {
      bar: '123'
    }
    const S = _.getAssignSemigroup<T>()
    U.deepStrictEqual(pipe(foo, S.concat(bar)), Object.assign({}, foo, bar))
  })
})
