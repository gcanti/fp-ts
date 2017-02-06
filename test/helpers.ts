import * as assert from 'assert'
import { HKTOption, isSome, isNone } from '../src/Option'
import { HKTEither, isLeft, isRight } from '../src/Either'

export function fromSome<A>(fa: HKTOption<A>): A {
  if (isSome(fa)) {
    return fa.value
  }
  throw new Error(`fromSome returned a none ${fa}`)
}

export function fromLeft<L, A>(fa: HKTEither<L, A>): L {
  if (isLeft(fa)) {
    return fa.value
  }
  throw new Error(`fromLeft returned a right ${fa}`)
}

export function fromRight<L, A>(fa: HKTEither<L, A>): A {
  if (isRight(fa)) {
    return fa.value
  }
  throw new Error(`fromRight returned a left ${fa}`)
}

export function eqOptions<A>(x: HKTOption<A>, y: HKTOption<A>) {
  if (isSome(y)) {
    assert.deepEqual(fromSome(x), y.value)
  } else {
    assert.strictEqual(isNone(x), true)
  }
}

export function eqEithers<L, A>(x: HKTEither<L, A>, y: HKTEither<L, A>) {
  if (isLeft(x)) {
    assert.deepEqual(x.value, fromLeft(y))
  } else {
    assert.deepEqual(fromRight(x), fromRight(y))
  }
}
