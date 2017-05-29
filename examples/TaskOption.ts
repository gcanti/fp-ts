import { Option } from 'fp-ts/lib/Option'
import * as option from 'fp-ts/lib/Option'
import { Task } from 'fp-ts/lib/Task'
import * as task from 'fp-ts/lib/Task'
import { getOptionT } from 'fp-ts/lib/OptionT'
import { FantasyMonad } from 'fp-ts/lib/Monad'
import { Lazy } from 'fp-ts/lib/function'

declare module 'fp-ts/lib/HKT' {
  interface HKT<A> {
    'Task<Option>': Task<Option<A>>
    TaskOption: TaskOption<A>
  }
}

const optionTTask = getOptionT('Task<Option>', task)

export const URI = 'TaskOption'

export type URI = typeof URI

export class TaskOption<A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: Task<Option<A>>) {}
  run(): Promise<Option<A>> {
    return this.value.run()
  }
  map<B>(f: (a: A) => B): TaskOption<B> {
    return new TaskOption(optionTTask.map(f, this.value))
  }
  of<B>(b: B): TaskOption<B> {
    return of(b)
  }
  ap<B>(fab: TaskOption<(a: A) => B>): TaskOption<B> {
    return new TaskOption(optionTTask.ap(fab.value, this.value))
  }
  chain<B>(f: (a: A) => TaskOption<B>): TaskOption<B> {
    return new TaskOption(optionTTask.chain(a => f(a).value, this.value))
  }
  fold<R>(none: Lazy<R>, some: (a: A) => R): Task<R> {
    return optionTTask.fold(none, some, this.value)
  }
  getOrElse(f: Lazy<A>): Task<A> {
    return optionTTask.getOrElse(f, this.value)
  }
}

export function map<A, B>(f: (a: A) => B, fa: TaskOption<A>): TaskOption<B> {
  return fa.map(f)
}

export function of<A>(a: A): TaskOption<A> {
  return new TaskOption(optionTTask.of(a))
}

export function ap<A, B>(fab: TaskOption<(a: A) => B>, fa: TaskOption<A>): TaskOption<B> {
  return fa.ap(fab)
}

export function chain<A, B>(f: (a: A) => TaskOption<B>, fa: TaskOption<A>): TaskOption<B> {
  return fa.chain(f)
}

export const some = of

export const none = new TaskOption(optionTTask.none())

export function fromOption<A>(oa: Option<A>): TaskOption<A> {
  return new TaskOption(optionTTask.fromOption(oa))
}

export function liftT<A>(ma: Task<A>): TaskOption<A> {
  return new TaskOption(optionTTask.liftT(ma))
}
