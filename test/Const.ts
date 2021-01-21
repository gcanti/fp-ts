import * as _ from '../src/Const'
import { eqNumber } from '../src/Eq'
import { pipe } from '../src/function'
import { monoidString } from '../src/Monoid'
import { semigroupString } from '../src/Semigroup'
import { showString } from '../src/Show'
import { deepStrictEqual } from './util'

describe('Const', () => {
  describe('pipeables', () => {
    it('map', () => {
      const fa = _.make('foo')
      const double = (n: number): number => n * 2
      deepStrictEqual(pipe(fa, _.map(double)), fa)
    })

    it('contramap', () => {
      const fa: _.Const<string, number> = _.make('foo')
      const double = (n: number): number => n * 2
      deepStrictEqual(pipe(fa, _.contramap(double)), fa)
    })

    it('bimap', () => {
      const fa: _.Const<string, number> = _.make('a')
      const f = (s: string): string => s.toUpperCase()
      const g = (n: number): number => n * 2
      deepStrictEqual(pipe(fa, _.bimap(f, g)), _.make('A'))
    })

    it('mapLeft', () => {
      const fa: _.Const<string, number> = _.make('a')
      const f = (s: string): string => s.toUpperCase()
      deepStrictEqual(pipe(fa, _.mapLeft(f)), _.make('A'))
    })
  })

  it('getApplicative', () => {
    const F = _.getApplicative(monoidString)
    deepStrictEqual(F.of(1), _.make(''))
  })

  it('getEq', () => {
    const S = _.getEq(eqNumber)
    deepStrictEqual(S.equals(_.make(1))(_.make(1)), true)
    deepStrictEqual(S.equals(_.make(1))(_.make(2)), false)
  })

  it('getApplicative', () => {
    const F = _.getApply(semigroupString)
    const fa = _.make('foo')
    deepStrictEqual(pipe(fa, F.ap(_.make('bar'))), _.make('foobar'))
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    const x: _.Const<string, number> = _.make('a')
    deepStrictEqual(S.show(x), `make("a")`)
  })
})
