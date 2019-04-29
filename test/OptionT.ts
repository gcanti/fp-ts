import * as assert from 'assert'
import * as option from '../src/Option'
import * as optionT from '../src/OptionT'
import { task } from '../src/Task'

const T = optionT.getOptionM(task)

describe('OptionT', () => {
  it('map', () => {
    const greetingT = T.of('welcome')
    const excitedGreetingT = T.map(greetingT, s => s + '!')
    return excitedGreetingT().then(o => {
      assert.deepStrictEqual(o, option.some('welcome!'))
    })
  })

  it('chain', () => {
    const to1 = T.chain(T.of('foo'), a => T.of(a.length))
    const to2 = T.chain(task.of(option.none), (a: string) => T.of(a.length))
    return Promise.all([to1(), to2()]).then(([o1, o2]) => {
      assert.deepStrictEqual(o1, option.some(3))
      assert.deepStrictEqual(o2, option.none)
    })
  })

  it('fold', () => {
    const f = () => 'none'
    const g = (s: string) => `some${s.length}`
    const p1 = T.fold(task.of(option.none), f, g)().then(s => {
      assert.strictEqual(s, 'none')
    })
    const p2 = T.fold(T.of('s'), f, g)().then(s => {
      assert.strictEqual(s, 'some1')
    })
    return Promise.all([p1, p2])
  })

  it('getOrElse', () => {
    const ma1 = T.getOrElse(task.of(option.some(1)), () => 2)
    const ma2 = T.getOrElse(task.of(option.none), () => 2)
    return Promise.all([ma1(), ma2()]).then(([n1, n2]) => {
      assert.strictEqual(n1, 1)
      assert.strictEqual(n2, 2)
    })
  })

  it('fromM', () => {
    return T.fromM(task.of(1))().then(o => {
      assert.deepStrictEqual(o, option.some(1))
    })
  })
})
