import * as _ from '../src/boolean'
import { pipe } from '../src/function'
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

  it('BooleanAlgebra', () => {
    const BA = _.BooleanAlgebra
    deepStrictEqual(pipe(true, BA.implies(true)), true)
    deepStrictEqual(pipe(true, BA.implies(false)), false)
    deepStrictEqual(pipe(false, BA.implies(true)), true)
    deepStrictEqual(pipe(false, BA.implies(false)), true)

    deepStrictEqual(pipe(true, BA.join(true)), true)
    deepStrictEqual(pipe(true, BA.join(false)), true)
    deepStrictEqual(pipe(false, BA.join(true)), true)
    deepStrictEqual(pipe(false, BA.join(false)), false)

    deepStrictEqual(pipe(true, BA.meet(true)), true)
    deepStrictEqual(pipe(true, BA.meet(false)), false)

    deepStrictEqual(BA.not(true), false)
    deepStrictEqual(BA.not(false), true)

    deepStrictEqual(BA.one, true)
    deepStrictEqual(BA.zero, false)
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
