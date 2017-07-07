import * as array from '../src/Array'
import * as either from '../src/Either'
import * as io from '../src/IO'
import * as option from '../src/Option'
import * as task from '../src/Task'
import { lift, getFunctorComposition } from '../src/Functor'
import { getApplicativeComposition } from '../src/Applicative'
import { sequence } from '../src/Traversable'
import { getOptionT } from '../src/OptionT'
import { getEitherT } from '../src/EitherT'
import '../src/overloadings'

const length = (s: string): number => s.length
const double = (n: number): number => n * 2

//
// lift
//

const arrayLength = lift(array, length)
const x1: Array<number> = array.map(double, arrayLength(['foo', 'bar']))

const eitherLength = lift(either, length)
const x2: either.Either<boolean, number> = either.map(double, eitherLength(either.right<boolean, string>('foo')))

const ioLength = lift(io, length)
const x3: io.IO<number> = io.map(double, ioLength(new io.IO(() => 'foo')))

const optionLength = lift(option, length)
const x4: option.Option<number> = option.map(double, optionLength(option.some('foo')))

//
// getFunctorComposition
//

const arrayArrayFunctor = getFunctorComposition(array, array)
const x5: Array<Array<number>> = arrayArrayFunctor.map(length, [['foo', 'bar']])

const arrayOptionFunctor = getFunctorComposition(array, option)
const x6: Array<option.Option<number>> = arrayOptionFunctor.map(length, [option.some('foo'), option.some('bar')])

//
// getApplicativeComposition
//

const arrayOptionApplicative = getApplicativeComposition(array, option)
const x7: Array<option.Option<number>> = arrayOptionApplicative.ap([option.some(length)], [option.some('foo')])

const taskEitherApplicative = getApplicativeComposition(task, either)
const x8: task.Task<either.Either<boolean, number>> = taskEitherApplicative.ap(
  task.of(either.right<boolean, typeof length>(length)),
  task.of(either.right<boolean, string>('foo'))
)

//
// sequence
//

const x9: either.Either<string, number[]> = sequence(either, array)([either.right<string, number>(1)])

//
// getOptionT
//

const x10 = getOptionT(array)
const x11: Array<option.Option<number>> = x10.map(length, [option.some('foo')])

const x12 = getOptionT(task)
const x13: task.Task<option.Option<number>> = x12.map(length, task.of(option.some('foo')))

//
// getEitherT
//

const x14 = getEitherT(array)
const x15: Array<either.Either<boolean, number>> = x14.map(length, [either.right<boolean, string>('foo')])

const x16 = getEitherT(task)
const x17: task.Task<either.Either<boolean, number>> = x16.map(length, task.of(either.right<boolean, string>('foo')))
