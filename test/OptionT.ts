import * as assert from 'assert'
import * as option from '../src/Option'
import * as optionT from '../src/OptionT'
import { task } from '../src/Task'

const taskOption = optionT.getOptionT(task)

describe('OptionT', () => {
  it('map', () => {
    const greetingT = taskOption.of('welcome')
    const excitedGreetingT = taskOption.map(greetingT, s => s + '!')
    return excitedGreetingT.run().then(o => {
      assert.deepStrictEqual(o, option.some('welcome!'))
    })
  })

  it('getOptionT', () => {
    const to1 = taskOption.chain(taskOption.of('foo'), a => taskOption.of(a.length))
    const to2 = taskOption.chain(task.of(option.none), (a: string) => taskOption.of(a.length))
    return Promise.all([to1.run(), to2.run()]).then(([o1, o2]) => {
      assert.deepStrictEqual(o1, option.some(3))
      assert.deepStrictEqual(o2, option.none)
    })
  })

  it('fold', () => {
    const f = 'none'
    const g = (s: string) => `some${s.length}`
    const p1 = optionT
      .fold(task)(f, g, task.of(option.none))
      .run()
      .then(s => {
        assert.strictEqual(s, 'none')
      })
    const p2 = optionT
      .fold(task)(f, g, taskOption.of('s'))
      .run()
      .then(s => {
        assert.strictEqual(s, 'some1')
      })
    return Promise.all([p1, p2])
  })
})
