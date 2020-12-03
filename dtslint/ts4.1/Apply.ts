import * as _ from '../../src/Apply'
import { URIS, Kind } from '../../src/HKT'
import * as RTE from '../../src/ReaderTaskEither'
import * as E from '../../src/Either'

//
// sequenceS
//

declare function functionForfactoryS(
  a1: string,
  a2: number,
  a3: boolean,
  a4: string,
  a5: number,
  a6: boolean,
  a7: string,
  a8: number,
  a9: boolean
): boolean

export function factoryS<F extends URIS>(
  F: _.Apply1<F>,
  a1: Kind<F, string>,
  a2: Kind<F, number>,
  a3: Kind<F, boolean>,
  a4: Kind<F, string>,
  a5: Kind<F, number>,
  a6: Kind<F, boolean>,
  a7: Kind<F, string>,
  a8: Kind<F, number>,
  a9: Kind<F, boolean>
): Kind<F, boolean> {
  return F.map(_.sequenceS(F)({ a1, a2, a3, a4, a5, a6, a7, a8, a9 }), ({ a1, a2, a3, a4, a5, a6, a7, a8, a9 }) =>
    functionForfactoryS(a1, a2, a3, a4, a5, a6, a7, a8, a9)
  )
}

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

export function factoryT<F extends URIS>(
  F: _.Apply1<F>,
  f1: Kind<F, string>,
  f2: Kind<F, number>,
  f3: Kind<F, boolean>,
  f4: Kind<F, string>,
  f5: Kind<F, number>,
  f6: Kind<F, boolean>,
  f7: Kind<F, string>,
  f8: Kind<F, number>,
  f9: Kind<F, boolean>
): Kind<F, boolean> {
  return F.map(_.sequenceT(F)(f1, f2, f3, f4, f5, f6, f7, f8, f9), ([a1, a2, a3, a4, a5, a6, a7, a8, a9]) =>
    functionForfactoryS(a1, a2, a3, a4, a5, a6, a7, a8, a9)
  )
}

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
