import type { TypeLambda, HKD } from '../../src/HKT'
import type * as identity from '../../src/Identity'
import type * as option from '../../src/Option'
import type * as either from '../../src/Either'

export interface Person<λ extends TypeLambda> {
  readonly name: HKD<λ, string>
  readonly age: HKD<λ, number>
}

declare const p1: Person<identity.Identityλ>
// $ExpectType string
p1.name
// $ExpectType number
p1.age

declare const p2: Person<option.Optionλ>
// $ExpectType Option<string>
p2.name
// $ExpectType Option<number>
p2.age

declare const p3: Person<either.EitherλFix<Error>>
// $ExpectType Either<Error, string>
p3.name
// $ExpectType Either<Error, number>
p3.age
