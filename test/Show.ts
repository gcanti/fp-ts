import * as U from './util'
import * as N from '../src/number'
import { getStructShow, getTupleShow } from '../src/Show'
import * as S from '../src/string'

describe('Show', () => {
  it('getStructShow', () => {
    const Sh = getStructShow({ a: S.Show, b: N.Show })
    U.deepStrictEqual(Sh.show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
  })

  it('getTupleShow', () => {
    const Sh = getTupleShow(S.Show, N.Show)
    U.deepStrictEqual(Sh.show(['a', 1]), '["a", 1]')
  })
})
