// code for docs/OptionT.md

// ts-node -r tsconfig-paths/register index.ts

import { Option } from 'fp-ts/lib/Option'
import * as option from 'fp-ts/lib/Option'
import { Task } from 'fp-ts/lib/Task'
import * as task from 'fp-ts/lib/Task'

// customGreeting :: Task<Option<string>>
const customGreeting = task.of(option.some('welcome back, Lola'))

// excitedGreeting :: Task<Option<string>>
const excitedGreeting = customGreeting.map(x => x.map(s => s + '!'))

// withFallback :: Task<String>
const withFallback = customGreeting.map(x => x.getOrElse(() => 'hello, there!'))

// ====

import { getStaticOptionT } from 'fp-ts/lib/OptionT'

declare module 'fp-ts/lib/HKT' {
  interface HKT<A> {
    'Task<Option>': Task<Option<A>>
  }
}

const taskOption = getStaticOptionT('Task<Option>', task)

// customGreeting2 :: Task<Option<string>>
const customGreeting2 = taskOption.of('welcome back, Lola')

// excitedGreeting2 :: Task<Option<string>>
const excitedGreeting2 = taskOption.map(s => s + '!', customGreeting2)

// excitedGreeting2 :: Task<String>
const withFallback2 = taskOption.getOrElse(() => 'hello, there!', excitedGreeting2)

// ====

// greetingMO :: Task<Option<string>>
const greetingMO = taskOption.of('Hello')

// firstnameM :: Task<string>
const firstnameM = task.of('Jane')

// lastnameO :: Option<string>
const lastnameO = option.some('Doe')

const ot = taskOption.chain(g => {
  return taskOption.chain(f => {
    return taskOption.map(l => `${g} ${f} ${l}`, taskOption.fromOption(lastnameO))
  }, taskOption.liftT(firstnameM))
}, greetingMO)

ot.run().then(x => console.log(x)) // => Some("Hello Jane Doe")

// ====

// greet :: Task<Option<string>>
const greet = taskOption.of('Hola!')

// greetAlt :: Task<Option<string>>
const greetAlt = taskOption.some('Hi!')

// failedGreet :: Task<Option<any>>
const failedGreet = taskOption.none()
