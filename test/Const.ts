import * as _ from '../src/Const'
import * as number from '../src/number'
import { pipe } from '../src/Function'
import * as U from './util'
import * as string from '../src/string'
import * as boolean from '../src/boolean'

describe('Const', () => {
  describe('pipeables', () => {
    it('map', () => {
      const fa = _.make('a')
      U.deepStrictEqual(pipe(fa, _.map(U.double)), fa)
      U.deepStrictEqual(pipe(fa, _.Functor.map(U.double)), fa)
    })

    it('contramap', () => {
      const fa = _.make('a')
      U.deepStrictEqual(pipe(fa, _.contramap(U.double)), fa)
      U.deepStrictEqual(pipe(fa, _.Contravariant.contramap(U.double)), fa)
    })

    it('mapBoth', () => {
      U.deepStrictEqual(pipe(_.make('a'), _.mapBoth(string.toUpperCase, U.double)), _.make('A'))
      U.deepStrictEqual(pipe(_.make('a'), _.Bifunctor.mapBoth(string.toUpperCase, U.double)), _.make('A'))
    })

    it('mapLeft', () => {
      const f = _.mapLeft(string.toUpperCase)
      U.deepStrictEqual(pipe(_.make('a'), f), _.make('A'))
    })
  })

  it('getApplicative', () => {
    const F = _.getApplicative(string.Monoid)
    U.deepStrictEqual(F.of(1), _.make(''))
  })

  it('getEq', () => {
    const E = _.getEq(number.Eq)
    U.deepStrictEqual(E.equals(_.make(1))(_.make(1)), true)
    U.deepStrictEqual(E.equals(_.make(1))(_.make(2)), false)
  })

  it('getOrd', () => {
    const O = _.getOrd(number.Ord)
    U.deepStrictEqual(O.compare(_.make(1))(_.make(1)), 0)
    U.deepStrictEqual(O.compare(_.make(1))(_.make(2)), 1)
    U.deepStrictEqual(O.compare(_.make(2))(_.make(1)), -1)
  })

  it('getBounded', () => {
    const B = _.getBounded(number.Bounded)
    U.deepStrictEqual(B.compare(_.make(1))(_.make(1)), 0)
    U.deepStrictEqual(B.compare(_.make(1))(_.make(2)), 1)
    U.deepStrictEqual(B.compare(_.make(2))(_.make(1)), -1)
    U.deepStrictEqual(B.top, _.make(Infinity))
    U.deepStrictEqual(B.bottom, _.make(-Infinity))
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup(string.Semigroup)
    U.deepStrictEqual(S.combine(_.make('b'))(_.make('a')), _.make('ab'))
  })

  it('getMonoid', () => {
    const M = _.getMonoid(string.Monoid)
    U.deepStrictEqual(M.combine(_.make('b'))(_.make('a')), _.make('ab'))
    U.deepStrictEqual(M.combine(M.empty)(_.make('a')), _.make('a'))
    U.deepStrictEqual(M.combine(_.make('b'))(M.empty), _.make('b'))
  })

  it('getSemiring', () => {
    const S = _.getSemiring(number.Field)
    U.deepStrictEqual(pipe(_.make(1), S.add(_.make(2))), _.make(3))
    U.deepStrictEqual(pipe(_.make(2), S.mul(_.make(3))), _.make(6))
    U.deepStrictEqual(S.one, _.make(1))
    U.deepStrictEqual(S.zero, _.make(0))
  })

  it('getRing', () => {
    const R = _.getRing(number.Field)
    U.deepStrictEqual(pipe(_.make(1), R.sub(_.make(2))), _.make(-1))
  })

  it('getHeytingAlgebra', () => {
    const HA = _.getHeytingAlgebra(boolean.BooleanAlgebra)
    U.deepStrictEqual(pipe(_.make(true), HA.implies(_.make(true))), _.make(true))
    U.deepStrictEqual(pipe(_.make(true), HA.implies(_.make(false))), _.make(false))
    U.deepStrictEqual(pipe(_.make(false), HA.implies(_.make(true))), _.make(true))
    U.deepStrictEqual(pipe(_.make(false), HA.implies(_.make(false))), _.make(true))

    U.deepStrictEqual(pipe(_.make(true), HA.join(_.make(true))), _.make(true))
    U.deepStrictEqual(pipe(_.make(true), HA.join(_.make(false))), _.make(true))
    U.deepStrictEqual(pipe(_.make(false), HA.join(_.make(true))), _.make(true))
    U.deepStrictEqual(pipe(_.make(false), HA.join(_.make(false))), _.make(false))

    U.deepStrictEqual(pipe(_.make(true), HA.meet(_.make(true))), _.make(true))
    U.deepStrictEqual(pipe(_.make(true), HA.meet(_.make(false))), _.make(false))

    U.deepStrictEqual(HA.not(_.make(true)), _.make(false))
    U.deepStrictEqual(HA.not(_.make(false)), _.make(true))

    U.deepStrictEqual(HA.one, _.make(true))
    U.deepStrictEqual(HA.zero, _.make(false))
  })

  it('getBooleanAlgebra', () => {
    const BA = _.getBooleanAlgebra(boolean.BooleanAlgebra)
    U.deepStrictEqual(pipe(_.make(true), BA.implies(_.make(true))), _.make(true))
    U.deepStrictEqual(pipe(_.make(true), BA.implies(_.make(false))), _.make(false))
    U.deepStrictEqual(pipe(_.make(false), BA.implies(_.make(true))), _.make(true))
    U.deepStrictEqual(pipe(_.make(false), BA.implies(_.make(false))), _.make(true))

    U.deepStrictEqual(pipe(_.make(true), BA.join(_.make(true))), _.make(true))
    U.deepStrictEqual(pipe(_.make(true), BA.join(_.make(false))), _.make(true))
    U.deepStrictEqual(pipe(_.make(false), BA.join(_.make(true))), _.make(true))
    U.deepStrictEqual(pipe(_.make(false), BA.join(_.make(false))), _.make(false))

    U.deepStrictEqual(pipe(_.make(true), BA.meet(_.make(true))), _.make(true))
    U.deepStrictEqual(pipe(_.make(true), BA.meet(_.make(false))), _.make(false))

    U.deepStrictEqual(BA.not(_.make(true)), _.make(false))
    U.deepStrictEqual(BA.not(_.make(false)), _.make(true))

    U.deepStrictEqual(BA.one, _.make(true))
    U.deepStrictEqual(BA.zero, _.make(false))
  })

  it('getApplicative', () => {
    const F = _.getApply(string.Semigroup)
    const fa = _.make('a')
    U.deepStrictEqual(pipe(fa, F.ap(_.make('b'))), _.make('ab'))
  })

  it('getShow', () => {
    const Sh = _.getShow(string.Show)
    const x = _.make('a')
    U.deepStrictEqual(Sh.show(x), `make("a")`)
  })
})
