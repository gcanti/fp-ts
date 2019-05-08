import * as assert from 'assert'
import * as E from '../src/Either'
import { getEitherM } from '../src/EitherT'
import { io } from '../src/IO'

const T = getEitherM(io)

describe('EitherT', () => {
  it('fold', () => {
    const onLeft = (s: string) => io.of(`left(${s})`)
    const onRight = (n: number) => io.of(`right(${n})`)
    assert.strictEqual(T.fold(io.of(E.right(1)), onLeft, onRight)(), 'right(1)')
    assert.strictEqual(T.fold(io.of(E.left('bb')), onLeft, onRight)(), 'left(bb)')
  })

  it('getOrElse', () => {
    const onLeft = (s: string) => io.of(`left(${s})`)
    assert.strictEqual(T.getOrElse(io.of<E.Either<string, string>>(E.right('a')), onLeft)(), 'a')
    assert.strictEqual(T.getOrElse(io.of(E.left('bb')), onLeft)(), 'left(bb)')
  })
})
