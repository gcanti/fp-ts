import * as assert from 'assert'
import * as optionT from '../src/OptionT'
import * as option from '../src/Option'
import * as task from '../src/Task'
import { eqOptions as eq } from './helpers'

const taskOption = optionT.getOptionT(task)
const none = optionT.none(task)()

describe('OptionT', () => {
  it('map', () => {
    const greetingT = taskOption.of('welcome')
    const excitedGreetingT = taskOption.map(s => s + '!', greetingT)
    return excitedGreetingT.run().then(o => {
      eq(o, option.some('welcome!'))
    })
  })

  it('fold', () => {
    const f = () => 'none'
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
    const getOrElse = optionT.getOrElse(task)(() => 'hello, there!')
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

  it('getOrElseValue', () => {
    const greetingT = taskOption.of('welcome')
    const getOrElseValue = optionT.getOrElseValue(task)('hello, there!')
    const p1 = getOrElseValue(greetingT)
      .run()
      .then(s => {
        assert.strictEqual(s, 'welcome')
      })
    const p2 = getOrElseValue(none)
      .run()
      .then(s => {
        assert.strictEqual(s, 'hello, there!')
      })
    return Promise.all([p1, p2])
  })
})
