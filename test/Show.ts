import * as U from './util'
import * as N from '../src/number'
import * as _ from '../src/Show'
import * as S from '../src/string'

describe('Show', () => {
  it('getStructShow', () => {
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.getStructShow({ a: S.Show }).show({ a: 'a' }), '{ a: "a" }')
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.getStructShow({ a: S.Show, b: N.Show }).show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
    // should ignore non own properties
    const shows = Object.create({ a: 1 })
    // tslint:disable-next-line: deprecation
    const s = _.getStructShow(shows)
    U.deepStrictEqual(s.show({}), '{}')
  })

  it('tuple', () => {
    const Sh = _.tuple(S.Show, N.Show)
    U.deepStrictEqual(Sh.show(['a', 1]), '["a", 1]')
  })
})
