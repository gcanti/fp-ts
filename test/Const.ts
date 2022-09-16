import * as _ from '../src/Const'
import * as N from '../src/number'
import { pipe } from '../src/function'
import * as U from './util'
import * as S from '../src/string'

describe('Const', () => {
  describe('pipeables', () => {
    it('map', () => {
      const fa = _.make<string, number>('a')
      U.deepStrictEqual(pipe(fa, _.map(U.double)), fa)
    })

    it('contramap', () => {
      const fa = _.make<string, number>('a')
      U.deepStrictEqual(pipe(fa, _.contramap(U.double)), fa)
    })

    it('bimap', () => {
      const f = _.bimap(S.toUpperCase, U.double)
      U.deepStrictEqual(pipe(_.make<string, number>('a'), f), _.make('A'))
    })

    it('mapLeft', () => {
      const f = _.mapLeft(S.toUpperCase)
      U.deepStrictEqual(pipe(_.make('a'), f), _.make('A'))
    })
  })

  it('getApplicative', () => {
    const F = _.getApplicative(S.Monoid)
    U.deepStrictEqual(F.of(1), _.make(''))
  })

  it('getEq', () => {
    const E = _.getEq(N.Eq)
    U.deepStrictEqual(E.equals(_.make(1))(_.make(1)), true)
    U.deepStrictEqual(E.equals(_.make(1))(_.make(2)), false)
  })

  it('getApplicative', () => {
    const F = _.getApply(S.Semigroup)
    const fa = _.make<string, (n: number) => boolean>('a')
    U.deepStrictEqual(pipe(fa, F.ap(_.make('b'))), _.make('ab'))
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    const x = _.make<string, number>('a')
    U.deepStrictEqual(Sh.show(x), `make("a")`)
  })
})
