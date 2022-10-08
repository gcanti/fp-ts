import * as _ from '../src/boolean'
import { pipe } from '../src/Function'
import { deepStrictEqual } from './util'

describe('boolean', () => {
  it('match', () => {
    deepStrictEqual(
      _.match(
        () => 'false',
        () => 'true'
      )(true),
      'true'
    )
    deepStrictEqual(
      _.match(
        () => 'false',
        () => 'true'
      )(false),
      'false'
    )
  })

  it('Ord', () => {
    deepStrictEqual(pipe(false, _.Ord.compare(true)), -1)
    deepStrictEqual(pipe(true, _.Ord.compare(false)), 1)
    deepStrictEqual(pipe(true, _.Ord.compare(true)), 0)
  })

  it('Show', () => {
    deepStrictEqual(_.Show.show(true), 'true')
    deepStrictEqual(_.Show.show(false), 'false')
  })
})
