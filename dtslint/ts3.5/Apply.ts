import * as _ from '../../src/Apply'
import { URIS, Kind } from '../../src/HKT'
import * as RTE from '../../src/ReaderTaskEither'
import * as E from '../../src/Either'
import { pipe } from '../../src/function'
import * as Fu from '../../src/Functor'

//
// apS
//

export const apS = <F extends URIS>(F: _.Apply1<F>) => (
  s: Kind<F, string>,
  n: Kind<F, number>
): Kind<F, { s: string; n: number }> => {
  const apS = _.apS(F)
  const bindTo = Fu.bindTo(F)
  return pipe(s, bindTo('s'), apS('n', n))
}

//
// sequenceS
//

// TODO: broken in typescript@4.2.3
// export const sequenceS = <F extends URIS>(F: _.Apply1<F>) => (
//   s: Kind<F, string>,
//   n: Kind<F, number>
// ): Kind<F, { s: string; n: number }> => _.sequenceS(F)({ s, n })

declare const sequenceS1: E.Either<string, number>
declare const sequenceS2: E.Either<string, string>
declare const sequenceS3: E.Either<string, boolean>
declare const sequenceS4: E.Either<boolean, void>

const sequenceSf1 = _.sequenceS(E.either)

// $ExpectError
sequenceSf1({})
// $ExpectError
sequenceSf1({ sequenceS1, sequenceS4 })

sequenceSf1({ sequenceS1, sequenceS2, sequenceS3 }) // $ExpectType Either<string, { sequenceS1: number; sequenceS2: string; sequenceS3: boolean; }>

const sequenceSf2 = _.sequenceS(RTE.readerTaskEither)
declare const sequenceS5: RTE.ReaderTaskEither<{ a: number }, string, number>
declare const sequenceS6: RTE.ReaderTaskEither<{ a: number }, string, string>
declare const sequenceS7: RTE.ReaderTaskEither<{ a: number }, string, boolean>
declare const sequenceS8: RTE.ReaderTaskEither<{ a: number }, boolean, void>
declare const sequenceS9: RTE.ReaderTaskEither<{ a: string }, string, void>

// $ExpectError
sequenceSf2({ sequenceS5, sequenceS8 })
// $ExpectError
sequenceSf2({ sequenceS5, sequenceS9 })

sequenceSf2({ sequenceS5, sequenceS6, sequenceS7 }) // $ExpectType ReaderTaskEither<{ a: number; }, string, { sequenceS5: number; sequenceS6: string; sequenceS7: boolean; }>

//
// sequenceT
//

// TODO: broken in typescript@4.2.3
// export const sequenceT = <F extends URIS>(F: _.Apply1<F>) => (
//   s: Kind<F, string>,
//   n: Kind<F, number>
// ): Kind<F, [string, number]> => _.sequenceT(F)(s, n)

const sequenceTf1 = _.sequenceT(E.either)

// $ExpectError
sequenceTf1([])
// $ExpectError
sequenceTf1(sequenceS1, sequenceS4)

sequenceTf1(sequenceS1, sequenceS2, sequenceS3) // $ExpectType Either<string, [number, string, boolean]>

const sequenceTf2 = _.sequenceT(RTE.readerTaskEither)

// $ExpectError
sequenceTf2(sequenceS5, sequenceS8)
// $ExpectError
sequenceTf2(sequenceS5, sequenceS9)

sequenceTf2(sequenceS5, sequenceS6, sequenceS7) // $ExpectType ReaderTaskEither<{ a: number; }, string, [number, string, boolean]>
