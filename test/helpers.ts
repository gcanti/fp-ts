import * as assert from 'assert'
import { Option, isSome, none } from '../src/Option'
import { Either, isLeft, isRight } from '../src/Either'

export function fromSome<A>(fa: Option<A>): A {
  if (isSome(fa)) {
    return fa.value
  }
  throw new Error(`fromSome returned a none ${fa}`)
}

export function fromLeft<L, A>(fa: Either<L, A>): L {
  if (isLeft(fa)) {
    return fa.value
  }
  throw new Error(`fromLeft returned a right ${fa}`)
}

export function fromRight<L, A>(fa: Either<L, A>): A {
  if (isRight(fa)) {
    return fa.value
  }
  throw new Error(`fromRight returned a left ${fa}`)
}

export function eqOptions<A>(x: Option<A>, y: Option<A>) {
  if (isSome(y)) {
    assert.deepEqual(fromSome(x), y.value)
  } else {
    assert.strictEqual(x, none)
  }
}

export function eqEithers<L, A>(x: Either<L, A>, y: Either<L, A>) {
  if (isLeft(x)) {
    assert.deepEqual(x.value, fromLeft(y))
  } else {
    assert.deepEqual(fromRight(x), fromRight(y))
  }
}
