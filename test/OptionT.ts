import * as assert from 'assert'
import { getOptionT } from '../src/OptionT'
import * as option from '../src/Option'
import * as task from '../src/Task'
import { eqOptions as eq } from './helpers'

declare module '../src/HKT' {
  interface HKT<A> {
    'Task . Option': task.Task<option.Option<A>>
  }
}

const taskOption = getOptionT('Task . Option', task)

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
    const p1 = taskOption.fold(f, g, taskOption.none()).run().then(s => {
      assert.strictEqual(s, 'none')
    })
    const p2 = taskOption.fold(f, g, taskOption.of('s')).run().then(s => {
      assert.strictEqual(s, 'some1')
    })
    return Promise.all([p1, p2])
  })

  it('getOrElse', () => {
    const greetingT = taskOption.of('welcome')
    const p1 = taskOption.getOrElse(() => 'hello, there!', greetingT).run().then(s => {
      assert.strictEqual(s, 'welcome')
    })
    const p2 = taskOption.getOrElse(() => 'hello, there!', taskOption.none()).run().then(s => {
      assert.strictEqual(s, 'hello, there!')
    })
    return Promise.all([p1, p2])
  })
})
