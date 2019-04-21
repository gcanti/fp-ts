import * as assert from 'assert'
import * as option from '../src/Option'
import * as optionT from '../src/OptionT'
import { task } from '../src/Task'

const taskOption = optionT.getOptionT(task)

describe('OptionT', () => {
  it('map', () => {
    const greetingT = taskOption.of('welcome')
    const excitedGreetingT = taskOption.map(greetingT, s => s + '!')
    return excitedGreetingT().then(o => {
      assert.deepStrictEqual(o, option.some('welcome!'))
    })
  })

  it('chain', () => {
    const to1 = taskOption.chain(taskOption.of('foo'), a => taskOption.of(a.length))
    const to2 = taskOption.chain(task.of(option.none), (a: string) => taskOption.of(a.length))
    return Promise.all([to1(), to2()]).then(([o1, o2]) => {
      assert.deepStrictEqual(o1, option.some(3))
      assert.deepStrictEqual(o2, option.none)
    })
  })

  it('fold', () => {
    const f = 'none'
    const g = (s: string) => `some${s.length}`
    const p1 = taskOption
      .fold(task.of(option.none), f, g)()
      .then(s => {
        assert.strictEqual(s, 'none')
      })
    const p2 = taskOption
      .fold(taskOption.of('s'), f, g)()
      .then(s => {
        assert.strictEqual(s, 'some1')
      })
    return Promise.all([p1, p2])
  })
})
