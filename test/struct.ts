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
    U.deepStrictEqual(S.concat(foo, bar), Object.assign({}, foo, bar))
  })

  it('evolve', () => {
    U.deepStrictEqual(
      pipe(
        { a: 'a', b: 1, c: true },
        _.evolve({
          a: (s) => s.length,
          b: (b) => b > 0,
          c: (c) => !c
        })
      ),
      { a: 1, b: true, c: false }
    )
    // should ignore non own properties
    const x: Record<'b', number> = Object.create({ a: 1 })
    x.b = 1
    U.deepStrictEqual(pipe(x, _.evolve({ b: (b) => b > 0 })), { b: true })
  })
})
