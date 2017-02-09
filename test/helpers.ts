import * as assert from 'assert'
import { HKTOption, isSome, isNone } from '../src/Option'
import { HKTEither, isLeft, isRight } from '../src/Either'

export function eqOptions<A>(x: HKTOption<A>, y: HKTOption<A>) {
  if (isSome(x) && isSome(y)) {
    assert.deepEqual(x.value, y.value)
  } else {
    assert.strictEqual(isNone(x), isNone(y))
  }
}

export function eqEithers<L, A>(x: HKTEither<L, A>, y: HKTEither<L, A>) {
  if (isRight(x) && isRight(y)) {
    assert.deepEqual(x.value, y.value)
  } else if (isLeft(x) && isLeft(y)) {
    assert.deepEqual(x.value, y.value)
  } else {
    assert.strictEqual(isLeft(x), isLeft(y))
  }
}
