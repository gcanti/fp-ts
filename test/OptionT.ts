import * as assert from 'assert'
import * as optionT from '../src/OptionT'
import * as option from '../src/Option'
import * as task from '../src/Task'

const taskOption = optionT.getOptionT(task.task)
const none = optionT.none(task.task)()

describe('OptionT', () => {
  it('map', () => {
    const greetingT = taskOption.of('welcome')
    const excitedGreetingT = taskOption.map(greetingT, s => s + '!')
    return excitedGreetingT.run().then(o => {
      assert.deepEqual(o, option.some('welcome!'))
    })
  })

  it('chain', () => {
    const to1 = taskOption.chain(a => taskOption.of(a.length), taskOption.of('foo'))
    const to2 = taskOption.chain((a: string) => taskOption.of(a.length), none)
    return Promise.all([to1.run(), to2.run()]).then(([o1, o2]) => {
      assert.deepEqual(o1, option.some(3))
      assert.deepEqual(o2, option.none)
    })
  })

  it('fold', () => {
    const f = 'none'
    const g = (s: string) => `some${s.length}`
    const p1 = optionT
      .fold(task.task)(f, g, none)
      .run()
      .then(s => {
        assert.strictEqual(s, 'none')
      })
    const p2 = optionT
      .fold(task.task)(f, g, taskOption.of('s'))
      .run()
      .then(s => {
        assert.strictEqual(s, 'some1')
      })
    return Promise.all([p1, p2])
  })

  it('getOrElse', () => {
    const greetingT = taskOption.of('welcome')
    const getOrElse = optionT.getOrElse(task.task)('hello, there!')
    const p1 = getOrElse(greetingT)
      .run()
      .then(s => {
        assert.strictEqual(s, 'welcome')
      })
    const p2 = getOrElse(none)
      .run()
      .then(s => {
        assert.strictEqual(s, 'hello, there!')
      })
    return Promise.all([p1, p2])
  })
})
