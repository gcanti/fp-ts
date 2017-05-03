import * as assert from 'assert'
import {
  of,
  some,
  none,
  flatten
} from '../src/OptionT'
import * as option from '../src/Option'
import * as task from '../src/Task'
import { eqOptions as eq } from './helpers'

describe('OptionT', () => {

  it('map', () => {
    const greetingT = of(task)('welcome')
    const excitedGreetingT = greetingT.map(s => s + '!')
    return excitedGreetingT.value.run().then(s => {
      eq(s, option.some('welcome!'))
    })
  })

  it('fold', () => {
    const f = () => 'none'
    const g = (s: string) => `some${s.length}`
    const p1 = none(task).fold(f, g).run().then(s => {
      assert.strictEqual(s, 'none')
    })
    const p2 = some(task)('s').fold(f, g).run().then(s => {
      assert.strictEqual(s, 'some1')
    })
    return Promise.all([p1, p2])
  })

  it('getOrElse', () => {
    const greetingT = of(task)('welcome')
    const p1 = greetingT.getOrElse(() => 'hello, there!').run().then(s => {
      assert.strictEqual(s, 'welcome')
    })
    const p2 = none(task).getOrElse(() => 'hello, there!').run().then(s => {
      assert.strictEqual(s, 'hello, there!')
    })
    return Promise.all([p1, p2])
  })

  it('flatten', () => {
    const p1 = flatten(of(task)(of(task)('welcome'))).value.run().then(s => {
      eq(s, option.some('welcome'))
    })
    const p2 = flatten(of(task)(none(task))).value.run().then(s => {
      eq(s, option.none)
    })
    return Promise.all([p1, p2])
  })

})
