import * as assert from 'assert'
import * as option from '../src/Option'
import * as optionT from '../src/OptionT'
import { task } from '../src/Task'

// tslint:disable-next-line: deprecation
const taskOption = optionT.getOptionT(task)
const taskOption2v = optionT.getOptionT2v(task)
const none = optionT.none(task)()

describe('OptionT', () => {
  it('map', () => {
    const greetingT = taskOption.of('welcome')
    const excitedGreetingT = taskOption.map(greetingT, s => s + '!')
    return excitedGreetingT.run().then(o => {
      assert.deepStrictEqual(o, option.some('welcome!'))
    })
  })

  it('chain', () => {
    const to1 = taskOption.chain(a => taskOption.of(a.length), taskOption.of('foo'))
    const to2 = taskOption.chain((a: string) => taskOption.of(a.length), none)
    return Promise.all([to1.run(), to2.run()]).then(([o1, o2]) => {
      assert.deepStrictEqual(o1, option.some(3))
      assert.deepStrictEqual(o2, option.none)
    })
  })

  it('getOptionT2v', () => {
    const to1 = taskOption2v.chain(taskOption2v.of('foo'), a => taskOption2v.of(a.length))
    const to2 = taskOption2v.chain(none, (a: string) => taskOption2v.of(a.length))
    return Promise.all([to1.run(), to2.run()]).then(([o1, o2]) => {
      assert.deepStrictEqual(o1, option.some(3))
      assert.deepStrictEqual(o2, option.none)
    })
  })

  it('fold', () => {
    const f = 'none'
    const g = (s: string) => `some${s.length}`
    const p1 = optionT
      .fold(task)(f, g, none)
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

  it('getOrElse', () => {
    const greetingT = taskOption.of('welcome')
    const getOrElse = optionT.getOrElse(task)('hello, there!')
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

  it('some', () => {
    const some = optionT.some(task)
    return some(1)
      .run()
      .then(o => {
        assert.deepStrictEqual(o, option.some(1))
      })
  })

  it('fromOption', () => {
    const fromOption = optionT.fromOption(task)
    return Promise.all([fromOption(option.some(1)).run(), fromOption(option.none).run()]).then(([o1, o2]) => {
      assert.deepStrictEqual(o1, option.some(1))
      assert.deepStrictEqual(o2, option.none)
    })
  })

  it('liftF', () => {
    const liftF = optionT.liftF(task)
    return liftF(task.of(1))
      .run()
      .then(o => {
        assert.deepStrictEqual(o, option.some(1))
      })
  })
})
