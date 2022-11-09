import * as U from './util'
import * as O from '../src/Option'
import { getOptionM } from '../src/OptionT'
import * as T from '../src/Task'

const MT = getOptionM(T.Monad)

describe('OptionT', () => {
  it('map', async () => {
    const greetingT = MT.of('welcome')
    const excitedGreetingT = MT.map(greetingT, (s) => s + '!')
    U.deepStrictEqual(await excitedGreetingT(), O.some('welcome!'))
  })

  it('ap', async () => {
    const a = MT.of('a')
    const b = MT.of('b')
    U.deepStrictEqual(
      await MT.ap(
        MT.map(a, (a) => (b) => [a, b]),
        b
      )(),
      O.some(['a', 'b'])
    )
  })

  it('chain', async () => {
    const to1 = MT.chain(MT.of('foo'), (a) => MT.of(a.length))
    const to2 = MT.chain(T.of(O.none), (a: string) => MT.of(a.length))
    const [o1, o2] = await Promise.all([to1(), to2()])
    U.deepStrictEqual(o1, O.some(3))
    U.deepStrictEqual(o2, O.none)
  })

  it('fold', async () => {
    const f = () => T.of('none')
    const g = (s: string) => T.of(`some${s.length}`)
    const s1 = await MT.fold(T.of(O.none), f, g)()
    U.deepStrictEqual(s1, 'none')
    const s2 = await MT.fold(MT.of('s'), f, g)()
    U.deepStrictEqual(s2, 'some1')
  })

  it('alt', async () => {
    const o1 = await MT.alt(T.of(O.some(1)), () => T.of(O.some(2)))()
    U.deepStrictEqual(o1, O.some(1))
    const o2 = await MT.alt(T.of(O.none), () => T.of(O.some(2)))()
    U.deepStrictEqual(o2, O.some(2))
  })

  it('getOrElse', async () => {
    const n1 = await MT.getOrElse(T.of(O.some(1)), () => T.of(2))()
    U.deepStrictEqual(n1, 1)
    const n2 = await MT.getOrElse(T.of(O.none), () => T.of(2))()
    U.deepStrictEqual(n2, 2)
  })

  it('fromM', async () => {
    U.deepStrictEqual(await MT.fromM(T.of(1))(), O.some(1))
  })

  it('none', async () => {
    U.deepStrictEqual(await MT.none()(), O.none)
  })
})
