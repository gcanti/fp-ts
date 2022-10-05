import type { TypeLambda, HKD } from '../../src/HKT'
import type * as identity from '../../src/Identity'
import type * as option from '../../src/Option'
import type * as either from '../../src/Result'

export interface Person<F extends TypeLambda> {
  readonly name: HKD<F, string>
  readonly age: HKD<F, number>
}

declare const p1: Person<identity.IdentityTypeLambda>
// $ExpectType string
p1.name
// $ExpectType number
p1.age

declare const p2: Person<option.OptionTypeLambda>
// $ExpectType Option<string>
p2.name
// $ExpectType Option<number>
p2.age

declare const p3: Person<either.EitherTypeLambdaFix<Error>>
// $ExpectType Result<Error, string>
p3.name
// $ExpectType Result<Error, number>
p3.age
