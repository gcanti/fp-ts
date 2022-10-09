import { pipe } from '../src/Function'
import * as _ from '../src/Iterable'
import * as string from '../src/string'
import * as U from './util'

describe('Iterable', () => {
  it('reduce', () => {
    U.deepStrictEqual(
      pipe(
        new Map([
          ['a', 'c'],
          ['b', 'd']
        ]),
        _.reduce('-', (b, [k, a]) => b + k + a)
      ),
      '-acbd'
    )
  })

  it('foldMap', () => {
    U.deepStrictEqual(
      pipe(
        new Map([
          ['a', 'c'],
          ['b', 'd']
        ]),
        _.foldMap(string.Monoid)(([k, a]) => k + a)
      ),
      'acbd'
    )
  })

  it('reduceRight', () => {
    U.deepStrictEqual(
      pipe(
        new Map([
          ['a', 'c'],
          ['b', 'd']
        ]),
        _.reduceRight('-', ([k, a], b) => b + k + a)
      ),
      '-bdac'
    )
  })
})
