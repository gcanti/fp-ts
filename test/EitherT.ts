import * as U from './util'
import * as E from '../src/Either'
import * as ET from '../src/EitherT'
import * as T from '../src/Task'
import * as I from '../src/IO'
import { pipe } from '../src/function'

describe('EitherT', () => {
  const MT = ET.getEitherM(I.Monad)

  it('fold', () => {
    const onLeft = (s: string) => I.of(`left(${s})`)
    const onRight = (n: number) => I.of(`right(${n})`)
    U.deepStrictEqual(MT.fold(I.of(E.right(1)), onLeft, onRight)(), 'right(1)')
    U.deepStrictEqual(MT.fold(I.of(E.left('bb')), onLeft, onRight)(), 'left(bb)')
  })

  it('getOrElse', () => {
    const onLeft = (s: string) => I.of(`left(${s})`)
    U.deepStrictEqual(MT.getOrElse(I.of(E.right('a')), onLeft)(), 'a')
    U.deepStrictEqual(MT.getOrElse(I.of(E.left('bb')), onLeft)(), 'left(bb)')
  })

  it('chainF', async () => {
    const to1 = pipe(
      T.of(E.of('foo')),
      ET.chainF(T.Monad)((a: string) => T.of(a.length))
    )
    const to2 = pipe(
      T.of(E.left('error')),
      ET.chainF(T.Monad)((a: string) => T.of(a.length))
    )
    const [o1, o2] = await Promise.all([to1(), to2()])
    U.deepStrictEqual(o1, E.of(3))
    U.deepStrictEqual(o2, E.left('error'))
  })
})
