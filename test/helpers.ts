import * as assert from 'assert'
import { Option, isSome, isNone } from '../src/Option'
import { Either, isLeft, isRight } from '../src/Either'

export function eqOptions<A>(x: Option<A>, y: Option<A>) {
  if (isSome(x) && isSome(y)) {
    assert.deepEqual(x.value, y.value)
  } else {
    assert.strictEqual(isNone(x), isNone(y), `${x} != ${y}`)
  }
}

export function eqEithers<L, A>(x: Either<L, A>, y: Either<L, A>) {
  if (isRight(x) && isRight(y)) {
    assert.deepEqual(x.value, y.value)
  } else if (isLeft(x) && isLeft(y)) {
    assert.deepEqual(x.value, y.value)
  } else {
    assert.strictEqual(isLeft(x), isLeft(y), `${x} != ${y}`)
  }
}
