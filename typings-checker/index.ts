import * as either from '../src/Either'
import * as option from '../src/Option'
import * as id from '../src/Identity'
import * as array from '../src/Array'
import * as nea from '../src/NonEmptyArray'

import { FantasyFunctor } from '../src/Functor'
import { HKTS } from '../src/HKT'

const len = (s: string): number => s.length
const double = (n: number): number => n * 2
const sum = (a: number) => (b: number): number => a + b

//
// Functor
//

import { lift } from '../src/Functor'

const liftOption = lift(option, double)
const liftEither = lift(either, len)

declare function fantasyFunctor<F extends HKTS, A>(fanstasyFunctor: FantasyFunctor<F, A>): void

//
// Apply
//

import { liftA2 } from '../src/Apply'

const liftA2Option = liftA2(option, sum)
const liftA2Either = liftA2(either, sum)

//
// Chain
//

import { flatten } from '../src/Chain'

const e5 = flatten(either)(either.right<string, either.Either<string, number>>(either.right<string, number>(1)))

//
// Traversable
//

import { sequence } from '../src/Traversable'

const t1 = sequence(option, array)([option.some(1)])
const t2 = sequence(either, array)([either.right<string, number>(1)])

//
// Unfoldable
//

import { replicate, replicateA } from '../src/Unfoldable'

const a3 = replicate(array, 2, 's')
const o5 = replicate(array, 2, option.some(1))
const e6 = replicate(array, 2, either.right<string, number>(1))
const o6 = replicateA(option, array)(2, option.some(1))
const e7 = replicateA(either, array)(2, either.right<string, number>(1))

//
// Option
//

const o1 = option.some('s').traverse(option)(s => option.some(s.length))
const o2 = option.some('s').traverse(either)(s => either.right<number, number>(s.length))
const o3 = option.traverse(option)(s => option.some(s.length), option.of('s'))
const o4 = option.traverse(either)(s => either.right<string, number>(s.length), option.of('s'))

fantasyFunctor(option.of(1))

//
// Either
//

const e1 = either.right<boolean, string>('s').traverse(option)(s => option.some(s.length))
const e2 = either.right<boolean, string>('s').traverse(either)(s => either.right<number, number>(s.length))
const e3 = either.traverse(option)(s => option.some(s.length), either.right<boolean, string>('s')) // option.Option<either.Either<boolean, number>>
const e4 = either.traverse(either)(s => either.right<string, number>(s.length), either.right<boolean, string>('s')) // either.Either<string, either.Either<boolean, number>>

fantasyFunctor(either.of(1))

//
// Array
//

const a1 = array.traverse(option)(s => option.some(s.length), array.of('s'))
const a2 = array.traverse(either)(s => either.right<string, number>(s.length), array.of('s'))

fantasyFunctor([1, 2, 3])

//
// Identity
//

const i1 = id.traverse(option)(s => option.some(s.length), id.of('s'))
const i2 = id.traverse(either)(s => either.right<string, number>(s.length), id.of('s'))

fantasyFunctor(id.of(1))

//
// NonEmptyArray
//

const nea1 = nea.traverse(option)(s => option.some(s.length), nea.of('s'))
const nea2 = nea.traverse(either)(s => either.right<string, number>(s.length), nea.of('s'))

fantasyFunctor(nea.of(1))
