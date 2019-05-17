import * as assert from 'assert'
import * as O from '../src/Option'
import { getOptionM } from '../src/OptionT'
import { task } from '../src/Task'
import { pipeOp as pipe } from '../src/function'

const T = getOptionM(task)

describe('OptionT', () => {
  it('map', () => {
    const greetingT = T.of('welcome')
    const excitedGreetingT = T.map(greetingT, s => s + '!')
    return excitedGreetingT().then(o => {
      assert.deepStrictEqual(o, O.some('welcome!'))
    })
  })

  it('chain', () => {
    const to1 = T.chain(T.of('foo'), a => T.of(a.length))
    const to2 = T.chain(task.of(O.none), (a: string) => T.of(a.length))
    return Promise.all([to1(), to2()]).then(([o1, o2]) => {
      assert.deepStrictEqual(o1, O.some(3))
      assert.deepStrictEqual(o2, O.none)
    })
  })

  it('fold', async () => {
    const f = () => task.of('none')
    const g = (s: string) => task.of(`some${s.length}`)
    const fold = T.fold(f, g)
    const s1 = await fold(task.of(O.none))()
    assert.strictEqual(s1, 'none')
    const s2 = await fold(T.of('s'))()
    assert.strictEqual(s2, 'some1')
  })

  it('alt', async () => {
    const o1 = await T.alt(task.of(O.some(1)), () => task.of(O.some(2)))()
    assert.deepStrictEqual(o1, O.some(1))
    const o2 = await T.alt(task.of(O.none), () => task.of(O.some(2)))()
    assert.deepStrictEqual(o2, O.some(2))
  })

  it('getOrElse', async () => {
    const n1 = await pipe(
      task.of(O.some(1)),
      T.getOrElse(() => task.of(2))
    )()
    assert.strictEqual(n1, 1)
    const n2 = await pipe(
      task.of(O.none),
      T.getOrElse(() => task.of(2))
    )()
    assert.strictEqual(n2, 2)
  })

  it('fromM', () => {
    return T.fromM(task.of(1))().then(o => {
      assert.deepStrictEqual(o, O.some(1))
    })
  })

  it('fromOption', () => {
    return T.fromOption(O.some(1))().then(o => {
      assert.deepStrictEqual(o, O.some(1))
    })
  })

  it('none', () => {
    return T.none()().then(o => {
      assert.deepStrictEqual(o, O.none)
    })
  })
})
