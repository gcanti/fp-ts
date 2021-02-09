import * as U from './util'
import * as E from '../src/Either'
import { getEitherM } from '../src/EitherT'
import * as I from '../src/IO'

describe('EitherT', () => {
  // tslint:disable-next-line: deprecation
  const T = getEitherM(I.Monad)

  it('fold', () => {
    const onLeft = (s: string) => I.of(`left(${s})`)
    const onRight = (n: number) => I.of(`right(${n})`)
    U.deepStrictEqual(T.fold(I.of(E.right(1)), onLeft, onRight)(), 'right(1)')
    U.deepStrictEqual(T.fold(I.of(E.left('bb')), onLeft, onRight)(), 'left(bb)')
  })

  it('getOrElse', () => {
    const onLeft = (s: string) => I.of(`left(${s})`)
    U.deepStrictEqual(T.getOrElse(I.of(E.right('a')), onLeft)(), 'a')
    U.deepStrictEqual(T.getOrElse(I.of(E.left('bb')), onLeft)(), 'left(bb)')
  })
})
