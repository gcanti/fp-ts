import { pipe } from '@fp-ts/core/Function'
import * as _ from '@fp-ts/core/struct'
import * as U from '@fp-ts/core/test/util'

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
    U.deepStrictEqual(pipe(foo, S.combine(bar)), Object.assign({}, foo, bar))
  })
})
