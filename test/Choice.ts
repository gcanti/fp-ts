import * as _ from '../src/Choice'
import { left, right } from '../src/Either'
import * as R from '../src/Reader'
import * as U from './util'

describe('Choice', () => {
  it('split', () => {
    const ab = (s: string) => s.length
    const cd = (n: number) => n >= 2
    U.deepStrictEqual(_.split(R.Choice, R.Category)(ab, cd)(right(3)), right(true))
    U.deepStrictEqual(_.split(R.Choice, R.Category)(ab, cd)(right(1)), right(false))
    U.deepStrictEqual(_.split(R.Choice, R.Category)(ab, cd)(left('foo')), left(3))
  })

  it('fanIn', () => {
    const ac = (s: string) => s === s.toLowerCase()
    const bc = (n: number) => n >= 2
    U.deepStrictEqual(_.fanIn(R.Choice, R.Category)(ac, bc)(right(3)), true)
    U.deepStrictEqual(_.fanIn(R.Choice, R.Category)(ac, bc)(right(1)), false)
    U.deepStrictEqual(_.fanIn(R.Choice, R.Category)(ac, bc)(left('foo')), true)
    U.deepStrictEqual(_.fanIn(R.Choice, R.Category)(ac, bc)(left('A')), false)
  })
})
