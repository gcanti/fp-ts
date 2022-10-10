import * as _ from '../src/boolean'
import { pipe } from '../src/Function'
import * as U from './util'

describe('boolean', () => {
  it('andAll', () => {
    U.deepStrictEqual(_.andAll([true, true, true]), true)
    U.deepStrictEqual(_.andAll([true, true, false]), false)
  })

  it('orAll', () => {
    U.deepStrictEqual(_.orAll([true, true, true]), true)
    U.deepStrictEqual(_.orAll([true, true, false]), true)
    U.deepStrictEqual(_.orAll([false, false, false]), false)
  })

  it('match', () => {
    U.deepStrictEqual(
      _.match(
        () => 'false',
        () => 'true'
      )(true),
      'true'
    )
    U.deepStrictEqual(
      _.match(
        () => 'false',
        () => 'true'
      )(false),
      'false'
    )
  })

  it('Ord', () => {
    U.deepStrictEqual(pipe(false, _.Ord.compare(true)), -1)
    U.deepStrictEqual(pipe(true, _.Ord.compare(false)), 1)
    U.deepStrictEqual(pipe(true, _.Ord.compare(true)), 0)
  })

  it('Show', () => {
    U.deepStrictEqual(_.Show.show(true), 'true')
    U.deepStrictEqual(_.Show.show(false), 'false')
  })
})
