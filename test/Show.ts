import * as N from '../src/number'
import * as _ from '../src/Show'
import * as S from '../src/string'
import * as U from './util'

describe('Show', () => {
  it('struct', () => {
    U.deepStrictEqual(_.struct({ a: S.Show }).show({ a: 'a' }), '{ a: "a" }')
    U.deepStrictEqual(_.struct({ a: S.Show, b: N.Show }).show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
    // should ignore non own properties
    const shows = Object.create({ a: 1 })
    const s = _.struct(shows)
    U.deepStrictEqual(s.show({}), '{}')
  })

  it('tuple', () => {
    const Sh = _.tuple(S.Show, N.Show)
    U.deepStrictEqual(Sh.show(['a', 1]), '["a", 1]')
  })

  it('showBoolean', () => {
    const Sh = _.showBoolean
    U.deepStrictEqual(Sh.show(true), 'true')
    U.deepStrictEqual(Sh.show(false), 'false')
  })

  it('showNumber', () => {
    U.deepStrictEqual(_.showNumber.show(1), '1')
  })

  it('showString', () => {
    U.deepStrictEqual(_.showString.show('a'), '"a"')
  })
})
