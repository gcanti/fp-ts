import * as U from './util'
import { fanin, splitChoice } from '../src/Choice'
import { left, right } from '../src/Either'
import * as R from '../src/Reader'

describe('Choice', () => {
  it('splitChoice', () => {
    const ab = (s: string) => s.length
    const cd = (n: number) => n >= 2
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(splitChoice({ ...R.Choice, ...R.Category })(ab, cd)(right(3)), right(true))
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(splitChoice({ ...R.Choice, ...R.Category })(ab, cd)(right(1)), right(false))
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(splitChoice({ ...R.Choice, ...R.Category })(ab, cd)(left('foo')), left(3))
  })

  it('fanin', () => {
    const ac = (s: string) => s === s.toLowerCase()
    const bc = (n: number) => n >= 2
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(fanin({ ...R.Choice, ...R.Category })(ac, bc)(right(3)), true)
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(fanin({ ...R.Choice, ...R.Category })(ac, bc)(right(1)), false)
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(fanin({ ...R.Choice, ...R.Category })(ac, bc)(left('foo')), true)
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(fanin({ ...R.Choice, ...R.Category })(ac, bc)(left('A')), false)
  })
})
