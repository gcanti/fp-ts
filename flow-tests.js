// @flow

const double = (n: number): number => n * 2
import { Identity, identity } from './lib/Identity'
import type { Option } from './lib/Option'
import { option, some, none } from './lib/Option'
import type { Either } from './lib/Either'
import { right, either } from './lib/Either'
import { IO, io } from './lib/IO'
import { array } from './lib/Array'
import type { Validation } from './lib/Validation'
import { success, validation } from './lib/Validation'
import { Task, task } from './lib/Task'
import { getMonad } from './lib/These'
import type { These } from './lib/These'
import { semigroupSum } from './lib/Semigroup'

//
// Identity
//
;(identity.traverse(either)(a => (right(a): Either<string, number>), new Identity(1)): Either<string, Identity<number>>)
;(new Identity(1).traverse(either)(a => (right(a) : Either<string, number>)): Either<string, Identity<number>>)

//
// Option
//

// $FlowFixMe
;(some(1).map(double): Option<string>)
;(some(1).map(double): Option<number>)

//
// Either
//
const e1: Either<string, number> = right(1)
;(e1.toOption(): Option<number>)

//
// Functor
//

import { lift } from './lib/Functor'

const liftedEitherDouble = lift(either)(double)
// $FlowFixMe
;(liftedEitherDouble(e1): number)
// $FlowFixMe
;(liftedEitherDouble(e1): Either<string, string>)
;(liftedEitherDouble(e1): Either<string, number>)

const liftedIdentityDouble = lift(identity)(double)
// $FlowFixMe
;(liftedIdentityDouble(new Identity(1)): number)
// $FlowFixMe
;(liftedIdentityDouble(new Identity(1)): Identity<string>)
;(liftedIdentityDouble(new Identity(1)): Identity<number>)

const liftedIODouble = lift(io)(double)
// $FlowFixMe
;(liftedIODouble(io.of(1)): number)
// $FlowFixMe
;(liftedIODouble(io.of(1)): IO<string>)
;(liftedIODouble(io.of(1)): IO<number>)

const liftedOptionDouble = lift(option)(double)
// $FlowFixMe
;(liftedOptionDouble(some(1)): number)
// $FlowFixMe
;(liftedOptionDouble(some(1)): Option<string>)
;(liftedOptionDouble(some(1)): Option<number>)

const liftedTaskDouble = lift(task)(double)
// $FlowFixMe
;(liftedTaskDouble(task.of(1)): number)
// $FlowFixMe
;(liftedTaskDouble(task.of(1)): Task<string>)
;(liftedTaskDouble(task.of(1)): Task<number>)

const liftedTheseDouble = lift(getMonad(semigroupSum))(double)
// $FlowFixMe
;(liftedTheseDouble(these.of(1)): number)
// $FlowFixMe
;(liftedTheseDouble(these.of(1)): These<string, string>)
;(liftedTheseDouble(these.of(1)): These<string, number>)

const liftedValidationDouble = lift(validation)(double)
// $FlowFixMe
;(liftedValidationDouble(success(1)): number)
// $FlowFixMe
;(liftedValidationDouble(success(1)): Validation<string, string>)
;(liftedValidationDouble(success(1)): Validation<string, number>)

//
// Apply
//
import { liftA2 } from './lib/Apply'

const sum = (a: number) => (b: number): number => a + b
const liftedA2OptionSum = liftA2(option)(sum)
// $FlowFixMe
;(liftedA2OptionSum(option.some(1)): number)
;(liftedA2OptionSum(some(1))(some(2)): Option<number>)

//
// Traversable
//
import { sequence } from './lib/Traversable'
const sequenceOptions = sequence(option, array)([some(1), none])
// $FlowFixMe
;(sequenceOptions: number)
// $FlowFixMe
;(sequenceOptions: Option<number>)
;(sequenceOptions: Option<Array<number>>)
