import * as U from './util'
import * as _ from '../src/Const'
import * as N from '../src/number'
import { pipe } from '../src/function'
import * as S from '../src/string'

describe('Const', () => {
  describe('pipeables', () => {
    it('map', () => {
      const fa = _.make('foo')
      const double = (n: number): number => n * 2
      U.deepStrictEqual(pipe(fa, _.map(double)), fa)
    })

    it('contramap', () => {
      const fa: _.Const<string, number> = _.make('foo')
      const double = (n: number): number => n * 2
      U.deepStrictEqual(pipe(fa, _.contramap(double)), fa)
    })

    it('bimap', () => {
      const fa: _.Const<string, number> = _.make('a')
      const f = (s: string): string => s.toUpperCase()
      const g = (n: number): number => n * 2
      U.deepStrictEqual(pipe(fa, _.bimap(f, g)), _.make('A'))
    })

    it('mapLeft', () => {
      const fa: _.Const<string, number> = _.make('a')
      const f = (s: string): string => s.toUpperCase()
      U.deepStrictEqual(pipe(fa, _.mapLeft(f)), _.make('A'))
    })
  })

  it('getApplicative', () => {
    const F = _.getApplicative(S.Monoid)
    U.deepStrictEqual(F.of(1), _.make(''))
  })

  it('getEq', () => {
    const S = _.getEq(N.Eq)
    U.deepStrictEqual(S.equals(_.make(1), _.make(1)), true)
    U.deepStrictEqual(S.equals(_.make(1), _.make(2)), false)
  })

  it('getApplicative', () => {
    const F = _.getApply(S.Semigroup)
    const fa = _.make('foo')
    U.deepStrictEqual(F.ap(fa, _.make('bar')), _.make('foobar'))
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    const x: _.Const<string, number> = _.make('a')
    U.deepStrictEqual(Sh.show(x), `make("a")`)
  })
})
